import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-modal',
  standalone: true,
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}, provideNativeDateAdapter()],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    MatInput,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    NgIf,
    ReactiveFormsModule,
    MatButton,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

}
