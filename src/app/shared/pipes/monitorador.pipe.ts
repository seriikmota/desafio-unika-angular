import { Pipe, PipeTransform } from '@angular/core';
import {Monitorador} from "../models/monitorador";

@Pipe({
  name: 'monitorador',
  standalone: true
})
export class MonitoradorPipe implements PipeTransform {
  transform(value: Monitorador, ...args: unknown[]): unknown {
    if (value != undefined){
      if (value.tipo == 'FISICA')
        return value.nome
      else if (value.tipo == 'JURIDICA')
        return value.razao
      else
        return ''
    }
    return ''
  }
}
