import { Injectable } from '@angular/core';
import { Imagen } from "./imagen.model";

@Injectable({
  providedIn: 'root'
})
export class ImagenesServicioService {

  public imagenes: Imagen[] = [

    {
      id: '1',
      autor: 'Diego',
      titulo: 'Paisaje',
      imagenURL: 'https://i0.wp.com/laderasur.com/wp-content/uploads/2017/01/Captura-de-pantalla-2017-01-06-a-las-1.59.49-p.m..png?fit=786%2C515&ssl=1'

    },
    {
      id: '2',
      autor: 'Mati',
      titulo: 'Mar',
      imagenURL: 'https://www.lavanguardia.com/files/og_thumbnail/uploads/2022/01/07/61d858ff05480.jpeg'

    },
    {
      id: '3',
      autor: 'Mati',
      titulo: 'Planeta',
      imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png'

    },
    {
      id: '4',
      autor: 'Danilo',
      titulo: 'Bosque',
      imagenURL: 'https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/16:9/w_4288,h_2412,c_limit/BlackForest-Germany-GettyImages-147180370.jpg'

    },
    {
      id: '5',
      autor: 'Diego',
      titulo: 'El bicho',
      imagenURL: 'https://cdn1.unitedinfocus.com/uploads/14/2022/04/GettyImages-1240307962-1024x683.jpg'
    },
    {
      id: '6',
      autor: 'Denilxon',
      titulo: 'Tanuki',
      imagenURL: 'https://blog-vetterapp.s3.amazonaws.com/tanuki_0_a5f9967776.jpg'

    },
    {
      id: '7',
      autor: 'Denilxon',
      titulo: 'Chilena CR7',
      imagenURL: 'https://c.files.bbci.co.uk/15EB3/production/_100697798_hi045932006b.jpg'

    },


  ];

  constructor() { }

  getImagenes() {
    return [...this.imagenes]
  };

  getImagen(placeId: string) {
    return {
      ...this.imagenes.find(imagen => {
        return imagen.id === placeId
      })
    };
  }

  addImagen(titulo: string, autor: string, imagenURL: string) {
    this.imagenes.push({
      id: this.imagenes.length + 1 + "",
      titulo,
      autor,
      imagenURL
    });
  }

  deleteImagen(imagenId: string) {
    this.imagenes = this.imagenes.filter(imagen => {
      return imagen.id !== imagenId
    });
  }
}
