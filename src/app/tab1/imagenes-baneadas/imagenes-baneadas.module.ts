import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagenesBaneadasPageRoutingModule } from './imagenes-baneadas-routing.module';

import { ImagenesBaneadasPage } from './imagenes-baneadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagenesBaneadasPageRoutingModule
  ],
  declarations: [ImagenesBaneadasPage]
})
export class ImagenesBaneadasPageModule {}
