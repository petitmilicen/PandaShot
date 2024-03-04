import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagenesGuardadasPage } from './imagenes-guardadas.page';

const routes: Routes = [
  {
    path: '',
    component: ImagenesGuardadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagenesGuardadasPageRoutingModule {}
