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

  constructor(private imagenesServicio: ImagenesServicioService, private router: Router, private usuariosServicio: UsuariosServicioService) { }

  ngOnInit() {
    this.usuarioLogueado = this.usuariosServicio.getUsuarioLogueado();
    
  }

  img = { titulo: '', link: ''};

  guardarNuevaImagen() {
    console.log(this.img, this.img.link);
    
    const autor = this.usuarioLogueado?.usuario;

    this.imagenesServicio.addImagen(this.img.titulo, autor, this.img.link);
    console.log('Imagen guardada correctamente');
      this.router.navigate(['/tabs/imagenes']);

  }

}
