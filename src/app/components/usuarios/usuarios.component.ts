import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/users';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  users: User[] = [];

  private readonly api = inject(ApiService);

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.api.getUsers().subscribe((data) => {
      this.users = data.users;
    });
  }

  eliminar(id: number | string){   
    this.api.deleteUser(id).subscribe(data => {
      const mensaje = data.message; 
      console.log(mensaje);
      this.cargarUsuarios();
    })
  }
}
