import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarFotoPage } from './editar-foto.page';

const routes: Routes = [
  {
    path: '',
    component: EditarFotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarFotoPageRoutingModule {}
