import config from '../config';
import { Sequelize } from 'sequelize';

const isDev = process.env.NODE_ENV === 'development';
const { host, database, user, password } = config.mysql;

const sequelize = new Sequelize(database, user, password, {
  host: host, // 数据库地址
  dialect: 'mysql', // 指定连接的数据库类型
  timezone: '+08:00',
  logging: true, // 执行过程会log一些SQL的logging，设为false不显示
});
console.log('init sequelize...');

export default sequelize;
