import { Contact } from './contact';

export class Identity{
  id: number;
  name: string;
  privateKeyArmored: string;
  publicKeyArmored: string;
  contacts: Contact[];

  toString(): string{
    return "[id=" + this.id + ", name=" + this.name + "]";
  }
}
