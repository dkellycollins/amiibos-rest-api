export async function given_the_amiibos(r: any, amiibos: any[]): Promise<any> {
  return await r.put('/amiibos')
    .set('Content-Type', 'application/json')
    .send(amiibos)
    .expect(200);
}