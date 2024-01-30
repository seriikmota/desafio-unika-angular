import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "./modal/modal.component";

@Component({
  selector: 'app-endereco',
  standalone: true,
  providers: [],
  imports: [
    MatButton
  ],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.css'
})
export class EnderecoComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ModalComponent, {
    });
  }
}
