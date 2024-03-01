import {Component, isDevMode, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'monitorador-manager-angular';
  ngOnInit() {
    if (isDevMode()){
      console.log('Development!')
    }
    else {
      console.log('Production!')
    }
  }
}
