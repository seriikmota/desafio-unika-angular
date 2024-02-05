import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MonitoradorPipe} from "../../../shared/pipes/monitorador.pipe";
import {NgForOf, NgIf} from "@angular/common";
import {Monitoradores} from "../../../shared/models/monitorador";
import {EnderecoService} from "../../../shared/services/endereco.service";
import {MonitoradorService} from "../../../shared/services/monitorador.service";
import {Endereco, Enderecos} from "../../../shared/models/endereco";
import {HttpClientModule} from "@angular/common/http";
import {DialogRef} from "@angular/cdk/dialog";
import {ListagemEnderecoComponent} from "../listagem-endereco/listagem-endereco.component";
import {ModalErroComponent} from "../../../components/modal-erro/modal-erro.component";
import {ModalSucessoComponent} from "../../../components/modal-sucesso/modal-sucesso.component";
import {end} from "@popperjs/core";

@Component({
  selector: 'app-editar-endereco',
  standalone: true,
  providers: [EnderecoService, MonitoradorService],
  imports: [
    FormsModule,
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
  templateUrl: './editar-endereco.component.html',
  styleUrl: './editar-endereco.component.css'
})
export class EditarEnderecoComponent implements OnInit {
  editarForm!: FormGroup
  feedbackError: boolean
  feedbackMessage: string
  estados: string[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: {endereco: Endereco, monitoradorId: number},
              private dialogRef: DialogRef<ListagemEnderecoComponent>,
              private dialog: MatDialog,
              private service: EnderecoService,
              private formBuilder: FormBuilder) {
    this.feedbackError = false
    this.feedbackMessage = ''
    this.estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
      'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

    this.editarForm = this.formBuilder.group({
      cep: [this.data.endereco.cep, Validators.required],
      endereco: [this.data.endereco.endereco, Validators.required],
      numero: [this.data.endereco.numero, Validators.required],
      bairro: [this.data.endereco.bairro, Validators.required],
      cidade: [this.data.endereco.cidade, Validators.required],
      estado: [this.data.endereco.estado, Validators.required],
      telefone: [this.data.endereco.telefone, Validators.required],
      principal: [this.data.endereco.principal, Validators.required],
    })
  }

  ngOnInit() {
    this.editarForm.get('cep')?.valueChanges.subscribe(cep => {
      if (cep.replace(/[^0-9]/g, '').length == 8)
        this.service.getCep(cep).subscribe(endereco => {
          this.editarForm.controls['endereco'].setValue(endereco.endereco)
          this.editarForm.controls['bairro'].setValue(endereco.bairro)
          this.editarForm.controls['cidade'].setValue(endereco.cidade)
          this.editarForm.controls['estado'].setValue(endereco.estado)
        })
    })
  }

  onSubmit(endereco: Endereco) {
    try {
      this.service.putEdit(this.data.monitoradorId, this.data.endereco.id, endereco).subscribe({
        error: (e) => {
          this.feedbackError = true;
          this.feedbackMessage = e.error;
        },
        complete:() => {
          this.feedbackError = false
          this.dialogRef.close()
          this.dialog.open(ModalSucessoComponent, {
            width: '390px',
            data: 'Endereço editado com sucesso!'
          })
        }
      })
    } catch (error) {
      this.dialog.open(ModalErroComponent, {
        width: '390px',
        data: 'Ocorreu um erro ao realizar a requisição!'
      });
    }
  }
}
