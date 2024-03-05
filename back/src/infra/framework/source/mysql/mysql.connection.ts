import knex, {Knex} from "knex";
import {MysqlPaginator} from "./mysql-paginator";
// import {IRefresh} from "./multi-tenancy/tenant.source";
import {FilterRules, ISearchConfig} from "@/infra/framework/shared/filter-rules";
import {MysqlFilter} from "@/infra/framework/source/mysql/mysql.filter";
import {IKnexError, KnexError} from "@/infra/framework/source/mysql/mysql-error.adapter";

export interface KnexSharedTransaction extends Knex {
    TRX?: Knex.Transaction
}

export enum EStatus {
    INACTIVE,
    ACTIVE,
    SOFT_DELETED
}

export interface IRefresh {
    tableName: string;
    fkColumnName: string;
    fkValue: number;
}

export abstract class MysqlConnection {
    abstract tableName: string;
    protected transaction: Knex.Transaction;

    constructor(
        protected connection: KnexSharedTransaction
    ) {
    }

    get query(): Knex.QueryBuilder {
        return this.connection.queryBuilder();
    }

    raw(sql: string) {
        return this.connection.raw(sql)
    }

    async get<T>(
        pageNumber: number = 1,
        cols?: string
    ): Promise<Array<T>> {
        const query = this.getQuery(cols);

        const paginator = new MysqlPaginator();
        paginator.apply(query, pageNumber);

        return this.exec(query);
    }

    async getFiltering<MODEL, INPUT extends ISearchConfig>(
        filters: Array<FilterRules.BaseRule>,
        searchConfig: ISearchConfig,
        query?: Knex.QueryBuilder,
    ): Promise<Array<MODEL>> {
        if (!query) {
            query = this.getQuery('*')
        }

        const paginator = new MysqlPaginator();
        paginator.apply(query, searchConfig.page);

        const mysqlFilter = new MysqlFilter()
        mysqlFilter.initFilter(query, filters)

        query.orderBy('id', 'desc')
        console.log(query.toSQL())

        return this.exec(query);
    }

    async save<T extends { id: number }>(model: T) {
        if (model.id) {
            return this.update(model);
        } else {
            return this.create(model);
        }
    }

    async create<T>(model: T): Promise<Array<number>> {
        const query = this
            .query
            .table(this.tableName)
            .insert(model, "id");

        return this.exec(query);
    }

    async update<T extends { id: number }>(model: T): Promise<Array<number>> {
        const query = this
            .query
            .table(this.tableName)
            .update(model)
            .where("id", model.id);

        return this.exec(query);
    }

    async delete(id: number) {
        const query = this
            .query
            .table(this.tableName)
            .delete()
            .where("id", id);

        return this.exec(query);
    }

    async deleteSoft(id: number, deleted_by: number) {
        const query = this
            .query
            .table(this.tableName)
            .update({
                status: EStatus.SOFT_DELETED,
                deleted_at: new Date(),
                deleted_by,
            })
            .where("id", id);

        return this.exec(query);
    }

    async deactivate(id: number) {
        return this._switchStatus(EStatus.INACTIVE, id)
    }

    async activate(id: number) {
        return this._switchStatus(EStatus.ACTIVE, id)
    }

    private async _switchStatus(status: EStatus, id: number) {
        const query = this
            .query
            .table(this.tableName)
            .update({status})
            .where("id", id);

        return this.exec(query);
    }

    public async withTransaction(transaction?: Knex.Transaction) {
        if (transaction) {
            this.connection.TRX = transaction
        } else {
            this.connection.TRX = await this.connection.transaction();
        }

        return this.connection.TRX
    }

    async exec(
        query: Knex.QueryBuilder|Knex.Raw,
        debug = false
    ): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (this.connection.TRX) {
                query.transacting(this.connection.TRX)
            }

            if (debug) {
                console.log('query.toSQL()');
                console.log(query.toSQL())
            }

            query
                .then(res => resolve(res))
                .catch((knexError: IKnexError) => {
                    reject(new KnexError(knexError))
                })
        })
    }

    protected async execTransacting(queries: Array<Knex.QueryBuilder>) {
        // se ja houver uma TRANSACTION aplicada, apenas executar as queries
        if (this.connection.TRX) {
            for (const q of queries) {
                await this.exec(q)
            }

            return;
        }

        await this.withTransaction();

        try {
            for (const q of queries) {
                await this.exec(q)
            }
            this.transaction.commit()
        } catch (e) {
            this.transaction.rollback(e)
            throw e
        }
    }

    protected getQuery(
        cols?: string | { [key: string]: any }
    ): any {
        const query = this.query
            .select((cols) ? cols : "*")
            .from(this.tableName);

        return query;
    }

    // refresh ALWAYS delete every relation and create the news (if exists)
    protected async refresh<T>(refreshCfg: IRefresh, newValues: Array<T>) {
        try {
            await this.exec(
                this.connection
                    .table(refreshCfg.tableName)
                    .where(refreshCfg.fkColumnName, refreshCfg.fkValue)
                    .delete()
            );

            if (!newValues || !newValues.length) {
                return Promise.resolve();
            }

            return this.exec(
                this.connection.table(refreshCfg.tableName).insert(newValues)
            );
        } catch (e) {
            return Promise.reject(e);
        }
    }

    protected async refreshTable(table: string, columnId: string, id: number, data) {
        const trx = await this.withTransaction()

        try {
            const queryDelete = this.query
                .table(table)
                .where(columnId, id)
                .delete()

            await this.exec(queryDelete)

            if (data.length) {
                const query = this.query
                    .insert(data)
                    .table(table);

                await this.exec(query)
            }

            trx.commit();
        } catch (e) {
            trx.rollback()
            throw e;
        }
    }
}
