import * as cls from 'continuation-local-storage';
import * as Sequelize from 'sequelize';

export const namespace = cls.createNamespace('default');
Sequelize.useCLS(namespace);