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

    }

  ]

  constructor() { }

  getImagenes(){
    return[...this.imagenes]
  };

  getImagen(placeId: string){
    return{
      ...this.imagenes.find(imagen => {
        return imagen.id === placeId
      })
    };
  }

}
