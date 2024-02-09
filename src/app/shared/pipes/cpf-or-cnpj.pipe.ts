import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfOrCnpj',
  standalone: true
})
export class CpfOrCnpjPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    let valorFormatado = (value + '').replace(/[^0-9]/g, '');

    if (valorFormatado.length == 11)
      return valorFormatado
        .padStart(11, '0')
        .substring(0,11)
        .replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          '$1.$2.$3-$4')

    else if (valorFormatado.length == 14)
      return valorFormatado
        .padStart(14, '0')
        .substring(0,14)
        .replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          '$1.$2.$3/$4-$5')

    else
      return ''
  }

}
