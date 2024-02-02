import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-modal-excluir',
  standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        NgIf
    ],
  templateUrl: './modal-excluir.component.html',
  styleUrl: './modal-excluir.component.css'
})
export class ModalExcluirComponent {
  feedbackError: boolean;
  feedbackSuccess: boolean;
  feedbackMessage: string;
  constructor() {
    this.feedbackError = false;
    this.feedbackSuccess = false;
    this.feedbackMessage = '';
  }

}
