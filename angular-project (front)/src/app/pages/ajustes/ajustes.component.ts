import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {

  objSettings = {
    vigencias: 0,
    pendientes: 0,
    aceptados: 0,
    cancelados: 0,
    reasignados: 0
  };

  constructor() { }

  ngOnInit(): void {
  }

}
