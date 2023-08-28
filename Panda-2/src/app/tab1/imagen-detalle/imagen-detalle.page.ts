import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagenesServicioService } from '../imagenes-servicio.service';
import { Imagen } from '../imagen.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imagen-detalle',
  templateUrl: './imagen-detalle.page.html',
  styleUrls: ['./imagen-detalle.page.scss'],
})
export class ImagenDetallePage implements OnInit {

  imagen: Imagen | null = null;

  constructor(private activatedRoute: ActivatedRoute, private imagenesServicio: ImagenesServicioService, private router: Router) { }

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

  deleteImagen(){
    this.imagenesServicio.deleteImagen(this.imagen?.id + "");    
    this.router.navigate(['/tabs/imagenes']);
  }

}
