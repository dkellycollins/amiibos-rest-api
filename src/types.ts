
export const TYPES = {
  Controllers: {
    AmiiboController: 'AmiiboController',
    AmiiboSeriesController: 'AmiiboSeriesController',
    Messages: {
      AmiiboMessageFactory: 'Controllers.Messages.AmiiboMessageFactory',
      AmiiboSeriesMessageFactory: 'Controllers.Messages.AmiiboSeriesMessageFactory',
      CollectionMessageFactory: 'Controllers.Messages.CollectionMessageFactory'
    }
  },
  Managers: {
    AmiiboManager: 'AmiiboManager', 
    AmiiboSeriesManager: 'AmiiboSeriesManager',
    CollectionManager: 'CollectionManager' 
  },
  Models: {
    AccountModel: 'Models.AccountModel',
    AccountIdentityModel: 'Models.AccountIdentityModel',
    AmiiboModel: 'AmiiboModel',
    AmiiboSeriesModel: 'AmiiboSeriesModel',
    CollectionModel: 'CollectionModel',
    CollectionItemModel: 'CollectionItemModel',
    DataStore: 'DataStore',
    Migrator: 'Models.Migrator'
  },
  Config: 'Config'
}