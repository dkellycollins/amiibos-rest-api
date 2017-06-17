import {Instance} from 'sequelize';

export interface IModel<TAttributes> extends Instance<TAttributes> {
  id: number;

  createdAt: string;
  updatedAt: string;
}