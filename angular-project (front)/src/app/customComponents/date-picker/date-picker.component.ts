import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  @ViewChild('drp') drp: any;
  @Input() selected = null;
  @Input() position = null;
  @Output() change: EventEmitter<any> = new EventEmitter();

  isDisabled = true;
  textoBoton = 'Seleccionar fechas';
  posRight = false;

  systemDate = new Date();
  today = new Date(this.systemDate.getTime() - this.systemDate.getTimezoneOffset() * 60000); // FIX de timezone: usar siempre
  rangoFechas: Date[];
  rangoValido = {
    min: new Date( this.today.getTime() - (1000 * 60 * 60 * 24 * 365) ), // 12 meses atras
    max: this.today
  };
  bsConfig: Partial<BsDatepickerConfig> = {
    rangeInputFormat: 'DD/MM/YYYY',
    containerClass: 'theme-default',
    customTodayClass: 'todayCalendar',
    adaptivePosition: true
  };

  constructor(
    private localeService: BsLocaleService
  ) {
    this.isDisabled = true;
    this.textoBoton = 'Seleccionar fechas';
    this.localeService.use('es');
    moment.locale('es');
  }

  ngOnInit() {
    this.posRight = (this.position === 'right') ? true : false;

    switch (this.selected) {
      case 'hoy':             this.hoy(); break;
      case 'ayer':            this.ayer(); break;
      case 'ultimos7dias':    this.ultimos7dias(); break;
      case 'ultimos30dias':   this.ultimos30dias(); break;
      case 'esteMes':         this.esteMes(); break;
      case 'mesPasado':       this.mesPasado(); break;
      case 'hace3meses':      this.hace3meses(); break;
      case 'hace6meses':      this.hace6meses(); break;
      case 'esteanio':        this.esteanio(); break;
      case 'hace1anio':       this.hace1anio(); break;
      case 'aniopasado':      this.aniopasado(); break;
      case 'manualmente':     this.manualmente(); break;
      default:  break;
    }

  }

  valueChange(dates: Date[]) {
    try {
      this.change.emit([dates[0].toISOString().substr(0, 10), dates[1].toISOString().substr(0, 10)]);
    } catch (e) {
      this.change.emit(null);
    }
  }

  hoy() {
    this.isDisabled = true;
    this.textoBoton = 'Hoy';
    this.rangoFechas = [
      this.today,
      this.today
    ];
  }

  ayer() {
    this.isDisabled = true;
    this.textoBoton = 'Ayer';
    this.rangoFechas = [
      new Date(moment(this.today).subtract(1, 'day').format()),
      new Date(moment(this.today).subtract(1, 'day').format())
    ];
  }

  ultimos7dias() {
    this.isDisabled = true;
    this.textoBoton = 'Últimos 7 días';
    this.rangoFechas = [
      new Date(moment(this.today).subtract(7, 'days').format()),
      this.today
    ];
  }

  ultimos30dias() {
    this.isDisabled = true;
    this.textoBoton = 'Últimos 30 días';
    this.rangoFechas = [
      new Date(moment(this.today).subtract(30, 'days').format()),
      this.today
    ];
  }

  esteMes() {
    this.isDisabled = true;
    this.textoBoton = 'Este mes';
    this.rangoFechas = [
      new Date( this.today.getFullYear(), this.today.getMonth(), 1 ),
      this.today
    ];
  }

  mesPasado() {
    this.isDisabled = true;
    this.textoBoton = 'Mes pasado';
    const haceunmes = new Date(moment().subtract(1, 'month').format());
    this.rangoFechas = [
      new Date( haceunmes.getFullYear(), haceunmes.getMonth(), 1 ),
      new Date( haceunmes.getFullYear(), haceunmes.getMonth() + 1, 0 ),
    ];
  }

  hace3meses() {
    this.isDisabled = true;
    this.textoBoton = 'Hace 3 meses';
    this.rangoFechas = [
      new Date(moment().subtract(3, 'months').format()),
      this.today
    ];
  }

  hace6meses() {
    this.isDisabled = true;
    this.textoBoton = 'Hace 6 meses';
    this.rangoFechas = [
      new Date(moment().subtract(6, 'months').format()),
      this.today
    ];
  }

  esteanio() {
    this.isDisabled = true;
    this.textoBoton = 'Este año';
    this.rangoFechas = [
      new Date( this.today.getFullYear(), 0, 1 ),
      this.today
    ];
  }

  hace1anio() {
    this.isDisabled = true;
    this.textoBoton = 'Hace un año';
    this.rangoFechas = [
      new Date(moment().subtract(1, 'year').format()),
      this.today
    ];
  }

  aniopasado() {
    // enero 0, diciembre 11... en la segunda fecha se pone 12 para obtener el ultimo osea 0
    this.isDisabled = true;
    this.textoBoton = 'Año pasado';
    const haceunanio = new Date(moment().subtract(1, 'year').format());
    this.rangoFechas = [
      new Date( haceunanio.getFullYear(), 0, 1 ),
      new Date( haceunanio.getFullYear(), 12, 0 ),
    ];
  }

  manualmente() {
    this.textoBoton = 'Seleccionar manualmente';
    this.isDisabled = false;
    setTimeout(() => {
      this.drp.toggle();
    }, 400);
  }

}
