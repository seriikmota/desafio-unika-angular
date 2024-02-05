import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MonitoradorService} from "../../../shared/services/monitorador.service";
import {HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {ModalSucessoComponent} from "../../../components/modal-sucesso/modal-sucesso.component";
import {ListagemMonitoradorComponent} from "../listagem-monitorador/listagem-monitorador.component";
import {ModalErroComponent} from "../../../components/modal-erro/modal-erro.component";

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
  feedbackError: boolean
  feedbackMessage: string
  file!: any
  constructor(private dialogRef: MatDialogRef<ListagemMonitoradorComponent>,
              private dialog: MatDialog,
              private service: MonitoradorService){
    this.feedbackError = false
    this.feedbackMessage = ''
  }

  onFileChange(event: any){
    this.file = event.target?.files[0]
  }

  onSubmit(){
    if(this.file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
      this.feedbackError = true
      this.feedbackMessage = 'Tipo de arquivo inválido, é aceito somente .xlsx!'
    }
    else {
      try{
        this.service.postImport(this.file).subscribe({
          error:(e) => {
            this.feedbackError = true
            this.feedbackMessage = e.error
          },
          complete:() => {
            this.feedbackError = false;
            this.dialogRef.close()
            this.dialog.open(ModalSucessoComponent, {
              width: '390px',
              data: 'Monitorador(es) importado(s) com sucesso!'
            })
          }
        })
      } catch(error){
        this.dialog.open(ModalErroComponent, {
          width: '390px',
          data: 'Ocorreu um erro ao enviar a requisição!'
        });
      }
    }
  }

  downloadModel(){
    this.service.getModelImport();
  }
}
