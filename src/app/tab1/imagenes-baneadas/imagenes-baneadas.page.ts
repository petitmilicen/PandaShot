import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-imagenes-baneadas',
  templateUrl: './imagenes-baneadas.page.html',
  styleUrls: ['./imagenes-baneadas.page.scss'],
})
export class ImagenesBaneadasPage implements OnInit {

  imagenesBaneadas: any;

  constructor(private imagenServicio: ImagenService, private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
    this.obtenerImagenesBaneadas();
  }

  ionViewWillEnter(){
    this.obtenerImagenesBaneadas();
  }

  async obtenerImagenesBaneadas() {
    try {
      this.imagenesBaneadas = await this.imagenServicio.getImagenesBaneadas();
      console.log('Imágenes Baneadas:', this.imagenesBaneadas);
    } catch (error) {
      console.error('Error al obtener imágenes baneadas:', error);
    }
  } 

  async habilitarImagen(idImagen: number) {
    const confirmAlert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Seguro que quieres habilitar esta imagen?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: async () => {
            try {
              await this.imagenServicio.habilitarImagen(idImagen);
              console.log(`Imagen con ID ${idImagen} habilitada con éxito.`);
              this.obtenerImagenesBaneadas();
              this.mostrarToast('Imagen habilitada con éxito');
            } catch (error) {
              console.error('Error al habilitar la imagen:', error);
            }
          }
        }
      ]
    });
  
    await confirmAlert.present();
  }
  
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
  
    await toast.present();
  }

}
