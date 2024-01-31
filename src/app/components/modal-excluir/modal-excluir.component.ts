import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-excluir',
  standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent
    ],
  templateUrl: './modal-excluir.component.html',
  styleUrl: './modal-excluir.component.css'
})
export class ModalExcluirComponent {

}
