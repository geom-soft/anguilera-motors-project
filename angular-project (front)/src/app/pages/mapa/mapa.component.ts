import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, latLng, Marker } from 'leaflet';
import { ViajesService } from 'src/app/services/viajes.service';
import * as L from 'leaflet';
declare var $: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  objServicios = [];

  map: Map;

  mapInit = {
    lat: 21.8805389,
    lng: -102.2958653,
    zoom: 12
  };

  mapOptions = {
    layers: [
      tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 18, subdomains:['mt0','mt1','mt2','mt3'] })
    ],
    attributionControl: false,
    zoom: this.mapInit.zoom,
    center: latLng(this.mapInit.lat, this.mapInit.lng)
  };

  constructor(
    private service: ViajesService
  ) { }

  ngOnInit(): void {
    
  }

  onMapReady(map: Map) {

    this.map = map;

    $("#map").height($(window).height()).width($(window).width());
    this.map.invalidateSize();

    // Carga puntos desde el inicio
    this.cargarPuntos();

  }

  async cargarPuntos() {
    this.objServicios = await this.service.serviciosHoy();
    // console.log(this.objServicios);
    this.objServicios.forEach(element => {
      L.marker([element.lat, element.lng]).addTo(this.map).bindPopup(`
        <h4><b>Lugar: </b> ${element.alias_lugar}</h4>
        <h4><b>Empleado: </b> ${element.nombre_solicitante}</h4>
        <h4><b>Hora de recolección: </b> ${element.hora_recoleccion_entrada}</h4>
      `);
    });
  }

}
