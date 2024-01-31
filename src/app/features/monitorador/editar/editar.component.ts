import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgIf} from "@angular/common";
import {Monitorador} from "../../../shared/models/monitorador";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-editar',
  standalone: true,
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}, provideNativeDateAdapter()],
  imports: [
    FormsModule,
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
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  form!: FormGroup

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
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
      enderecos: this.formBuilder.group({
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
    monitorador.data = this.formatarData(monitorador.data)
    console.log(monitorador)
  }

  isFisica() {
    if (this.form.controls['tipo'].value == '')
      return true
    if (this.form.controls['tipo'].value === 'FISICA') {
      this.fieldsFisica()
      return true
    }
    return false
  }

  isJuridica() {
    if (this.form.controls['tipo'].value == '')
      return true
    if (this.form.controls['tipo'].value === 'JURIDICA') {
      this.fieldsJuridica()
      return true
    }
    return false
  }

  fieldsFisica() {
    this.form.get('cpf')?.enable()
    this.form.get('nome')?.enable()
    this.form.get('rg')?.enable()
    this.form.get('cnpj')?.disable()
    this.form.get('razao')?.disable()
    this.form.get('inscricao')?.disable()
  }

  fieldsJuridica() {
    this.form.get('cpf')?.disable()
    this.form.get('nome')?.disable()
    this.form.get('rg')?.disable()
    this.form.get('cnpj')?.enable()
    this.form.get('razao')?.enable()
    this.form.get('inscricao')?.enable()
  }

  onChangeTipo() {
    if (this.form.controls['tipo'].value === 'JURIDICA')
      this.fieldsJuridica()
    else
      this.fieldsFisica()
  }

  formatarData(data: string) {
    const formatDate = (date: string): string => {
      const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
      // @ts-ignore
      const formatter = new Intl.DateTimeFormat('pt-BR', options);
      // @ts-ignore
      return formatter.format(date);
    };
    return formatDate(data)
  }
}
