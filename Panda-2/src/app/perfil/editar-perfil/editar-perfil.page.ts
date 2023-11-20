import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  constructor() { }

  nuevoNombreUsuario!: any;
  nuevaBiografia!: any;

  ngOnInit() {
  }

}
