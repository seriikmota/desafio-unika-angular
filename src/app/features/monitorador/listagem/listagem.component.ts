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
import {of, Subject, tap} from "rxjs";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {CpfPipe} from "../../../shared/pipes/cpf.pipe";
import {AtivoPipe} from "../../../shared/pipes/ativo.pipe";
import {CnpjPipe} from "../../../shared/pipes/cnpj.pipe";
import {MonitoradorService} from "../../../shared/services/monitorador.service";
import {Monitorador, MonitoradorList} from "../../../shared/models/monitorador";

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

enum TipoPessoa {
  Fisica = 1,
  Juridica = 2
}

@Component({
  selector: 'app-listagem',
  standalone: true,
  providers: [MonitoradorService],
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
    CnpjPipe
  ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  displayedColumns: string[] = ['id', 'tipo', 'cnpj', 'razao', 'cpf', 'nome', 'ativo', 'acoes'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  isCollapsed = true;

  monitoradores!: Monitorador[];
  constructor(private service: MonitoradorService) {
  }
  ngOnInit(): void {
    this.montarTabela()
  }

  montarTabela(){
    this.service.getMonitoradores().subscribe(monitoradores => {
      this.monitoradores = monitoradores;
      this.dataSource = new MatTableDataSource<any>(this.monitoradores)
    })
  }
}



