import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'currency'})
export class CurrencyPipe implements PipeTransform {
  transform(value: number): string {

    var prefix = value >= 0 ? '' : '-';
    value = Math.abs(value);

    var fr = Math.floor(value / 100);
    var frs = fr != 0 ? ''+fr : '-';
    var r1 = value % 100;
    r1 = Math.floor(r1 / 10);
    var r2 = value % 10;

    var rps = '' + r1 + r2;
    if ( r1 == 0 && r2 == 0){
      rps = '-';
    }

    var result = prefix + frs + '.' + rps;
    if (result == "-.-"){
      return '-';
    }
    return result;
  }
}
