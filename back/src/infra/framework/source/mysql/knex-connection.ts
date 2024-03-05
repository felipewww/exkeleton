import knex, {Knex} from "knex";

export function knexConnection(
    connectionConfig: Knex.MySqlConnectionConfig
) {
    return knex({
        client: 'mysql2',
        connection: connectionConfig,
        pool: {
            min: 0,
            max: 1
        },
    });
}