import { Component, OnInit, AfterContentChecked } from '@angular/core';
import 'admin-lte';
declare function init_adminTemplate();
declare var $: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit, AfterContentChecked {

  constructor() { }

  ngOnInit(): void {
    init_adminTemplate();
  }

  ngAfterContentChecked() {
    $('body').layout('fix');
  }

}