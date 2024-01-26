import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone',
  standalone: true
})
export class TelefonePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == null)
      return ''

    let valorFormatado = (value + '').replace(/[^0-9]/g, '');

    valorFormatado = valorFormatado
      .padStart(11, '0')
      .substring(0,11)
      .replace(
        /(\d{0})(\d{2})(\d{5})(\d{4})/,
        '$1($2) $3-$4'
      );

    return valorFormatado;
  }

}
