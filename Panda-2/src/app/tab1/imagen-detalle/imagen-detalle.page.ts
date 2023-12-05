import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Imagen } from '../imagen.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ImagenService } from 'src/app/services/imagen.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ComentariosService } from 'src/app/services/comentarios.service';

import { Storage } from '@ionic/storage-angular';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-imagen-detalle',
  templateUrl: './imagen-detalle.page.html',
  styleUrls: ['./imagen-detalle.page.scss'],
})
export class ImagenDetallePage implements OnInit {

  imagen: any;
  usuarioLogueado: any;
  idUsuario: any;
  isAdmin: any;
  comentarios: any[] = [];
  likes: any;

  texto: any;

  constructor(private likeServicio: LikeService,private storage: Storage, private comentariosServicio: ComentariosService, private activatedRoute: ActivatedRoute, private usuariosServicio: UsuariosService, private imagenServicio: ImagenService , private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.storage.create();
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const imagenId = paramMap.get('imagenId');
      this.cargarImagen(Number(imagenId));

      this.cargarComentariosPorImagen(Number(imagenId));
      this.cargarLikesPorImagen(Number(imagenId))
    });

    this.usuariosServicio.getCurrentUser().then((currentUser) => {
      if (currentUser) {
        this.usuarioLogueado = currentUser.nombre;
        this.idUsuario = currentUser.idUsuario;
        this.isAdmin = currentUser.isAdmin;
        console.log(`Id usuario actual: ${this.idUsuario} Nombre usuario actual ${this.usuarioLogueado}`);
        
      }
    });
  }

  async cargarImagen(id: number) {
    this.imagenServicio.getImagen(id).then((imagen) => {
      this.imagen = imagen;
      console.log(this.imagen);
    });
  }

  async deleteImagen() {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: '¿Seguro que quieres borrar la imagen?',
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Borrar",
          handler: () => {
            this.imagenServicio.deleteImagen(Number(this.imagen?.id));
            this.router.navigate(['/tabs/imagenes']);
          }
        }]
    });
    await alert.present();
  }

  async mostrarDescripcion(){
    const alert = await this.alertController.create({
      header: 'Descripción',
      message: this.imagen.descripcion,
      buttons: [
        {
          text: "Aceptar",
          role: "cancel",
        },
      ]
    });
    await alert.present();
  }

  async opcionesAdmin() {
    const alert = await this.alertController.create({
      header: 'Opciones de Administrador',
      message: '¿Seguro que quieres deshabilitar la imagen?',
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log('Operación cancelada');
          }
        },
        {
          text: "Aceptar",
          role: "destructive",
          cssClass: "danger",
          handler: () => {
            this.imagenServicio.banearImagen(this.imagen.id);
            this.router.navigate(['/tabs/imagenes']);
          }
        }
      ]
    });
  
    await alert.present();
  }
  

  async cargarComentariosPorImagen(imagenId: number) {
    this.comentariosServicio.getComentariosPorImagen(imagenId).then((comentarios) => {
      this.comentarios = comentarios;
      console.log('Comentarios:', this.comentarios);
    });
  }

  async agregarComentario() {
    if (!this.texto || this.texto.trim() === '') {
      console.error('El comentario está vacío o solo contiene espacios en blanco');
      return;
    }
  
    this.comentariosServicio.agregarComentario(this.texto, this.idUsuario, this.imagen.id).then(() => {
      this.cargarComentariosPorImagen(Number(this.imagen.id));
      this.texto = "";
    }).catch((error) => {
      console.error('Error al agregar el comentario:', error);
    });
  }

  async cargarLikesPorImagen(imagenId: any) {
    this.likeServicio.getLikes(imagenId).then((likes) => {
      this.likes = likes;
      console.log('Likes:', this.likes);
    });
  }

  async agregarLike() {
    try {
      await this.likeServicio.addLike(this.idUsuario, this.imagen.id);
      console.log('Like agregado con éxito');
      this.cargarLikesPorImagen(this.imagen.id);
    } catch (error) {
      console.error('Error al agregar el like:', error);
    }
  }
  
  async removerLike() {
    try {
      await this.likeServicio.removeLike(this.idUsuario, this.imagen.id);
      console.log('Like removido con éxito');
      this.cargarLikesPorImagen(this.imagen.id);
    } catch (error) {
      console.error('Error al remover el like:', error);
    }
  }

  async toggleLike() {
    const hasLiked = await this.likeServicio.hasLiked(this.idUsuario, this.imagen.id);
    if (hasLiked) {
      await this.removerLike();
    } else {
      await this.agregarLike();
    }
    this.cargarLikesPorImagen(this.imagen.id);
  }

  async descargarImagen() {

  }
}