import { Component, OnInit } from '@angular/core';
import { Usuario } from '../register/usuario.model';
import { UsuariosService } from '../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuarioLogueado: Usuario | null | undefined;
  usuario: any;

  nombreUsuario: any;
  currentUser: any;
  idUsuario!: any;
  isAdmin!: any;
  
  usuarioIdPerfil!: any;

  constructor(private usuarioService: UsuariosService, private router: Router, private activatedRoute: ActivatedRoute, private storage: Storage) { }

  async ngOnInit() {
    this.storage.create();
    await this.cargarDatos();
    await this.cargarUsuarioData();
    console.log('id del perfil:', this.usuarioIdPerfil, 'id del usuario actual: ', this.idUsuario);
  }

  async cargarUsuario(id: number) {
    this.usuarioService.getUsuario(id).then((usuario) => {
      this.usuario = usuario;
      console.log(this.usuario);
    });
  }

  async cargarDatos(){
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.usuarioIdPerfil = paramMap.get('usuarioId');
      this.cargarUsuario(Number(this.usuarioIdPerfil));
    });
  }

  async cargarUsuarioData() {
    try {
      const currentUser = await this.usuarioService.getCurrentUser();
  
      if (currentUser) {
        this.nombreUsuario = currentUser.nombre;
        this.idUsuario = currentUser.idUsuario;
        this.isAdmin = currentUser.isAdmin;
        console.log(`Nombre usuario actual en storage: ${this.nombreUsuario} id: ${this.idUsuario} is_admin: ${this.isAdmin}`);
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  }
  

}
