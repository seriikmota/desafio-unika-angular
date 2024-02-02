import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
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
import {Endereco} from "../../../shared/models/endereco";
import {HttpClientModule} from "@angular/common/http";

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
  feedbackError: boolean;
  feedbackSuccess: boolean;
  feedbackMessage: string;
  estados: string[];
  monitoradores!: Monitoradores

  constructor(@Inject(MAT_DIALOG_DATA) public data: Endereco,
              private formBuilder: FormBuilder,
              private service: EnderecoService,
              private monitoradorService: MonitoradorService) {
    this.feedbackError = false;
    this.feedbackSuccess = false;
    this.feedbackMessage = '';
    this.estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
      'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

    this.getMonitoradores()
    this.editarForm = this.formBuilder.group({
      cep: [this.data.cep, Validators.required],
      endereco: [this.data.endereco, Validators.required],
      numero: [this.data.numero, Validators.required],
      bairro: [this.data.bairro, Validators.required],
      cidade: [this.data.cidade, Validators.required],
      estado: [this.data.estado, Validators.required],
      telefone: [this.data.telefone, Validators.required],
      monitorador: [this.data.monitorador.id, Validators.required],
      principal: [this.data.principal, Validators.required],
    });
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
    console.log(endereco)
  }

  getMonitoradores() {
    this.monitoradorService.getList().subscribe(monitoradores => {
      this.monitoradores = monitoradores
    })
  }

}
