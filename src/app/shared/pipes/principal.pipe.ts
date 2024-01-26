import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'principal',
  standalone: true
})
export class PrincipalPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value)
      return 'Sim'
    else
      return 'Não'
  }

}
