import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {AtivoPipe} from "../../../shared/pipes/ativo.pipe";
import {CnpjPipe} from "../../../shared/pipes/cnpj.pipe";
import {CpfPipe} from "../../../shared/pipes/cpf.pipe";
import {MatButton} from "@angular/material/button";
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
import {Subject} from "rxjs";
import {MonitoradorService} from "../../../shared/services/monitorador.service";
import {Monitorador, Monitoradores} from "../../../shared/models/monitorador";
import {MatDialog} from "@angular/material/dialog";
import {CadastrarComponent} from "../cadastrar/cadastrar.component";
import {EditarComponent} from "../editar/editar.component";
import {ModalErroComponent} from "../../../components/modal-erro/modal-erro.component";
import {ModalExcluirComponent} from "../../../components/modal-excluir/modal-excluir.component";
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";
import {ImportarComponent} from "../importar/importar.component";
import {Enderecos} from "../../../shared/models/endereco";
import {HttpClientModule} from "@angular/common/http";

@Injectable()
export class pagination implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = $localize`Primeira página`;
  itemsPerPageLabel = $localize`Itens por página:`;
  lastPageLabel = $localize`Ultima página`;

  nextPageLabel = 'Próxima página';
  previousPageLabel = 'Página anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Página ${page + 1} de ${amountPages}`;
  }
}

@Component({
  selector: 'app-listagem',
  standalone: true,
  providers: [{provide: MatPaginatorIntl, useClass: pagination}, MonitoradorService],
  imports: [
    AtivoPipe,
    CnpjPipe,
    CpfPipe,
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
    ReactiveFormsModule,
    TipoPipe,
    NgbCollapse,
    HttpClientModule
  ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
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
    this.displayedColumns = ['id', 'tipo', 'cnpj', 'razao', 'cpf', 'nome', 'ativo', 'acoes'];
    this.monitoradores = [];
    this.dataSource = new MatTableDataSource<Monitorador>(this.monitoradores);
  }

  ngOnInit(): void {
    this.service.getList().subscribe(monitoradores => {
      this.monitoradores = monitoradores;
      this.ordenar(monitoradores);
      this.dataSource = new MatTableDataSource<any>(this.monitoradores);
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
    this.dialog.open(CadastrarComponent,{
      width: '700px'
    });
  }

  onEditar(monitorador: Monitorador) {
    this.dialog.open(EditarComponent, {
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
    this.dialog.open(ImportarComponent, {
      width: '550px',
    });
  }

  openExcluir(id: string) {
    console.log(id)
    this.dialog.open(ModalExcluirComponent, {
      width: '390px',
    });
  }

  ordenar(monitoradores: Monitoradores){
    monitoradores.sort((a, b) => (a.tipo < b.tipo) ? -1 : 1);
    monitoradores.sort((a, b) => (a.nome < b.nome) ? -1 : 1);
    monitoradores.sort((a, b) => (a.razao < b.razao) ? -1 : 1);
    monitoradores.sort((a, b) => (a.ativo < b.ativo) ? -1 : 1);
  }

}



