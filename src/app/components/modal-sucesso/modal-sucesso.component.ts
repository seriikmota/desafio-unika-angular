import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-modal-sucesso',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './modal-sucesso.component.html',
  styleUrl: './modal-sucesso.component.css'
})
export class ModalSucessoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public message: string,
              private dialogRef: DialogRef) {
    setTimeout(() => {
      this.dialogRef.close();
    }, 1500);
  }
}
