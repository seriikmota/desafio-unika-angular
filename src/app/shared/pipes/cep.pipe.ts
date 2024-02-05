import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep',
  standalone: true
})
export class CepPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == null)
      return ''

    let valorFormatado = (value + '').replace(/[^0-9]/g, '')

    valorFormatado = valorFormatado
      .padStart(8, '0')
      .substring(0,8)
      .replace(
        /(\d{5})(\d{3})/,
        '$1-$2'
      )

    return valorFormatado;
  }

}
