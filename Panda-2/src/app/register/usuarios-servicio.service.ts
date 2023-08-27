import { Injectable } from '@angular/core';
import { Usuario } from "./usuario.model";

@Injectable({
  providedIn: 'root'
})
export class UsuariosServicioService {

  constructor() { }

  public usuarios: Usuario[] = [
    {
      usuario: 'Diego',
      email: 'die.venegas@duocuc.cl',
      contrasena: 'asd123',

    },
  ];
  private usuarioLogueado: Usuario | null = null; 


  addUsuario(user: any) {
    this.usuarios.push(user);
  }

  getUsuarios() {
    return this.usuarios;
  }

  validateEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  getUsuarioLogueado(): Usuario | null {
    return this.usuarioLogueado;
  }

  setUsuarioLogueado(usuario: Usuario) {
    this.usuarioLogueado = usuario;
  }
}
