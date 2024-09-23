import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: parseInt('5432'),
  username: 'default_user',
  password: '123',
  database: 'phew_test',
  entities: ['dist/../**/*.entity.{js, ts}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

// Commands to run db
// npx typeorm-ts-node-commonjs -d src/db/data-src-cli.ts migration:show
// npm run typeorm migration:generate src/db/migrations/nome-migracao
// npm run typeorm migration:run
