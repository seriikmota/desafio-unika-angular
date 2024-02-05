import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpj',
  standalone: true
})
export class CnpjPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == null)
      return ''

    let valorFormatado = (value + '').replace(/[^0-9]/g, '')

    valorFormatado = valorFormatado
      .padStart(14, '0')
      .substring(0,14)
      .replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );

    return valorFormatado;
  }

}
