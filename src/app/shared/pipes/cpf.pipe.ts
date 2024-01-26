import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
  standalone: true
})
export class CpfPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == null)
      return ''

    let valorFormatado = (value + '').replace(/[^0-9]/g, '');

    valorFormatado = valorFormatado
      .padStart(11, '0')
      .substring(0,11)
      .replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4'
      );

    return valorFormatado;
  }

}
