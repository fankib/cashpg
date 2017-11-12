
import { Payment } from './payment';

export class Transaction{
  id: number;
  from: number;
  to: number;
  paymentCipher: string;
  payment: Payment;
}
