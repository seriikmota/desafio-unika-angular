import {Component, OnInit, signal} from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CnpjPipe} from "../../../shared/pipes/cnpj.pipe";
import {Monitorador} from "../../../shared/models/monitorador";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-cadastro',
  standalone: true,
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}, provideNativeDateAdapter()],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioGroup,
    MatRadioButton,
    MatDatepickerModule,
    FormsModule,
    CnpjPipe,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
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
      ativo: ['', Validators.required]
    })
  }

  onSubmit(monitorador: Monitorador) {
    console.log("Submited form!")
    console.log(monitorador)
  }
}
