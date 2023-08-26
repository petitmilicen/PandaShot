import { Component, OnInit } from '@angular/core';
import { Usuario } from '../register/usuario.model';
import { UsuariosServicioService } from '../register/usuarios-servicio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuarioLogueado: Usuario | null | undefined;

  constructor(private usuariosServicio: UsuariosServicioService) { }

  ngOnInit() {
    this.usuarioLogueado = this.usuariosServicio.getUsuarioLogueado();
  }

}
