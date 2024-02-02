import {Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
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
import {Monitoradores} from "../../../shared/models/monitorador";
import {MonitoradorPipe} from "../../../shared/pipes/monitorador.pipe";

@Component({
  selector: 'app-cadastrar-endereco',
  standalone: true,
  providers: [EnderecoService, MonitoradorService],
  imports: [
    HttpClientModule,
    MatButton,
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
  feedbackError: boolean;
  feedbackSuccess: boolean;
  feedbackMessage: string;
  estados: string[];
  monitoradores!: Monitoradores

  constructor(private formBuilder: FormBuilder,
              private service: EnderecoService,
              private monitoradorService: MonitoradorService) {
    this.estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
      'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
    this.feedbackError = false;
    this.feedbackSuccess = false;
    this.feedbackMessage = '';

    this.cadastrarForm = this.formBuilder.group({
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      telefone: ['', Validators.required],
      monitorador: ['', Validators.required],
      principal: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cadastrarForm.get('cep')?.valueChanges.subscribe(cep => {
      if (cep.replace(/[^0-9]/g, '').length == 8)
        this.service.getCep(cep).subscribe(endereco => {
          this.cadastrarForm.controls['endereco'].setValue(endereco.endereco)
          this.cadastrarForm.controls['bairro'].setValue(endereco.bairro)
          this.cadastrarForm.controls['cidade'].setValue(endereco.cidade)
          this.cadastrarForm.controls['estado'].setValue(endereco.estado)
        })
    })

    this.getMonitoradores()
  }

  onSubmit(endereco: Endereco) {
    console.log(endereco)
  }

  getMonitoradores(){
    this.monitoradorService.getList().subscribe(monitoradores => {
      this.monitoradores = monitoradores
    })
  }

}
