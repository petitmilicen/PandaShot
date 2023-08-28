import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosServicioService } from '../register/usuarios-servicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router,  private usuariosServicio: UsuariosServicioService) { }

  user = { username: '', email: '', contrasena: '' };
  loginError = false;

  ngOnInit() {
    console.log(this.usuariosServicio.getUsuarios())   
  }

  loginUser() {
    console.log("Email ingresado:", this.user.email);
    console.log("Contraseña ingresada:", this.user.contrasena);
  
    const usuarios = this.usuariosServicio.getUsuarios();
    console.log("Usuarios registrados:", usuarios);
  
    const user = usuarios.find(
      u => u.email === this.user.email && u.contrasena === this.user.contrasena
    );
  
    if (user) {
      this.usuariosServicio.setUsuarioLogueado(user);
      console.log("Inicio de sesión exitoso");
      this.router.navigate(['/tabs/imagenes']);
    } else {
      console.log("Usuario no existe o las credenciales son incorrectas");
      this.loginError = true;
    }
  }

}

