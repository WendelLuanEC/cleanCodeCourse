import DatabaseConnection from "./DatabaseConnection";
import { inject } from "./Registry";

export default interface AccountAssetDAO {
  save(accountAsset: any): Promise<void>;
  update(accountId: any, accountAsset: any, quantity: number): Promise<void>;
  getByAccountId(accountId: string): Promise<any>;
}

export class AccountAssetDAODatabase implements AccountAssetDAO {
  @inject("databaseConnection")
  connection!: DatabaseConnection;
  
  async save(accountAsset: any): Promise<void> {
    await this.connection.query(
      'INSERT INTO ccca.account_asset (account_id, asset_id, quantity) VALUES($1, $2, $3)',
      [accountAsset.accountId, accountAsset.assetId, accountAsset.quantity],
    );
  }

    async update(accountId: any, accountAsset: any, quantity: number){
        await this.connection.query(
        'UPDATE ccca.account_asset SET quantity = $1 WHERE account_id = $2 AND asset_id = $3',
        [quantity, accountId, accountAsset.assetId],
        );
 
  }

  async getByAccountId(accountId: string): Promise<any> {
    const accountAssets = await this.connection.query(
      'SELECT account_id as "accountId", asset_id as "assetId", quantity FROM ccca.account_asset WHERE account_id = $1',
      [accountId],
    );

    return accountAssets;
  }


}
