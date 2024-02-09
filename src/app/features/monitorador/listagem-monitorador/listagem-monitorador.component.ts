import {Component, OnInit, ViewChild} from '@angular/core';
import {AtivoPipe} from "../../../shared/pipes/ativo.pipe";
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
import {CpfOrCnpjPipe} from "../../../shared/pipes/cpf-or-cnpj.pipe";

@Component({
  selector: 'app-listagem-monitorador',
  standalone: true,
  providers: [{provide: MatPaginatorIntl, useClass: pagination}, MonitoradorService],
  imports: [
    AtivoPipe,
    CpfOrCnpjPipe,
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
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator
  displayedColumns: string[]
  isCollapsed: boolean = true
  filtroAtual!: string
  filtroForm!: FormGroup
  monitoradores: Monitoradores
  dataSource: MatTableDataSource<Monitorador>

  constructor(private dialog: MatDialog,
              private service: MonitoradorService,
              private formBuilder: FormBuilder) {
    //this.displayedColumns = ['id', 'tipo', 'cnpj', 'razao', 'cpf', 'nome', 'enderecos', 'ativo', 'acoes']
    this.displayedColumns = ['id', 'tipo', 'cpfOrCnpj', 'nomeOrRazao', 'enderecos', 'ativo', 'acoes']
    this.monitoradores = []
    this.ordenar(this.monitoradores)
    this.dataSource = new MatTableDataSource<Monitorador>(this.monitoradores)
    this.dataSource.paginator = this.paginator

    this.filtroForm = this.formBuilder.group({
      texto: [''],
      tipo: [''],
      ativo: ['']
    });
  }

  ngOnInit(): void {
    this.listarMonitorador('')

    this.filtroForm.valueChanges.subscribe(filtros => {
      this.filtroAtual = filtros
      this.listarMonitorador(filtros)
    })
  }

  openCadastrar() {
    const dialogRef = this.dialog.open(CadastrarMonitoradorComponent, {
      width: '700px',
    })
    dialogRef.afterClosed().subscribe(() => {
      this.listarMonitorador('')
    })
  }

  openEditar(monitorador: Monitorador) {
    const dialogRef = this.dialog.open(EditarMonitoradorComponent, {
      width: '700px',
      data: monitorador
    })
    dialogRef.afterClosed().subscribe(() => {
      this.listarMonitorador('')
    })
  }

  openExcluir(id: string) {
    const dialogRef = this.dialog.open(ExcluirMonitoradorComponent, {
      width: '390px',
      data: id
    })
    dialogRef.afterClosed().subscribe(() => {
      this.listarMonitorador('')
    })
  }

  openImportar() {
    const dialogRef = this.dialog.open(ImportarMonitoradorComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarMonitorador('')
    })
  }

  openEnderecos(id: number, enderecos: Enderecos) {
    const dialogRef = this.dialog.open(ListagemEnderecoComponent, {
      width: '1100px',
      data: {monitoradorId: id, enderecos: enderecos}
    })
    dialogRef.afterClosed().subscribe(() => {
      this.listarMonitorador('')
    })
  }

  downloadPdf(id: any) {
    this.service.getPdf(id, this.filtroAtual);
  }

  downloadExcel(id: any) {
    this.service.getExcel(id, this.filtroAtual);
  }

  listarMonitorador(filtros: any) {
    this.service.getList(filtros).subscribe({
      next: value => {
        this.monitoradores = value;
        this.ordenar(value);
        this.dataSource = new MatTableDataSource<Monitorador>(this.monitoradores);
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.dialog.open(ModalErroComponent, {
          width: '390px',
          data: 'Ocorreu um erro ao fazer a listagem dos monitoradores!'
        });
      }
    });
  }

  ordenar(monitoradores: Monitoradores) {
    monitoradores.sort((a, b) => (a.razao < b.razao) ? -1 : 1);
    monitoradores.sort((a, b) => (a.nome < b.nome) ? -1 : 1);
    monitoradores.sort((a, b) => (a.tipo < b.tipo) ? -1 : 1);
  }
}
