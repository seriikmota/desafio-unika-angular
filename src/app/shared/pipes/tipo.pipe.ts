import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipo',
  standalone: true
})
export class TipoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == 'FISICA')
      return "Física"
    else if (value == 'JURIDICA')
      return 'Jurídica'
    else
      return ''
  }

}
