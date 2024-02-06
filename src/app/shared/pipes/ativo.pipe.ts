import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ativo',
  standalone: true
})
export class AtivoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value)
      return 'Ativo'
    else
      return 'Inativo'
  }

}
