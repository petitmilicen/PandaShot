import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagenesServicioService } from '../imagenes-servicio.service';
import { Imagen } from '../imagen.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-imagen-detalle',
  templateUrl: './imagen-detalle.page.html',
  styleUrls: ['./imagen-detalle.page.scss'],
})
export class ImagenDetallePage implements OnInit {

  imagen: Imagen | null = null;

  constructor(private activatedRoute: ActivatedRoute, private imagenesServicio: ImagenesServicioService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const imagenId = paramMap.get('imagenId');
  
      if (imagenId) {
        const imagen = this.imagenesServicio.getImagen(imagenId);
        
        if (imagen) {
          this.imagen = {
            id: imagen.id || '',
            titulo: imagen.titulo || '',
            autor: imagen.autor || '',
            imagenURL: imagen.imagenURL || ''
          };
          console.log(this.imagen);
        } else {
          console.log('Imagen no encontrada');
        }
      } else {
        console.log('Id es nula');
      }
    });
  }

  async deleteImagen(){
    
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: '¿Seguro que quieres borrar la imagen?',
      buttons: [
        {
          text:"Cancelar",
          role:"cancel",
         },
         {
          text:"Borrar",
          handler: () => {
            this.imagenesServicio.deleteImagen(this.imagen?.id + "");    
            this.router.navigate(['/tabs/imagenes']);
          }
        }]
      
    });

    await alert.present();
  }

}
