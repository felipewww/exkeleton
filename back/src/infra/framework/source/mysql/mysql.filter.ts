import { Knex } from "knex";
import {FilterRules} from "@/infra/framework/shared/filter-rules";

export class MysqlFilter {
    private query: Knex.QueryBuilder;

    initFilter(
        query: Knex.QueryBuilder,
        filters: Array<FilterRules.BaseRule>,
    ) {
        this.query = query;

        for (let filter of filters) {

            switch (filter.constructor.name) {
                case FilterRules.TextRule.name:
                    this.applyFilterText(filter as FilterRules.TextRule)
                    break;

                case FilterRules.EqualRule.name:
                    this.applyEqualFilter(filter as FilterRules.EqualRule)
                    break;

                case FilterRules.LGERule.name:
                    this.applyFilterLowerGreaterEqual(filter as FilterRules.LGERule);
                    break;

                case FilterRules.DateRule.name:
                    this.applyFilterDate(filter as FilterRules.DateRule)
                    break;

                case FilterRules.SomeRule.name:
                case FilterRules.EnumRule.name:
                    this.applySomeFilter(filter as FilterRules.SomeRule)
                    break;

                default:
                    throw new Error(`FilterRule isn't implemented: ${filter.constructor.name}`)
            }

        }
    }

    applyFilterLowerGreaterEqual(filter: FilterRules.LGERule) {
        if (filter.eq) {
            this._where(filter.column, filter.eq);
        }

        if (filter.gt) {
            this._greaterThan(filter.column, filter.gt)
        }

        if (filter.lt) {
            this._lowerThan(filter.column, filter.lt);
        }
    }

    applySomeFilter(filter: FilterRules.SomeRule) {
        if (filter.values && filter.values.length) {
            this._whereIn(filter.column, filter.values);
        }
    }

    applyFilterDate(filter: FilterRules.DateRule) {
        if (filter.start) {
            this._greaterThan(filter.column, filter.start)
        }

        if (filter.end) {
            this._lowerThan(filter.column, filter.end)
        }
    }

    applyEqualFilter(filter: FilterRules.EqualRule) {
        if (filter.value) {
            this._where(filter.column, filter.value)
        }
    }

    // applyFilterIsValidDate(query: Knex.QueryBuilder, colName: string, inputFilter: boolean) {
    //     const op = (inputFilter) ? ">=" : "<";
    //     console.log(`\naplicando filtro IsValidDate na col ${colName}`);
    //     query.where(colName, op, new Date());
    // }

    applyFilterText(filter: FilterRules.TextRule) {
        if (filter.exact) {
            this._where(filter.column, filter.exact);
        } else if (filter.like) {
            this.query.where(filter.column, 'like', '%'+filter.like+'%');
        }

    }

    _where(colName: string, value: any) {
        if (typeof value === 'object') {
            this._whereIn(colName, value)
        } else {
            this.query.where(colName, value);
        }
    }

    _whereIn(column: string, values: Array<any>) {
        this.query.whereIn(column, values);
    }

    _greaterThan(column: string, value: string|number) {
        this.query.where(column, ">", value);
    }

    _lowerThan(column: string, value: string|number) {
        this.query.where(column, "<", value);
    }
}