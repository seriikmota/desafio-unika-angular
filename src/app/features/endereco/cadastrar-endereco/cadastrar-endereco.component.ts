import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {EnderecoService} from "../../../shared/services/endereco.service";
import {HttpClientModule} from "@angular/common/http";
import {Endereco} from "../../../shared/models/endereco";
import {MonitoradorService} from "../../../shared/services/monitorador.service";
import {MonitoradorPipe} from "../../../shared/pipes/monitorador.pipe";
import {ModalErroComponent} from "../../../components/modal-erro/modal-erro.component";
import {DialogRef} from "@angular/cdk/dialog";
import {ListagemEnderecoComponent} from "../listagem-endereco/listagem-endereco.component";
import {ModalSucessoComponent} from "../../../components/modal-sucesso/modal-sucesso.component";

@Component({
  selector: 'app-cadastrar-endereco',
  standalone: true,
  providers: [EnderecoService, MonitoradorService],
  imports: [
    HttpClientModule,
    MatButton,
    MatDialogModule,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    MonitoradorPipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-endereco.component.html',
  styleUrl: './cadastrar-endereco.component.css'
})
export class CadastrarEnderecoComponent implements OnInit {
  cadastrarForm!: FormGroup
  feedbackError: boolean
  feedbackMessage: string
  estados: string[]

  constructor(@Inject(MAT_DIALOG_DATA) public monitoradorId: number,
              private dialogRef: DialogRef<ListagemEnderecoComponent>,
              private dialog: MatDialog,
              private service: EnderecoService,
              private formBuilder: FormBuilder) {
    this.estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
      'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
    this.feedbackError = false
    this.feedbackMessage = ''

    this.cadastrarForm = this.formBuilder.group({
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      telefone: ['', Validators.required],
      principal: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.cadastrarForm.get('cep')?.valueChanges.subscribe(cep => {
      if(cep.replace(/[^0-9]/g, '').length == 8)
        this.service.getCep(cep).subscribe({
          next:(value) => {
            this.feedbackError = false
            this.cadastrarForm.controls['endereco'].setValue(value.endereco)
            this.cadastrarForm.controls['bairro'].setValue(value.bairro)
            this.cadastrarForm.controls['cidade'].setValue(value.cidade)
            this.cadastrarForm.controls['estado'].setValue(value.estado)
          },
          error:() => {
            this.feedbackError = true
            this.feedbackMessage = 'Esse CEP não foi encontrado!'
          }
        })
    })
  }

  onSubmit(endereco: Endereco){
    try {
      this.service.postRegister(this.monitoradorId, endereco).subscribe({
        error:(e) => {
          this.feedbackError = true
          this.feedbackMessage = e.error
        },
        complete:() => {
          this.feedbackError = true
          this.dialogRef.close()
          this.feedbackMessage = ''
          this.dialog.open(ModalSucessoComponent, {
            width: '390px',
            data: 'Endereço cadastrado com sucesso!'
          })
        }
      })
    } catch(error) {
      this.dialog.open(ModalErroComponent, {
        width: '390px',
        data: 'Ocorreu um erro ao realizar a requisição!'
      })
    }
  }

}
