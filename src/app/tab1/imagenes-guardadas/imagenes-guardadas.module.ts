import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagenesGuardadasPageRoutingModule } from './imagenes-guardadas-routing.module';

import { ImagenesGuardadasPage } from './imagenes-guardadas.page';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagenesGuardadasPageRoutingModule,
    MatIconModule,
  ],
  declarations: [ImagenesGuardadasPage]
})
export class ImagenesGuardadasPageModule {}
