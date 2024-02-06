import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {EnderecoService} from "../../../shared/services/endereco.service";
import {ListagemEnderecoComponent} from "../listagem-endereco/listagem-endereco.component";
import {HttpClientModule} from "@angular/common/http";
import {ModalErroComponent} from "../../../components/modal-erro/modal-erro.component";
import {ModalSucessoComponent} from "../../../components/modal-sucesso/modal-sucesso.component";

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
  feedbackError: boolean
  feedbackMessage: string

  constructor(@Inject(MAT_DIALOG_DATA) public enderecoId: number,
              private dialogRef: MatDialogRef<ListagemEnderecoComponent>,
              private dialog: MatDialog,
              private service: EnderecoService) {
    this.feedbackError = false
    this.feedbackMessage = ''
  }

  onSubmit() {
    this.service.delete(this.enderecoId).subscribe({
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
        this.feedbackError = false
        this.dialogRef.close()
        this.dialog.open(ModalSucessoComponent, {
          width: '390px',
          data: 'Endereço excluido com sucesso!'
        })
      }
    })
  }
}
