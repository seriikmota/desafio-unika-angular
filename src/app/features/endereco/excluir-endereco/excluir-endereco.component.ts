import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {EnderecoService} from "../../../shared/services/endereco.service";
import {ListagemEnderecoComponent} from "../listagem-endereco/listagem-endereco.component";
import {HttpClientModule} from "@angular/common/http";
import {ModalErroComponent} from "../../../components/modal-erro/modal-erro.component";

@Component({
  selector: 'app-excluir-endereco',
  standalone: true,
  providers: [EnderecoService],
  imports: [
    HttpClientModule,
    MatButton,
    MatDialogModule,
    NgIf
  ],
  templateUrl: './excluir-endereco.component.html',
  styleUrl: './excluir-endereco.component.css'
})
export class ExcluirEnderecoComponent {
  feedbackError: boolean;
  feedbackSuccess: boolean;
  feedbackMessage: string;
  constructor(@Inject(MAT_DIALOG_DATA) public eId: number,
              private dialogRef: MatDialogRef<ListagemEnderecoComponent>,
              private dialog: MatDialog,
              private service: EnderecoService) {
    this.feedbackError = false;
    this.feedbackSuccess = false;
    this.feedbackMessage = '';
  }

  onSubmit() {
    try {
      this.service.delete(this.eId).subscribe({
        error: (e) => {
          this.feedbackSuccess = false;
          this.feedbackError = true;
          this.feedbackMessage = e.error;
        },
        complete: () => {
          this.feedbackSuccess = true;
          this.feedbackError = false;
          this.feedbackMessage = 'Endereço excluido com sucesso!';
          setTimeout(() => {
            this.dialogRef.close();
          }, 1500);
        }
      })
    } catch (error) {
      this.openErro('Ocorreu um erro ao enviar a requisição!');
    }
  }

  openErro(message: string) {
    this.dialog.open(ModalErroComponent, {
      width: '390px',
      data: message
    });
  }
}
