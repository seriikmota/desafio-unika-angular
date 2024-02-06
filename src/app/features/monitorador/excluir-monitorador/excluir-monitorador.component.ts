import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {ListagemMonitoradorComponent} from "../listagem-monitorador/listagem-monitorador.component";
import {MonitoradorService} from "../../../shared/services/monitorador.service";
import {HttpClientModule} from "@angular/common/http";
import {Dialog} from "@angular/cdk/dialog";
import {Monitorador} from "../../../shared/models/monitorador";
import {ModalSucessoComponent} from "../../../components/modal-sucesso/modal-sucesso.component";
import {ModalErroComponent} from "../../../components/modal-erro/modal-erro.component";

@Component({
  selector: 'app-excluir-monitorador',
  standalone: true,
  providers: [MonitoradorService],
  imports: [
    HttpClientModule,
    MatButton,
    MatDialogModule,
    NgIf
  ],
  templateUrl: './excluir-monitorador.component.html',
  styleUrl: './excluir-monitorador.component.css'
})
export class ExcluirMonitoradorComponent {
  feedbackError: boolean;
  feedbackMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public monitoradorId: number,
              private dialogRef: MatDialogRef<ListagemMonitoradorComponent>,
              private dialog: MatDialog,
              private service: MonitoradorService) {
    this.feedbackError = false;
    this.feedbackMessage = '';
  }

  onSubmit() {
    this.service.delete(this.monitoradorId).subscribe({
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
      },
      complete: () => {
        this.feedbackError = false;
        this.dialogRef.close()
        this.dialog.open(ModalSucessoComponent, {
          width: '390px',
          data: 'Monitorador excluido com sucesso!'
        })
      }
    })
  }
}
