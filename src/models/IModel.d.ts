import {Instance} from 'sequelize';

export interface IModel<TAttributes> extends Instance<TAttributes> {
  id: string;

  createdAt: string;
  updatedAt: string;
}