import { ClearTransaction } from './clear-transaction';

export class Contact{
  id: string;
  name: string;
  publicKeyArmored: string;
  verified: boolean = false;
  totalDebt: number;
  transactions: ClearTransaction[] = [];

}
