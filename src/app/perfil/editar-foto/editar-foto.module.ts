import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarFotoPageRoutingModule } from './editar-foto-routing.module';

import { EditarFotoPage } from './editar-foto.page';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarFotoPageRoutingModule,
    MatIconModule
  ],
  declarations: [EditarFotoPage]
})
export class EditarFotoPageModule {}
