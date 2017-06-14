
export interface IMessageFactory<TModel, TMessage> {
  toMessages(models: TModel[]): Promise<TMessage[]>;
}