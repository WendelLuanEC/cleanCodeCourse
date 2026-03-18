import pgp from 'pg-promise';

export default interface AccountAssetDAO {
  save(accountAsset: any): Promise<void>;
  update(accountId: any, accountAsset: any, quantity: number): Promise<void>;
  getByAccountId(accountId: string): Promise<any>;
}

export class AccountAssetDAODatabase implements AccountAssetDAO {
  async save(accountAsset: any): Promise<void> {
    const connection = pgp()('postgres://postgres:123456@db:5432/app');
    await connection.query(
      'INSERT INTO ccca.account_asset (account_id, asset_id, quantity) VALUES($1, $2, $3)',
      [accountAsset.accountId, accountAsset.assetId, accountAsset.quantity],
    );
    await connection.$pool.end();
  }


    async update(accountId: any, accountAsset: any, quantity: number){
        const connection = pgp()('postgres://postgres:123456@db:5432/app');
        await connection.query(
        'UPDATE ccca.account_asset SET quantity = $1 WHERE account_id = $2 AND asset_id = $3',
        [quantity, accountId, accountAsset.assetId],
        );
        await connection.$pool.end();   
  }

  async getByAccountId(accountId: string): Promise<any> {
    const connection = pgp()('postgres://postgres:123456@db:5432/app');
    const accountAssets = await connection.query(
      'SELECT account_id as "accountId", asset_id as "assetId", quantity FROM ccca.account_asset WHERE account_id = $1',
      [accountId],
    );
    await connection.$pool.end();
    return accountAssets;
  }


}
