import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatFormField, MatLabel, MatSuffix, MatError} from "@angular/material/form-field";
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
  selector: 'app-editar',
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
    ReactiveFormsModule
  ],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {
  editarForm!: FormGroup
  feedbackError: boolean;
  feedbackSuccess: boolean;
  feedbackMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Monitorador,
              private formBuilder: FormBuilder,
              private service: MonitoradorService) {
    this.feedbackSuccess = false;
    this.feedbackError = false;
    this.feedbackMessage = '';

    this.editarForm = this.formBuilder.group({
      tipo: [this.data.tipo, Validators.required],
      cnpj: [this.data.cnpj, Validators.required],
      razao: [this.data.razao, Validators.required],
      inscricao: [this.data.inscricao, Validators.required],
      cpf: [this.data.cpf, Validators.required],
      nome: [this.data.nome, Validators.required],
      rg: [this.data.rg, Validators.required],
      data: [this.formatDateForInput(this.data.data), Validators.required],
      email: [this.data.email, Validators.required],
      ativo: [this.data.ativo, Validators.required]
    });
  }

  onSubmit(monitorador: Monitorador) {
    console.log(monitorador)
  }

  isFisica() {
    if (this.editarForm.controls['tipo'].value == '')
      return true
    if (this.editarForm.controls['tipo'].value === 'FISICA') {
      this.fieldsFisica()
      return true
    }
    return false
  }

  isJuridica() {
    if (this.editarForm.controls['tipo'].value == '')
      return true
    if (this.editarForm.controls['tipo'].value === 'JURIDICA') {
      this.fieldsJuridica()
      return true
    }
    return false
  }

  fieldsFisica() {
    this.editarForm.get('cnpj')?.disable()
    this.editarForm.get('razao')?.disable()
    this.editarForm.get('inscricao')?.disable()
    this.editarForm.get('cpf')?.enable()
    this.editarForm.get('nome')?.enable()
    this.editarForm.get('rg')?.enable()
  }

  fieldsJuridica() {
    this.editarForm.get('cnpj')?.enable()
    this.editarForm.get('razao')?.enable()
    this.editarForm.get('inscricao')?.enable()
    this.editarForm.get('cpf')?.disable()
    this.editarForm.get('nome')?.disable()
    this.editarForm.get('rg')?.disable()
  }

  onChangeTipo() {
    if (this.editarForm.controls['tipo'].value === 'JURIDICA')
      this.fieldsJuridica()
    else
      this.fieldsFisica()
  }

  formatDateForInput(data: string) {
    const dateParts = data.split("/");
    return new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]))
  }
}
