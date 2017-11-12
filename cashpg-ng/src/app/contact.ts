import { ClearTransaction } from './clear-transaction';

export class Contact{
  id: number;
  name: string;
  publicKeyArmored: string;
  fingerprint: string;
  verified: boolean;
  totalDebt: number;
  transactions: ClearTransaction[] = [];

}
