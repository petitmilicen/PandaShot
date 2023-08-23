import { Component } from '@angular/core';
import { ImagenesServicioService } from "./imagenes-servicio.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  imagenes: any[] = [];

  constructor(private imagenesServicio: ImagenesServicioService) {}

  ngOnInit(){
    this.imagenes = this.imagenesServicio.getImagenes();
  }

}
