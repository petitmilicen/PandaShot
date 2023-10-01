import { Component } from '@angular/core';
import { ImagenesServicioService } from "./imagenes-servicio.service";
import { UsuariosServicioService } from '../register/usuarios-servicio.service';
import { Usuario } from '../register/usuario.model';
import { Router } from '@angular/router';
import { BdserviceService } from '../services/bdservice.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
  
})
export class Tab1Page {

  usuarioLogueado: Usuario | null | undefined;
  imagenes: any[] = [];

  constructor(private imagenesServicio: ImagenesServicioService, private usuariosServicio: UsuariosServicioService, private router: Router, private bdService: BdserviceService) {}

  ngOnInit() {
    this.bdService.getImagenes().then((imagenes) => {
      this.imagenes = imagenes;

      console.log('Datos de imágenes en la base de datos:');
      console.log(this.imagenes);
    });
  }

  ionViewWillEnter(){
    this.bdService.getImagenes().then((imagenes) => {
      this.imagenes = imagenes;

      console.log('Recargado nuevamente...');
      console.log(this.imagenes);
    });
  }

}




