import { Knex } from "knex";
import {MysqlConnection} from "@/infra/framework/source/mysql/mysql.connection";
import {knexConnection} from "@/infra/framework/source/mysql/knex-connection";

export abstract class TenantSource extends MysqlConnection {
    constructor(
        conn: Knex,
    ) {
        super(conn);
    }

    public static connectMain() {
        return knexConnection({
            host: process.env.DB_0_HOST,
            port: parseInt(process.env.DB_0_PORT),
            user: process.env.DB_0_USER,
            password: process.env.DB_0_PASS,
            database: process.env.DB_0_NAME,
        })
    }

    // used by responseAdapter when setAuthUser. Only ONE connection per UseCase.
    // connection should be shared between all sources because of transactions
    // public static connect(authUser: IToken | ITokenCustomer) {
    //     return knexConnection({
    //         host: process.env[`DB_${authUser.tenant.location}_HOST`],
    //         port: parseInt(process.env[`DB_${authUser.tenant.location}_PORT`],),
    //         user: process.env[`DB_${authUser.tenant.location}_USER`],
    //         password: process.env[`DB_${authUser.tenant.location}_PASS`],
    //         database: authUser.tenant.scm,
    //     })
    // }

    // used when has no auth user, but has tenant conection settings
    public forTenant(db: number, schema: string) {
        this.connection = knexConnection({
            host: process.env[`DB_${db}_HOST`],
            port: parseInt(process.env[`DB_${db}_PORT`],),
            user: process.env[`DB_${db}_USER`],
            password: process.env[`DB_${db}_PASS`],
            database: schema,
        })

        return this;
    }
}