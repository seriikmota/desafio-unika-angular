import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {PaginationComponent} from "../../../components/pagination/pagination.component";
import {Subject} from "rxjs";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {CpfPipe} from "../../../shared/pipes/cpf.pipe";
import {AtivoPipe} from "../../../shared/pipes/ativo.pipe";
import {CnpjPipe} from "../../../shared/pipes/cnpj.pipe";
import {MonitoradorService} from "../../../shared/services/monitorador.service";
import {Monitorador, Monitoradores} from "../../../shared/models/monitorador";
import {TipoPipe} from "../../../shared/pipes/tipo.pipe";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ModalErroComponent} from "../../../components/modal-erro/modal-erro.component";
import {ModalImportarComponent} from "../../../components/modal-importar/modal-importar.component";
import {ModalExcluirComponent} from "../../../components/modal-excluir/modal-excluir.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditarComponent} from "../editar/editar.component";
import {CadastrarComponent} from "../cadastrar/cadastrar.component";

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
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatIcon,
    NgbCollapseModule,
    MatOption,
    MatSelectModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatPaginatorModule,
    PaginationComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIconButton,
    CpfPipe,
    AtivoPipe,
    CnpjPipe,
    TipoPipe,
    MatSort,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  filtroAtual!: string;
  filtroForm!: FormGroup
  displayedColumns: string[];
  isCollapsed: boolean = true;
  monitoradores: Monitoradores;
  dataSource: MatTableDataSource<Monitorador>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

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
    this.dialog.open(ModalImportarComponent, {
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



