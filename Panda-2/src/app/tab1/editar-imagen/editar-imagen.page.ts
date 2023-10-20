import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ImagenService } from 'src/app/services/imagen.service';
import { Imagen } from '../imagen.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-editar-imagen',
  templateUrl: './editar-imagen.page.html',
  styleUrls: ['./editar-imagen.page.scss'],
})
export class EditarImagenPage implements OnInit {

  imagen: any;
  img = {id: '',titulo: '', imagen: '', descripcion: ''};
  imagenEditadaToast = false;
  constructor(private activatedRoute: ActivatedRoute, private imagenServicio: ImagenService, private router: Router, private alertController: AlertController) { }
  

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const imagenId = paramMap.get('imagenId');
      this.cargarImagen(Number(imagenId));
  
    });
  }

  ionViewWillEnter(){
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const imagenId = paramMap.get('imagenId');
      this.cargarImagen(Number(imagenId));
      console.log('Cargando denuevo...');
      
    });
  }

  cargarImagen(id: number) {
    this.imagenServicio.getImagen(id).then((imagen: any) => {
      this.imagen = imagen;
      if (this.imagen) {
        this.img.id = this.imagen.id;
        this.img.titulo = this.imagen.titulo;
        this.img.descripcion = this.imagen.descripcion;
        this.img.imagen = this.imagen.imagen;   
      } 
    });
  }

  async editarImagen(){
    try {
      
      await this.imagenServicio.editImagen(this.img.titulo, this.img.imagen, this.img.descripcion, Number(this.img.id));
      
      this.imagenEditadaToast = true;
   
      this.router.navigate([`/tabs/imagenes/${this.imagen?.id}`]);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
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
      this.img.imagen = photo.dataUrl; 
    }
  }

}
