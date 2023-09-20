import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagenesServicioService } from '../imagenes-servicio.service';
import { Imagen } from '../imagen.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-imagen-detalle',
  templateUrl: './imagen-detalle.page.html',
  styleUrls: ['./imagen-detalle.page.scss'],
})
export class ImagenDetallePage implements OnInit {

  imagen: Imagen | null = null;

  constructor(private activatedRoute: ActivatedRoute, private bdService: BdserviceService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const imagenId = paramMap.get('imagenId');
      this.cargarImagen(Number(imagenId));
    });
  }

  cargarImagen(id: number) {
    this.bdService.getImagen(id).then((imagen) => {
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
            this.bdService.deleteImagen(Number(this.imagen?.id));
            this.router.navigate(['/tabs/imagenes']);
          }
        }]
    });
    await alert.present();
  }

}
