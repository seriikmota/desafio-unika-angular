import {Component, OnInit} from '@angular/core';
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
import {ListagemMonitoradorComponent} from "../listagem-monitorador/listagem-monitorador.component";
import {ModalErroComponent} from "../../../components/modal-erro/modal-erro.component";
import {CadastrarEnderecoComponent} from "../../endereco/cadastrar-endereco/cadastrar-endereco.component";
import {EnderecoService} from "../../../shared/services/endereco.service";
import {ModalSucessoComponent} from "../../../components/modal-sucesso/modal-sucesso.component";

@Component({
  selector: 'app-cadastrar-monitorador',
  standalone: true,
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}, provideNativeDateAdapter(), MonitoradorService, EnderecoService],
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
    NgForOf,
    CadastrarEnderecoComponent
  ],
  templateUrl: './cadastrar-monitorador.component.html',
  styleUrl: './cadastrar-monitorador.component.css'
})
export class CadastrarMonitoradorComponent implements OnInit {
  cadastrarForm!: FormGroup
  feedbackError: boolean
  feedbackMessage: string
  estados: string[]

  constructor(private dialogRef: MatDialogRef<ListagemMonitoradorComponent>,
              private dialog: MatDialog,
              private service: MonitoradorService,
              private enderecoService: EnderecoService,
              private formBuilder: FormBuilder){
    this.feedbackError = false
    this.feedbackMessage = ''

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
      enderecos: this.formBuilder.group({
        cep: ['', Validators.required],
        endereco: ['', Validators.required],
        numero: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        telefone: ['', Validators.required],
        principal: ['', Validators.required],
      })
    })
    this.estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
      'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  }

  ngOnInit() {
    this.cadastrarForm.get('enderecos.cep')?.valueChanges.subscribe(cep => {
      if (cep.replace(/[^0-9]/g, '').length == 8)
        this.enderecoService.getCep(cep).subscribe(endereco => {
          this.cadastrarForm.get('enderecos.endereco')?.setValue(endereco.endereco)
          this.cadastrarForm.get('enderecos.bairro')?.setValue(endereco.bairro)
          this.cadastrarForm.get('enderecos.cidade')?.setValue(endereco.cidade)
          this.cadastrarForm.get('enderecos.estado')?.setValue(endereco.estado)
        })
    })
  }

  onSubmit(monitorador: Monitorador) {
    console.log(monitorador)
    try {
      this.service.postRegister(monitorador).subscribe({
        error:(e) => {
          this.feedbackError = true
          this.feedbackMessage = e.error
        },
        complete:() => {
          this.feedbackError = false
          this.dialogRef.close()
          this.dialog.open(ModalSucessoComponent, {
            width: '390px',
            data: 'Monitorador cadastrado com sucesso!'
          })
        }
      })
    } catch(error) {
      this.dialog.open(ModalErroComponent, {
        width: '390px',
        data: 'Ocorreu um erro ao enviar a requisição!'
      });
    }
  }

  onChangeTipo() {
    if(this.cadastrarForm.controls['tipo'].value != 'JURIDICA'){
      this.cadastrarForm.get('cpf')?.enable()
      this.cadastrarForm.get('nome')?.enable()
      this.cadastrarForm.get('rg')?.enable()
      this.cadastrarForm.get('cnpj')?.disable()
      this.cadastrarForm.get('razao')?.disable()
      this.cadastrarForm.get('inscricao')?.disable()
    }
    else{
      this.cadastrarForm.get('cpf')?.disable()
      this.cadastrarForm.get('nome')?.disable()
      this.cadastrarForm.get('rg')?.disable()
      this.cadastrarForm.get('cnpj')?.enable()
      this.cadastrarForm.get('razao')?.enable()
      this.cadastrarForm.get('inscricao')?.enable()
    }
  }
}
