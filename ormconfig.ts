import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormconfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: '192.168.1.130',
  port: 5432,
  database: 'db-phew-api',
  username: 'postgres',
  password: 'x123x',
  synchronize: true,
  logging: 'all',
  ssl:
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'
      ? { rejectUnauthorized: false }
      : false,
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  entities: ['dist/src/**/**/*.entity.js'],
};

export default ormconfig;
