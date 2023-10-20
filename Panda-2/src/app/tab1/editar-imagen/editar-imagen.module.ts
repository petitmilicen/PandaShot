import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarImagenPageRoutingModule } from './editar-imagen-routing.module';

import { EditarImagenPage } from './editar-imagen.page';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarImagenPageRoutingModule,
    MatIconModule
  ],
  declarations: [EditarImagenPage]
})
export class EditarImagenPageModule {}
