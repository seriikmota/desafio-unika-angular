import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {Monitorador} from "../../../shared/models/monitorador";
import {MonitoradorService} from "../../../shared/services/monitorador.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}, provideNativeDateAdapter(), MonitoradorService],
  imports: [
    HttpClientModule,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
  cadastrarForm!: FormGroup
  feedbackError: boolean;
  feedbackSuccess: boolean;
  feedbackMessage: string;

  constructor(private formBuilder: FormBuilder,
              private service: MonitoradorService) {
    this.feedbackError = false;
    this.feedbackSuccess = false;
    this.feedbackMessage = '';

    this.cadastrarForm = this.formBuilder.group({
      tipo: ['', Validators.required],
      cnpj: ['', Validators.required],
      razao: ['', Validators.required],
      inscricao: ['', Validators.required],
      cpf: ['', Validators.required],
      nome: ['', Validators.required],
      rg: ['', Validators.required],
      data: ['', Validators.required],
      email: ['', Validators.required],
      ativo: ['', Validators.required],
      enderecos : this.formBuilder.group({
        cep: ['', Validators.required],
        endereco: ['', Validators.required],
        numero: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        telefone: ['', Validators.required],
        monitorador: [''],
        principal: ['', Validators.required],
      })
    })
  }

  onSubmit(monitorador: Monitorador) {
    console.log(monitorador)
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
