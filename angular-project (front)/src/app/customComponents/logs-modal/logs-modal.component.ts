import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LogServicioService } from '../../services/log-servicio.service';
declare var $: any;

@Component({
  selector: 'app-logs-modal',
  templateUrl: './logs-modal.component.html',
  styleUrls: ['./logs-modal.component.css']
})
export class LogsModalComponent {

  @Input('data') public objLogs: any = null;
  @Output('actualiza') actualiza = new EventEmitter();

  constructor(
    private log: LogServicioService
  ) {}

  agregarNota() {
    if ($('#inputNota').val() === '') {
      return;
    }
    this.log.postLog({
      idservicio: this.objLogs.selected,
      estatus: 'NOTA',
      codigo_usuario: this.objLogs.admin,
      tipo_usuario: 'ADMIN',
      notas: $('#inputNota').val()
    })
    .then(() => {
      $('#inputNota').val('');
      this.actualiza.emit();
    }).catch(e => console.log(e));
  }

}
