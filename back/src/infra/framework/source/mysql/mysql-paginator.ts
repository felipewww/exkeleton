import {Knex} from "knex";

export class MysqlPaginator {
    private perPage: number = 10;

    public apply(
        query: Knex.QueryBuilder,
        pageNumber: number,
    ) {
        let offset = 0;
        if (pageNumber > 1) {
            offset = (this.perPage*pageNumber)-this.perPage;
        }

        query.limit(this.perPage);
        query.offset(offset);
    }
}