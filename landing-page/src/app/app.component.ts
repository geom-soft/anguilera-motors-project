import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import videojs from 'video.js';
import Youtube from 'videojs-youtube';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  year = new Date().getFullYear();

  @ViewChild('target_video', {static: true}) target_video: ElementRef;
  player: videojs.Player;

  constructor() {
    console.log('Required', Youtube); // es necesario este clg para que funcione el techOrder de Youtube
  }

  ngOnInit() {
    $('#modal-video').modal('show');
  }

  ngAfterViewInit() {
    this.player = videojs(this.target_video.nativeElement, {
      fluid: true,
      techOrder: ['youtube'],
      controls: true,
      autoplay: !true,
      preload: !true,
      poster: 'assets/images/video_poster.png',
      sources: {
        src: 'https://www.youtube.com/watch?v=XHM5b_-s99U',
        type: 'video/youtube'
      }
    }, function onPlayerReady() {
      // console.log(this);
      // setTimeout(() => {
      //   this.preload();
      //   this.fluid('true');
      //   this.autoplay('muted');
      //   this.pause();
      // }, 3000);
    });

  }

  showModal(id) {
    switch (id) {
      case 1:   $('#modal-1').modal('show');   break;
      case 2:   $('#modal-2').modal('show');   break;
      case 3:   $('#modal-3').modal('show');   break;
      case 4:   $('#modal-4').modal('show');   break;
      case 5:   $('#modal-5').modal('show');   break;
      case 6:   $('#modal-6').modal('show');   break;
      default: break;
    }
  }

}
