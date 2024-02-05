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
import {Endereco, Enderecos} from "../../../shared/models/endereco";
import {EnderecoService} from "../../../shared/services/endereco.service";
import {CepPipe} from "../../../shared/pipes/cep.pipe";
import {TelefonePipe} from "../../../shared/pipes/telefone.pipe";
import {PrincipalPipe} from "../../../shared/pipes/principal.pipe";
import {MonitoradorPipe} from "../../../shared/pipes/monitorador.pipe";
import {NgForOf} from "@angular/common";
import {CadastrarEnderecoComponent} from "../cadastrar-endereco/cadastrar-endereco.component";
import {EditarEnderecoComponent} from "../editar-endereco/editar-endereco.component";
import {HttpClientModule} from "@angular/common/http";
import {ExcluirEnderecoComponent} from "../excluir-endereco/excluir-endereco.component";

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
  isCollapsed: boolean = true
  dataSource: MatTableDataSource<Endereco>
  displayedColumns: string[]
  enderecos: Enderecos
  filtroForm!: FormGroup
  filtroAtual!: string
  estados!: string[]
  cidades!: string[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: {monitoradorId: number, enderecos: Enderecos},
              private dialog: MatDialog,
              private service: EnderecoService,
              private formBuilder: FormBuilder) {
    this.displayedColumns = ['cep', 'endereco', 'numero', 'bairro', 'cidade', 'estado', 'telefone', 'principal', 'acoes'];
    this.enderecos = this.data.enderecos;
    this.ordenar(this.enderecos)
    this.dataSource = new MatTableDataSource<Endereco>(this.enderecos);

    this.filtroForm = this.formBuilder.group({
      texto: [''],
      estado: [''],
      cidade: [''],
      monitorador: [this.data.monitoradorId]
    })
    this.filtroAtual = this.filtroForm.value
  }

  ngOnInit(): void {
    this.filtroForm.valueChanges.subscribe(filtros => {
      this.filtroAtual = filtros
      this.listarEnderecos(filtros)
    });
  }

  openCadastrar() {
    const dialogRef = this.dialog.open(CadastrarEnderecoComponent, {
      width: '700px',
      data: this.data.monitoradorId
    });
    dialogRef.afterClosed().subscribe(() => {this.listarEnderecos(this.filtroAtual)})
  }

  openEditar(endereco: Endereco) {
    const dialogRef = this.dialog.open(EditarEnderecoComponent, {
      width: '700px',
      data: {endereco: endereco, monitoradorId: this.data.monitoradorId}
    });
    dialogRef.afterClosed().subscribe(() => {this.listarEnderecos(this.filtroAtual)})
  }

  openExcluir(enderecoId: number) {
    const dialogRef = this.dialog.open(ExcluirEnderecoComponent, {
      width: '390px',
      data: enderecoId
    });
    dialogRef.afterClosed().subscribe(() => {this.listarEnderecos(this.filtroAtual)})
  }

  downloadPdf(id: any) {
    this.service.getPdf(id, this.filtroAtual);
  }

  downloadExcel(id: any) {
    this.service.getExcel(id, this.filtroAtual);
  }

  listarEnderecos(filtros: any){
    this.service.getList(filtros).subscribe({
      next:(value) => {
        this.enderecos = value;
        this.ordenar(this.enderecos)
        this.dataSource = new MatTableDataSource<any>(this.enderecos);
      },
      error:() => {
        this.dialog.open(ModalErroComponent, {
          width: '390px',
          data: 'Ocorreu um erro ao realizar a listagem de endereços!'
        });
      }
    })
  }

  ordenar(enderecos: Enderecos) {
    enderecos.sort((a, b) => (a.principal < b.principal) ? -1 : 1);
    enderecos.sort((a, b) => (a.estado < b.estado) ? -1 : 1);
    enderecos.sort((a, b) => (a.cidade < b.cidade) ? -1 : 1);
    enderecos.sort((a, b) => (a.endereco < b.endereco) ? -1 : 1);
  }

}
