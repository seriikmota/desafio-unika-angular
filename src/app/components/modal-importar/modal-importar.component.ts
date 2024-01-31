import {Component, OnInit} from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MonitoradorService} from "../../shared/services/monitorador.service";

@Component({
  selector: 'app-modal-importar',
  standalone: true,
  providers: [MonitoradorService],
  imports: [
    MatDialogModule,
    MatButton,
    MatFormField,
    MatInput
  ],
  templateUrl: './modal-importar.component.html',
  styleUrl: './modal-importar.component.css'
})
export class ModalImportarComponent {
  constructor(private service: MonitoradorService) {
  }

  downloadModel(){
    this.service.getModelImport();
  }

}
