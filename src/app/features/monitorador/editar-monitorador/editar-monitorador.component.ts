import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel, MatSuffix, MatError} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Monitorador} from "../../../shared/models/monitorador";
import {MonitoradorService} from "../../../shared/services/monitorador.service";
import {HttpClientModule} from "@angular/common/http";
import {ModalSucessoComponent} from "../../../components/modal-sucesso/modal-sucesso.component";
import {ModalErroComponent} from "../../../components/modal-erro/modal-erro.component";
import {ListagemMonitoradorComponent} from "../listagem-monitorador/listagem-monitorador.component";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";

@Component({
  selector: 'app-editar-monitorador',
  standalone: true,
  providers: [MonitoradorService, provideNgxMask()],
  imports: [
    HttpClientModule,
    MatButton,
    MatDialogModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    NgIf,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './editar-monitorador.component.html',
  styleUrl: './editar-monitorador.component.css'
})
export class EditarMonitoradorComponent {
  editarForm!: FormGroup
  feedbackError: boolean;
  feedbackMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Monitorador,
              private dialogRef: MatDialogRef<ListagemMonitoradorComponent>,
              private dialog: MatDialog,
              private service: MonitoradorService,
              private formBuilder: FormBuilder) {
    this.feedbackError = false
    this.feedbackMessage = ''

    this.editarForm = this.formBuilder.group({
      tipo: [this.data.tipo, Validators.required],
      cnpj: [this.data.cnpj, Validators.required],
      razao: [this.data.razao, Validators.required],
      inscricao: [this.data.inscricao, Validators.required],
      cpf: [this.data.cpf, Validators.required],
      nome: [this.data.nome, Validators.required],
      rg: [this.data.rg, Validators.required],
      data: [this.data.data, Validators.required],
      email: [this.data.email, Validators.required],
      ativo: [this.data.ativo, Validators.required]
    })
    this.onChangeTipo()
  }

  onSubmit(monitorador: Monitorador) {
    this.service.putEdit(this.data.id, monitorador).subscribe({
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
          data: 'Monitorador editado com sucesso!'
        })
      }
    })
  }

  onChangeTipo() {
    if (this.editarForm.controls['tipo'].value != 'JURIDICA') {
      this.editarForm.get('cpf')?.enable()
      this.editarForm.get('nome')?.enable()
      this.editarForm.get('rg')?.enable()
      this.editarForm.get('cnpj')?.disable()
      this.editarForm.get('razao')?.disable()
      this.editarForm.get('inscricao')?.disable()
    } else {
      this.editarForm.get('cpf')?.disable()
      this.editarForm.get('nome')?.disable()
      this.editarForm.get('rg')?.disable()
      this.editarForm.get('cnpj')?.enable()
      this.editarForm.get('razao')?.enable()
      this.editarForm.get('inscricao')?.enable()
    }
  }
}
