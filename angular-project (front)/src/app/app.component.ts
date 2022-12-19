import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import 'admin-lte';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    setTheme('bs3'); // or 'bs4'
  }
  ngOnInit(): void {
    $('body').layout('fix');
  }
}
