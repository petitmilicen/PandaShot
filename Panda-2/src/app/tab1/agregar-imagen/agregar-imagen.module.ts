import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarImagenPageRoutingModule } from './agregar-imagen-routing.module';

import { AgregarImagenPage } from './agregar-imagen.page';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarImagenPageRoutingModule,
    MatIconModule
  ],
  declarations: [AgregarImagenPage]
})
export class AgregarImagenPageModule {}
