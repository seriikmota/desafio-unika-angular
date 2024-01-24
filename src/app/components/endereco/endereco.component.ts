import { Component } from '@angular/core';
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import {MatFormField} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormControl} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";


@Component({
  selector: 'app-endereco',
  standalone: true,
  imports: [
    NgbCollapseModule,
    MatFormField,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.css'
})
export class EnderecoComponent {
  isCollapsed = true;
  disableSelect = new FormControl(false);
}
