import { Component } from '@angular/core';
import { ImagenService } from '../services/imagen.service';
import { UnplashService } from '../services/unplash.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  terminoBusqueda!: string;
  imagenesEncontradas: any[] = [];
  mostrarItem = true; 
  mostrarMensaje = false;


  constructor(private imagenesServicio: ImagenService, private unsplashService: UnplashService) {}

  featuredImage: any;

  ngOnInit() {
    this.loadRandomImage();
    setInterval(() => {
      this.loadRandomImage();
    }, 72 * 1000); 
  }
  

async loadRandomImage() {
  try {
    const response: any = await this.unsplashService.getRandomPhoto().toPromise();
    this.featuredImage = response;
    console.log(response);
    
  } catch (error) {
    console.error('Error al cargar la imagen:', error);
  }
}


  async buscarImagenes() {
    this.mostrarMensaje = false;
    this.imagenesEncontradas = [];

    if (!this.terminoBusqueda || this.terminoBusqueda.trim() === '') {
      return;
    }
  
    try {
      this.imagenesEncontradas = await this.imagenesServicio.searchImagenes(this.terminoBusqueda);
      console.log('Imágenes encontradas:', this.imagenesEncontradas);

      if (this.imagenesEncontradas.length === 0) {
        this.mostrarMensaje = true;
      }

    } catch (error) {
      console.error('Error al buscar imágenes:', error);
    }
  }


}
