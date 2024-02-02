import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {AtivoPipe} from "../../../shared/pipes/ativo.pipe";
import {CnpjPipe} from "../../../shared/pipes/cnpj.pipe";
import {CpfPipe} from "../../../shared/pipes/cpf.pipe";
import {MatButton, MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatTableModule, MatTableDataSource} from "@angular/material/table";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatSelect} from "@angular/material/select";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TipoPipe} from "../../../shared/pipes/tipo.pipe";
import {MonitoradorService} from "../../../shared/services/monitorador.service";
import {Monitorador, Monitoradores} from "../../../shared/models/monitorador";
import {MatDialog} from "@angular/material/dialog";
import {ModalErroComponent} from "../../../components/modal-erro/modal-erro.component";
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";
import {Enderecos} from "../../../shared/models/endereco";
import {HttpClientModule} from "@angular/common/http";
import {ListagemEnderecoComponent} from "../../endereco/listagem-endereco/listagem-endereco.component";
import {CadastrarMonitoradorComponent} from "../cadastrar-monitorador/cadastrar-monitorador.component";
import {EditarMonitoradorComponent} from "../editar-monitorador/editar-monitorador.component";
import {ImportarMonitoradorComponent} from "../importar-monitorador/importar-monitorador.component";
import {pagination, PaginationComponent} from "../../../components/pagination/pagination.component";
import {ExcluirMonitoradorComponent} from "../excluir-monitorador/excluir-monitorador.component";

@Component({
  selector: 'app-listagem-monitorador',
  standalone: true,
  providers: [{provide: MatPaginatorIntl, useClass: pagination}, MonitoradorService],
  imports: [
    AtivoPipe,
    CnpjPipe,
    CpfPipe,
    HttpClientModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatPaginator,
    MatSelect,
    MatSort,
    MatSuffix,
    MatTableModule,
    NgbCollapse,
    ReactiveFormsModule,
    TipoPipe,
    MatFabButton,
    MatMiniFabButton,
    PaginationComponent
  ],
  templateUrl: './listagem-monitorador.component.html',
  styleUrl: './listagem-monitorador.component.css'
})
export class ListagemMonitoradorComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  displayedColumns: string[];
  isCollapsed: boolean = true;
  filtroAtual!: string;
  filtroForm!: FormGroup;
  monitoradores: Monitoradores;
  dataSource: MatTableDataSource<Monitorador>;

  constructor(private service: MonitoradorService,
              private dialog:MatDialog,
              private formBuilder: FormBuilder) {
    this.displayedColumns = ['id', 'tipo', 'cnpj', 'razao', 'cpf', 'nome', 'enderecos', 'ativo', 'acoes'];
    this.monitoradores = [];
    this.dataSource = new MatTableDataSource<Monitorador>(this.monitoradores);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.service.getList().subscribe(monitoradores => {
      this.monitoradores = monitoradores;
      this.ordenar(monitoradores);
      this.dataSource = new MatTableDataSource<Monitorador>(this.monitoradores);
      this.dataSource.paginator = this.paginator;
    });

    this.filtroForm = this.formBuilder.group({
      texto: [''],
      tipo: [''],
      ativo: ['']
    });

    this.filtroForm.valueChanges.subscribe(filtros => {
      this.service.getFilter(filtros).subscribe(monitoradores => {
        this.filtroAtual = filtros;
        this.ordenar(monitoradores);
        this.dataSource.data = monitoradores;
      })
    })

  }

  openCadastrar(){
    this.dialog.open(CadastrarMonitoradorComponent,{
      width: '700px'
    });
  }

  onEditar(monitorador: Monitorador) {
    this.dialog.open(EditarMonitoradorComponent, {
      width: '700px',
      data: monitorador
    })
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

  openImportar() {
    this.dialog.open(ImportarMonitoradorComponent, {
      width: '550px',
    });
  }

  openExcluir(id: string) {
    this.dialog.open(ExcluirMonitoradorComponent, {
      width: '390px',
      data: id
    });
  }

  ordenar(monitoradores: Monitoradores){
    monitoradores.sort((a, b) => (a.tipo < b.tipo) ? -1 : 1);
    monitoradores.sort((a, b) => (a.nome < b.nome) ? -1 : 1);
    monitoradores.sort((a, b) => (a.razao < b.razao) ? -1 : 1);
    monitoradores.sort((a, b) => (a.ativo < b.ativo) ? -1 : 1);
  }

  openEnderecos(id: any, enderecos: Enderecos){
    console.log(id, enderecos)
    this.dialog.open(ListagemEnderecoComponent, {
      width: '1100px',
      data: {monitorador: id, enderecos: enderecos}
    })
  }

}
