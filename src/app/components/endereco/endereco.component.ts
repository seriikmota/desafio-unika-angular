import {Component, OnInit} from '@angular/core';
import {MonitoradorService} from "../../shared/services/monitorador.service";

@Component({
  selector: 'app-endereco',
  standalone: true,
  providers: [MonitoradorService],
  imports: [],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.css'
})
export class EnderecoComponent implements OnInit {
  constructor(private service: MonitoradorService) {

  }
  ngOnInit(): void {
    this.service.getCidade().subscribe(resposta => {
      console.log(resposta);
    });
  }
}
