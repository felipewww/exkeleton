import {HttpStatus} from "@/infra/framework/presentation/http-status";
import {HttpException} from "@/infra/framework/presentation/http-exception";

export interface IKnexError {
    code: string,
    errno: 1062|1452,
    sqlState: '23000',
    sqlMessage: string,
    sql: string

}

export class KnexError extends HttpException implements IKnexError {

    public code: string;
    public errno: 1062|1452;
    public sqlState: '23000'
    public sqlMessage: string
    public sql: string
    constructor(knexError: IKnexError) {

        const status = KnexError.httpError(knexError)

        super('dberror', status);

        console.log(knexError)
        this.code = knexError.code;
        this.errno = knexError.errno;
        this.sqlState = knexError.sqlState;
        this.sqlMessage = knexError.sqlMessage;
        this.sql = knexError.sql;
    }

    private static httpError(knexError: IKnexError) {
        console.log('\nKNEX ERROR FACTORY\n')
        console.log(knexError)
        if (!knexError.errno) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        switch (knexError.errno.toString()) {
            case '1062':
                // DuplicateEntryError
                return HttpStatus.CONFLICT;

            case '1452':
                // FKConstraintFails
                return HttpStatus.UNPROCESSABLE_ENTITY;

            default:
                return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}
