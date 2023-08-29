import { Component } from '@angular/core';
import { ImagenesServicioService } from "./imagenes-servicio.service";
import { UsuariosServicioService } from '../register/usuarios-servicio.service';
import { Usuario } from '../register/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
  
})
export class Tab1Page {
  usuarioLogueado: Usuario | null | undefined;
  imagenes: any[] = [];

  constructor(private imagenesServicio: ImagenesServicioService, private usuariosServicio: UsuariosServicioService, private router: Router) {}

  ngOnInit(){
    this.imagenes = this.imagenesServicio.getImagenes();
    this.usuarioLogueado = this.usuariosServicio.getUsuarioLogueado();
    console.log(this.imagenes);
  }

  ionViewWillEnter(){
    this.imagenes = this.imagenesServicio.getImagenes();
    this.usuarioLogueado = this.usuariosServicio.getUsuarioLogueado();
    console.log(this.imagenes);
  }

  cerrarSesion() {
    this.usuariosServicio.setUsuarioLogueado(null);
    this.router.navigate(['/login']);
    console.log(this.usuarioLogueado);
  }

}
