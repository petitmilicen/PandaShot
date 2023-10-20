import { Component } from '@angular/core';
import { Usuario } from '../register/usuario.model';
import { Router, NavigationEnd  } from '@angular/router';
import { ImagenService } from '../services/imagen.service';
import { UsuariosService } from '../services/usuarios.service';
import { Storage } from '@ionic/storage-angular';
import { LikeService } from '../services/like.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  nombreUsuario: any;
  currentUser: any;
  idUsuario!: any;
  isAdmin!: any;
  imagenes: any[] = [];
  likes: any[] = [];
  imagenId: any;
  currentImageId: any;

  constructor(private likeServicio: LikeService, private router: Router, private imagenServicio: ImagenService, private usuarioService: UsuariosService, private storage: Storage) {
    this.storage.create();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        if (currentRoute === '/tabs/imagenes') {
          this.cargarUsuarioData();
        }
      }
    });
  }

  ngOnInit(){
    this.cargarUsuarioData();
    this.loadImages();

  }

  ionViewWillEnter(){
    this.cargarUsuarioData();
    this.loadImages();
  }

  async cargarUsuarioData() {
  try {
    const currentUser = await this.usuarioService.getCurrentUser();

    if (currentUser) {
      this.nombreUsuario = currentUser.nombre;
      this.idUsuario = currentUser.idUsuario;
      this.isAdmin = currentUser.isAdmin;
      console.log(`Nombre usuario actual en storage: ${this.nombreUsuario} id: ${this.idUsuario} is_admin: ${this.isAdmin}`);
    }
  } catch (error) {
    console.error('Error al cargar los datos del usuario:', error);
  }
}

  loadImages() {
    this.imagenServicio.getImagenes().then((imagenes) => {
      this.imagenes = imagenes;
      console.log('Datos de imágenes en la base de datos:');
      console.log(this.imagenes);
    });
  }

  cerrarSesion(){
    this.usuarioService.logoutUser();
    this.storage.clear();
    this.router.navigate(['/login'])
  }

  async agregarLike(idUsuario:any, imagenId: any) {
    try {
      await this.likeServicio.addLike(idUsuario, imagenId);
      console.log('Like agregado con éxito');
      this.loadImages();
    } catch (error) {
      console.error('Error al agregar el like:', error);
    }
  }
  
  async removerLike(idUsuario: any, imagenId: any) {
    try {
      await this.likeServicio.removeLike(idUsuario, imagenId);
      console.log('Like removido con éxito');
      this.loadImages();
    } catch (error) {
      console.error('Error al remover el like:', error);
    }
  }

  async toggleLike(idUsuario: any ,imagenId: any) {
    const hasLiked = await this.likeServicio.hasLiked(idUsuario, imagenId);
    if (hasLiked) {
      await this.removerLike(idUsuario,imagenId);
    } else {
      await this.agregarLike(idUsuario,imagenId);
    }
    this.loadImages();
  }


  
}




