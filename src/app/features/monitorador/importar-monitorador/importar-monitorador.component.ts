import {Component} from '@angular/core';
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
  event!: any

  constructor(private dialogRef: MatDialogRef<ListagemMonitoradorComponent>,
              private dialog: MatDialog,
              private service: MonitoradorService) {
    this.feedbackError = false
    this.feedbackMessage = ''
  }

  onFileChange(event: any) {
    this.event = event
  }

  onSubmit() {
    if (this.event == undefined) {
      this.feedbackError = true
      this.feedbackMessage = 'Insira algum arquivo para importar!'
    } else if (this.event.target.files[0].type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.feedbackError = true
      this.feedbackMessage = 'Tipo de arquivo inválido, é aceito somente .xlsx!'
    } else {
      this.service.postImport(this.event.target.files[0]).subscribe({
        error: (e) => {
          if (e.status == '409') {
            this.dialog.open(ModalErroComponent, {
              width: '390px',
              data: 'Ocorreu um erro ao enviar a requisição!'
            });
          } else {
            this.feedbackError = true
            this.feedbackMessage = e.error
          }
          this.event.target.value = null
        },
        complete: () => {
          this.feedbackError = false;
          this.dialogRef.close()
          this.dialog.open(ModalSucessoComponent, {
            width: '390px',
            data: 'Monitorador(es) importado(s) com sucesso!'
          })
        }
      })
    }
  }

  downloadModel() {
    this.service.getModelImport();
  }
}
