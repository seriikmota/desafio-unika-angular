import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MonitoradorService} from "../../../shared/services/monitorador.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-importar',
  standalone: true,
  providers: [MonitoradorService],
  imports: [
    MatDialogModule,
    MatButton,
    MatFormFieldModule,
    HttpClientModule,
    NgIf
  ],
  templateUrl: './importar.component.html',
  styleUrl: './importar.component.css'
})
export class ImportarComponent {
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
