import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {ListagemMonitoradorComponent} from "../listagem-monitorador/listagem-monitorador.component";
import {MonitoradorService} from "../../../shared/services/monitorador.service";
import {HttpClientModule} from "@angular/common/http";

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
  feedbackSuccess: boolean;
  feedbackMessage: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: number,
              private dialogRef: MatDialogRef<ListagemMonitoradorComponent>,
              private service: MonitoradorService) {
    this.feedbackError = false;
    this.feedbackSuccess = false;
    this.feedbackMessage = '';
  }

  onSubmit() {
    try {
      this.service.delete(this.data).subscribe({
        error: (e) => {
          this.feedbackSuccess = false;
          this.feedbackError = true;
          this.feedbackMessage = e.error;
        },
        complete: () => {
          this.feedbackSuccess = true;
          this.feedbackError = false;
          this.feedbackMessage = 'Monitorador excluido com sucesso!';
          setTimeout(() => {
            this.dialogRef.close();
          }, 1500);
        }
      })
    } catch (error) {
      this.feedbackSuccess = false;
      this.feedbackError = true;
      this.feedbackMessage = 'Erro ao enviar a requisição!';
    }
  }
}
