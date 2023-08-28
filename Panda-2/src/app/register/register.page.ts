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
    console.log(this.usuarios);
  }

  showUsernameError = false;
  showUsernameCaracteres = false;
  showEmailError = false;
  showPasswordError = false;
  showConfirmPasswordError = false;
  showEmailDuplicado = false;

  user = { username: '', email: '', contrasena: '' };
  confirmContrasena = '';

  registerUser() {

    if (this.user.contrasena !== this.confirmContrasena) {
      this.showConfirmPasswordError = true;
      console.log("Las contraseñas no coinciden");
      return;
    } else {
      this.showConfirmPasswordError = false;
    }

    if (this.usuariosServicio.getUsuarios().some(u => u.usuario === this.user.username)) {
      this.showUsernameError = true;
      console.log("El nombre de usuario ya está en uso");
      return;
    } else {
      this.showUsernameError = false;
    }

    if (this.user.username.length < 3) {
      this.showUsernameCaracteres = true;
      return;
    } else {
      this.showUsernameCaracteres = false; 
    }

    if (!this.usuariosServicio.validateEmail(this.user.email)) {
      this.showEmailError = true;
      console.log("Correo electrónico inválido");
      return;
    } else {
      this.showEmailError = false;
    }

    if (this.usuariosServicio.getUsuarios().some(u => u.email === this.user.email)) {
      this.showEmailDuplicado = true;
      console.log("El correo electrónico ya está registrado");
      return;
    } else {
      this.showEmailDuplicado = false;
    }

    if (this.user.contrasena.length < 8 || !/\d/.test(this.user.contrasena)) {
      this.showPasswordError = true;
      console.log("La contraseña debe tener al menos 8 caracteres y contener al menos un número.");
      return;
    } else {
      this.showPasswordError = false;
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

    this.showUsernameError = false;
    this.showEmailError = false;
    this.showPasswordError = false;
    this.showConfirmPasswordError = false;
  }

}
