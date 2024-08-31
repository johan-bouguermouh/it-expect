import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'password',
  port: 3305,
  synchronize: false,
  logging: true,
  database: 'mock',
  entities: [User],
});

export { dataSource };
