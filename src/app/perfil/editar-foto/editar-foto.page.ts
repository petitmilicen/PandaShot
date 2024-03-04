import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-foto',
  templateUrl: './editar-foto.page.html',
  styleUrls: ['./editar-foto.page.scss'],
})
export class EditarFotoPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private storage: Storage, private usuarioService: UsuariosService, private router: Router,  private toastController: ToastController) {
    this.storage.create();
  }

  usuario: any = {};
  imagenEditadaToast = false;
  
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const usuarioId = paramMap.get('usuarioId');
      this.cargarUsuario(Number(usuarioId));
    });
  }

  async cargarUsuario(id: number) {
    this.usuarioService.getUsuario(id).then((usuario) => {
      this.usuario = usuario;
      console.log('datos del usuario a editar',this.usuario);
    });
  }

  async editarFoto() {
    try {
      console.log('Antes de la edición:', this.usuario.foto_perfil);
      await this.usuarioService.editUsuarioImagen(this.usuario.id, this.usuario.foto_perfil);
      console.log('Después de la edición:', this.usuario.foto_perfil);
      this.imagenEditadaToast = true;
  
      this.mostrarToastExito('Foto de perfil actualizada con éxito');
      this.router.navigate([`/perfil/${this.usuario.id}`]);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      this.mostrarToastError('Hubo un error al actualizar la foto de perfil. Por favor, inténtalo de nuevo.');
    }
  }
  
  async mostrarToastExito(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
  
    await toast.present();
  }
  
  async mostrarToastError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'danger', 
    });
  
    await toast.present();
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
      this.usuario.foto_perfil = photo.dataUrl; 
      console.log(photo.dataUrl);
      
    }
  }

}
