import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions, runSeeders } from 'typeorm-extension';


export const dataSourceOptions : DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: '1234',
    database: 'wallet-app',
    entities: ['dist/**/*.entity{ .ts,.js}'],
    synchronize: false,
    migrations: ['dist/src/migrations/*{.ts,.js}'],
    migrationsRun: true,
    logging: true,
    seeds: ['dist/src/db/seeds/*.seeder.js'],
  }

  const datasource = new DataSource(dataSourceOptions)
  export default datasource;