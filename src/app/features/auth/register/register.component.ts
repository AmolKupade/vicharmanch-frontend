import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
isLogin = true; // Toggle handle karayla

  toggleAuth() {
    this.isLogin = !this.isLogin;
  }
}
