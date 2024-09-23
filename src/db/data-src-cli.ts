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
