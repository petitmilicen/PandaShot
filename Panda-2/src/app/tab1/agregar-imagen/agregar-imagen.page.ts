import { Component, OnInit } from '@angular/core';
import { ImagenesServicioService } from '../imagenes-servicio.service';
import { Router } from '@angular/router';
import { UsuariosServicioService } from 'src/app/register/usuarios-servicio.service';
import { Usuario } from 'src/app/register/usuario.model';

@Component({
  selector: 'app-agregar-imagen',
  templateUrl: './agregar-imagen.page.html',
  styleUrls: ['./agregar-imagen.page.scss'],
})
export class AgregarImagenPage implements OnInit {
  usuarioLogueado: Usuario | null | undefined;

  tituloError = false;
  linkError = false;
  imagenGuardadaToast = false;

  constructor(private imagenesServicio: ImagenesServicioService, private router: Router, private usuariosServicio: UsuariosServicioService) { }

  ngOnInit() {
    this.usuarioLogueado = this.usuariosServicio.getUsuarioLogueado();
  }

  /*img = { titulo: '', link: ''};

  guardarNuevaImagen() {
    this.tituloError = false;
    this.linkError = false;

    if (this.img.titulo.length < 3) {
      this.tituloError = true;
      return;
    }

    if (!this.isValidURL(this.img.link)) {
      this.linkError = true;
      return;
    }
    const autor = this.usuarioLogueado?.usuario + "";

    this.imagenesServicio.addImagen(this.img.titulo, autor, this.img.link);
    this.imagenGuardadaToast = true;
    this.router.navigate(['/tabs/imagenes']);  
    
    console.log('Imagen guardada correctamente');
      
  }

  isValidURL(url: string): boolean {
    const urlPattern = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/;
    return urlPattern.test(url);
  */

}
