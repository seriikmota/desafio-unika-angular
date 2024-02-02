import {Component, Inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ModalErroComponent} from "../../../components/modal-erro/modal-erro.component";
import {ModalExcluirComponent} from "../../../components/modal-excluir/modal-excluir.component";
import {Endereco, Enderecos} from "../../../shared/models/endereco";
import {EnderecoService} from "../../../shared/services/endereco.service";
import {CepPipe} from "../../../shared/pipes/cep.pipe";
import {TelefonePipe} from "../../../shared/pipes/telefone.pipe";
import {PrincipalPipe} from "../../../shared/pipes/principal.pipe";
import {MonitoradorPipe} from "../../../shared/pipes/monitorador.pipe";
import {MonitoradorService} from "../../../shared/services/monitorador.service";
import {NgForOf} from "@angular/common";
import {CadastrarEnderecoComponent} from "../cadastrar-endereco/cadastrar-endereco.component";
import {EditarEnderecoComponent} from "../editar-endereco/editar-endereco.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-listagem-endereco',
  standalone: true,
  providers: [EnderecoService],
  imports: [
    HttpClientModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSort,
    MatSuffix,
    MatTableModule,
    ReactiveFormsModule,
    NgbCollapse,
    CepPipe,
    TelefonePipe,
    PrincipalPipe,
    MonitoradorPipe,
    NgForOf
  ],
  templateUrl: './listagem-endereco.component.html',
  styleUrl: './listagem-endereco.component.css'
})
export class ListagemEnderecoComponent implements OnInit {
  displayedColumns: string[];
  isCollapsed: boolean = true;
  filtroAtual!: string;
  filtroForm!: FormGroup
  enderecos: Enderecos;
  dataSource: MatTableDataSource<Endereco>;
  estados!: string[];
  cidades!: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { monitorador: number, enderecos: Enderecos },
              private service: EnderecoService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {
    this.displayedColumns = ['cep', 'endereco', 'numero', 'bairro', 'cidade', 'estado', 'telefone', 'principal', 'acoes'];
    this.enderecos = this.data.enderecos;
    this.dataSource = new MatTableDataSource<Endereco>(this.enderecos);
  }

  ngOnInit(): void {
    this.filtroForm = this.formBuilder.group({
      texto: [''],
      estado: [''],
      cidade: [''],
      monitorador: [this.data.monitorador]
    })

    this.filtroForm.valueChanges.subscribe(filtros => {
      this.getEnderecos(filtros);
    });
  }

  openCadastrar() {
    this.dialog.open(CadastrarEnderecoComponent, {
      width: '700px'
    });
  }

  onEditar(endereco: Endereco) {
    this.dialog.open(EditarEnderecoComponent, {
      width: '700px',
      data: endereco
    });
  }

  openExcluir(id: string) {
    this.dialog.open(ModalExcluirComponent, {
      width: '390px',
    });
  }

  onPdf(id: any) {
    this.service.getPdf(id, this.filtroAtual);
  }

  onExcel(id: any) {
    this.service.getExcel(id, this.filtroAtual);
  }

  openErro() {
    this.dialog.open(ModalErroComponent, {
      width: '390px',
    });
  }

  getEnderecos(filtros: string) {
    this.service.getFilter(filtros).subscribe(enderecos => {
      this.enderecos = enderecos;
      this.ordenar(this.enderecos)
      this.dataSource = new MatTableDataSource<any>(this.enderecos);
    });
  }

  ordenar(enderecos: Enderecos) {
    enderecos.sort((a, b) => (a.estado < b.estado) ? -1 : 1);
    enderecos.sort((a, b) => (a.cidade < b.cidade) ? -1 : 1);
    enderecos.sort((a, b) => (a.endereco < b.endereco) ? -1 : 1);
  }

  getFieldsFilter(){
    this.estados = this.enderecos.map(endereco => endereco.estado);
    this.estados = this.estados.filter((estado, index, self) => self.indexOf(estado) === index);
    this.estados.sort();
    this.cidades = this.enderecos.map(endereco => endereco.cidade);
    this.cidades = this.cidades.filter((cidade, index, self) => self.indexOf(cidade) === index);
    this.cidades.sort();
    console.log('GETS: ' + this.estados + ' - ' + this.enderecos)
  }

}
