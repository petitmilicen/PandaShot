import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';

import { IonicModule } from '@ionic/angular';

import { ImagenDetallePageRoutingModule } from './imagen-detalle-routing.module';

import { ImagenDetallePage } from './imagen-detalle.page';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagenDetallePageRoutingModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,  
    
  ],
  declarations: [ImagenDetallePage]
})
export class ImagenDetallePageModule {}
