import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/users';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-usuario',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './detalle-usuario.component.html',
  styleUrl: './detalle-usuario.component.css',
})
export class DetalleUsuarioComponent implements OnInit {
  @Input('id') usuarioId!: number;
  user!: User;
  message: string = '';
  alertMessage: string = '';
  alertType: string = 'success';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getUser(this.usuarioId).subscribe((data) => {
      const mensaje = data.message;
      const usuario = data.user;
      this.user = usuario;
      this.message = mensaje;

      console.log(mensaje);
      console.log(usuario);
    });
  }

  onSubmit() {
    this.api.updateUser(this.usuarioId, this.user).subscribe(
      (data) => {
        if (data.message === 'Success') {
          this.alertMessage = 'Usuario actualizado con éxito';
          setTimeout(() => {
            this.router.navigate(['/usuarios']);
          }, 3000);
        } else {
          this.alertMessage = 'Ocurrió un error al actualizar el usuario';
          this.alertType = 'danger';
        }
      },
      (error) => {
        this.alertMessage =
          'Ocurrió un error en la solicitud: ' + error.message;
        this.alertType = 'danger';
      }
    );
  }
}
