import {Component, Testability} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {Monitorador} from "../../../shared/models/monitorador";
import {MonitoradorService} from "../../../shared/services/monitorador.service";
import {HttpClientModule} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {catchError, empty, of, throwError} from "rxjs";
import {ListagemMonitoradorComponent} from "../listagem-monitorador/listagem-monitorador.component";
import {ModalErroComponent} from "../../../components/modal-erro/modal-erro.component";

@Component({
  selector: 'app-cadastrar-monitorador',
  standalone: true,
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}, provideNativeDateAdapter(), MonitoradorService],
  imports: [
    HttpClientModule,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogModule,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './cadastrar-monitorador.component.html',
  styleUrl: './cadastrar-monitorador.component.css'
})
export class CadastrarMonitoradorComponent {
  cadastrarForm!: FormGroup
  feedbackError: boolean;
  feedbackSuccess: boolean;
  feedbackMessage: string;
  estados: string[];

  constructor(private dialogRef: MatDialogRef<ListagemMonitoradorComponent>,
              private formBuilder: FormBuilder,
              private service: MonitoradorService,
              private dialog: MatDialog) {
    this.feedbackError = false;
    this.feedbackSuccess = false;
    this.feedbackMessage = '';

    this.cadastrarForm = this.formBuilder.group({
      tipo: [''],
      cnpj: [''],
      razao: [''],
      inscricao: [''],
      cpf: [''],
      nome: [''],
      rg: [''],
      data: [''],
      email: [''],
      ativo: ['']
    })
    this.estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
      'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  }

  onSubmit(monitorador: Monitorador) {
    try {
      this.service.postRegister(monitorador).subscribe({
        error: (e) => {
          this.feedbackSuccess = false;
          this.feedbackError = true;
          this.feedbackMessage = e.error;
        },
        complete: () => {
          this.feedbackSuccess = false;
          this.feedbackError = true;
          this.feedbackMessage = 'Monitorador cadastrado com sucesso!';
          setTimeout(() => {
            this.dialogRef.close();
          }, 1500);
        }
      })
    } catch (error) {
      this.openErro('Ocorreu um erro ao enviar a requisição!')
    }
  }

  openErro(message: string) {
    this.dialog.open(ModalErroComponent, {
      width: '390px',
      data: message
    });
  }

  isFisica() {
    if (this.cadastrarForm.controls['tipo'].value == '')
      return true
    if (this.cadastrarForm.controls['tipo'].value === 'FISICA') {
      this.fieldsFisica()
      return true
    }
    return false
  }

  isJuridica() {
    if (this.cadastrarForm.controls['tipo'].value == '')
      return true
    if (this.cadastrarForm.controls['tipo'].value === 'JURIDICA') {
      this.fieldsJuridica()
      return true
    }
    return false
  }

  fieldsFisica() {
    this.cadastrarForm.get('cpf')?.enable()
    this.cadastrarForm.get('nome')?.enable()
    this.cadastrarForm.get('rg')?.enable()
    this.cadastrarForm.get('cnpj')?.disable()
    this.cadastrarForm.get('razao')?.disable()
    this.cadastrarForm.get('inscricao')?.disable()
  }

  fieldsJuridica() {
    this.cadastrarForm.get('cpf')?.disable()
    this.cadastrarForm.get('nome')?.disable()
    this.cadastrarForm.get('rg')?.disable()
    this.cadastrarForm.get('cnpj')?.enable()
    this.cadastrarForm.get('razao')?.enable()
    this.cadastrarForm.get('inscricao')?.enable()
  }

  onChangeTipo() {
    if (this.cadastrarForm.controls['tipo'].value === 'JURIDICA')
      this.fieldsJuridica()
    else
      this.fieldsFisica()
  }

}
