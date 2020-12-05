import sequelize from '../utils/db';
import { DataTypes, Model } from 'sequelize';

class Users extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone: number;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt: Date;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.INTEGER,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    password: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Users;
