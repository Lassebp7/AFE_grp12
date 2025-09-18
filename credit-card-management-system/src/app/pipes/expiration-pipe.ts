import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expiration'
})
export class ExpirationPipe implements PipeTransform {

  transform(value: {expirationMonth: number, expirationYear: number}): string {
    return value.expirationMonth.toString().padStart(2, '0') + "/" + (value.expirationYear % 100).toString()
  }
}
