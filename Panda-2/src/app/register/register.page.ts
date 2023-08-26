import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  user = { username: '', email: '', contrasena: '' };
  confirmContrasena = '';
  public users: any[] = [{
    
  }];

  registerUser() {
    if (this.user.contrasena !== this.confirmContrasena) {
      console.log("Las contraseñas no coinciden");
      return;
    }

    if (!this.validateEmail(this.user.email)) {
      console.log("Correo electrónico inválido");
      return;
    }

    this.users.push({
      username: this.user.username,
      email: this.user.email,
      password: this.user.contrasena,
      
    });
    console.log(this.users);
    this.clearForm();

    this.router.navigate(['/login']);
    
  }

  clearForm() {
    this.user.username = '';
    this.user.email = '';
    this.user.contrasena = '';
    this.confirmContrasena = '';
  }

  validateEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

}
