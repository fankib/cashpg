import { Injectable } from '@angular/core';

@Injectable()
export class OpenpgpService {

  constructor(){

    console.log('~~~~~~~~~~~~~~~~~');
    console.log('~ Start OpenPGP ~');
    console.log('~~~~~~~~~~~~~~~~~');

  }

  generateKey(name:string, email:string){
   var options = {
     comment: 'cashpg.ch',
     userIds: [{ name:name, email:email}],
     numBits: 2048,
     passphrase: 'C3PO'
   };

   return this.openpgp().generateKey(options);
  }

  encryptThenSign(params): Promise<string>{
    var privateSignatureKey = params.privateSignatureKey;
    var publicEncryptionKey = params.publicEncryptionKey;
    var message = params.message;

    var privateKey = this.readArmored(privateSignatureKey).keys[0];
    privateKey.decrypt('C3PO');

    var options = {
      data: JSON.stringify(message),                             // input as String (or Uint8Array)
      publicKeys: this.readArmored(publicEncryptionKey).keys,  // for encryption
      privateKeys: privateKey // for signing (optional)
    };

    return new Promise((resolve, reject) => {
      this.openpgp().encrypt(options).then(function(ciphertext) {
        resolve(ciphertext.data);
      });
    });
  }

  decryptThenVerify(params){
    var publicSignatureKey = params.publicSignatureKey;
    var privateDecryptionKey = params.privateDecryptionKey;
    var message = params.message;

    var privateKey = this.readArmored(privateDecryptionKey).keys[0];
    privateKey.decrypt('C3PO');

    var options = {
      message: this.openpgp().message.readArmored(message),
      publicKeys: this.readArmored(publicSignatureKey).keys,
      privateKey: privateKey
    };

    return new Promise((resolve, reject) =>{
      this.openpgp().decrypt(options).then(function(plaintext){
        var payment = JSON.parse(plaintext.data);
        resolve(payment);
      });
    });
  }

  openpgp(): any{
    return (<any>window).openpgp;
  }

  readArmored(armoredKey): any{
    return (<any>window).openpgp.key.readArmored(armoredKey);
  }

}
