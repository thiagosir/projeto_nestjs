import { DataSource } from "typeorm";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: 'db',
                port: 5432,
                username: 'postgres',
                password: 'docker',
                database: 'cursonestjs',
                entities: ['dist/**/*.entity.js'],
                migrations: ['dist/migrations/*.js'],
                synchronize: false
            });
            return dataSource.initialize();
        }
    }
]

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'cursonestjs',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    synchronize: false
});