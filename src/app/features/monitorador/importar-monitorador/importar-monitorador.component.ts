import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MonitoradorService} from "../../../shared/services/monitorador.service";
import {HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-importar-monitorador',
  standalone: true,
  providers: [MonitoradorService],
  imports: [
    HttpClientModule,
    MatButton,
    MatDialogModule,
    NgIf
  ],
  templateUrl: './importar-monitorador.component.html',
  styleUrl: './importar-monitorador.component.css'
})
export class ImportarMonitoradorComponent {
  feedbackError: boolean;
  feedbackSuccess: boolean;
  feedbackMessage: string;
  constructor(private service: MonitoradorService) {
    this.feedbackSuccess = false;
    this.feedbackError = false;
    this.feedbackMessage = '';
  }

  downloadModel(){
    this.service.getModelImport();
  }

}
