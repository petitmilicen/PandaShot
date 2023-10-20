import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'imagenes',
        children: [
          {
            path: "",
            loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          },
          {
            path: ":imagenId",
            loadChildren: () => import('../tab1/imagen-detalle/imagen-detalle.module').then(m => m.ImagenDetallePageModule)
          },
          {
            path: "editar-imagen/:imagenId",
            loadChildren: () => import('../tab1/editar-imagen/editar-imagen.module').then(m => m.EditarImagenPageModule)
          }
        ]
      },

      {
        path: 'buscar',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'notificaciones',
        loadChildren: () => import('../tab5/tab5.module').then(m => m.Tab5PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/imagenes',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/imagenes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
  
})
export class TabsPageRoutingModule {}
