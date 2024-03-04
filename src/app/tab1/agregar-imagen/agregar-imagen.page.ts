import { Component, OnInit } from '@angular/core';
import { ImagenesServicioService } from '../imagenes-servicio.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { ImagenService } from 'src/app/services/imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Storage } from '@ionic/storage-angular';
import { CategoriaService } from 'src/app/services/categoria.service';
@Component({
  selector: 'app-agregar-imagen',
  templateUrl: './agregar-imagen.page.html',
  styleUrls: ['./agregar-imagen.page.scss'],
})
export class AgregarImagenPage implements OnInit {
  usuarioLogueado: any | null | undefined;

  tituloError = false;
  linkError = false;

  titulo!: string;
  descripcion!: string;
  imagen!: string;
  idUsuario!: number;
  toastImagen = false;
  idCategoria: any;
  categorias: any;

  images: any[] = [];

  constructor(private categoriaServicio: CategoriaService, private toastController: ToastController, private router: Router, private usuariosServicio: UsuariosService, private imagenServicio: ImagenService, private platform: Platform, private loadingCtrl: LoadingController, private storage: Storage ) {
    this.storage.create();
   }

ngOnInit() {
  this.cargarCategorias();

}

ionViewWillEnter() {
  this.usuariosServicio.getCurrentUser().then((currentUser) => {
    if (currentUser) {
      this.usuarioLogueado = currentUser.nombre;
      this.idUsuario = currentUser.idUsuario;
      console.log(`Id usuario actual: ${this.idUsuario} Nombre usuario actual ${this.usuarioLogueado}`);
      
    }
  });
  this.cargarCategorias();
}


async subirImagen() {
  if (this.imagen && this.titulo) {
    try {
      await this.imagenServicio.addImagen(this.titulo, this.imagen, this.descripcion, this.idUsuario, this.idCategoria);
      this.toastImagen = true;
      this.router.navigate(['/tabs/imagenes']);
      const toast = await this.toastController.create({
        message: 'Imagen subida exitosamente',
        duration: 5000
      });
      toast.present();
      
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  } else {
    console.log('Error al subir la imagen');
    
  }
}

async tomarFoto() {
  const photo = await Camera.getPhoto({
    resultType: CameraResultType.DataUrl, 
    quality: 60,
    source: CameraSource.Prompt,
    promptLabelPicture: 'Tomar foto',
    promptLabelPhoto: 'Elegir de la galeria',
    promptLabelHeader: 'Imagen'
  });

  if (photo && photo.dataUrl) {
    this.imagen = photo.dataUrl; 
  }
}

async cargarCategorias() {
  try {
    const categorias = await this.categoriaServicio.getCategorias();

    this.categorias = categorias.filter(categoria => categoria.id !== 9);
  } catch (error) {
    console.error('Error al cargar las categorías:', error);
  }
}



}
