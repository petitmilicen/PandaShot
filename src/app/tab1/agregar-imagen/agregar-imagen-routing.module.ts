import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarImagenPage } from './agregar-imagen.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarImagenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarImagenPageRoutingModule {}
