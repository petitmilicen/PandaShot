import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosServicioService } from './usuarios-servicio.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private usuariosServicio: UsuariosServicioService) { }

  public usuarios: any[] = [{
  }];

  ngOnInit() {
    this.usuarios = this.usuariosServicio.getUsuarios();
  }

  user = { username: '', email: '', contrasena: '' };
  confirmContrasena = '';

  registerUser() {
    if (this.user.contrasena !== this.confirmContrasena) {
      console.log("Las contraseñas no coinciden");
      return;
    }

    if (!this.usuariosServicio.validateEmail(this.user.email)) {
      console.log("Correo electrónico inválido");
      return;
    }

    this.usuariosServicio.addUsuario({
      usuario: this.user.username,
      email: this.user.email,
      contrasena: this.user.contrasena, 
    });
    
    console.log(this.usuariosServicio.getUsuarios());
    this.clearForm();
    this.router.navigate(['/login']);
    
  }

  clearForm() {
    this.user.username = '';
    this.user.email = '';
    this.user.contrasena = '';
    this.confirmContrasena = '';
  }

}
