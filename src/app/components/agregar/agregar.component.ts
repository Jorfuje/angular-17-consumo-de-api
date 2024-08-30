import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/users';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css',
})
export class AgregarComponent {
  // user: User = { id: 0, nombre: '', apellido: '', edad: 0, email: '' };
  alertMessage: string = '';
  alertType: string = 'success';

  formularioUser: FormGroup;

  constructor(
    private api: ApiService,
    private router: Router,
    private form: FormBuilder
  ) {
    this.formularioUser = this.form.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(7)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  hasErrors(controlName: string, errorType: string){
    return this.formularioUser.get(controlName)?.hasError(errorType) && this.formularioUser.get(controlName)?.touched;
  }

  onSubmit() {
    const user: User = {
      id: 0,
      nombre: this.formularioUser.value.nombre,
      apellido: this.formularioUser.value.apellido,
      edad: this.formularioUser.value.edad,
      email: this.formularioUser.value.email,
    };
    this.api.newUser(user).subscribe(
      (data) => {
        if (data.message === 'Success') {
          this.alertMessage = 'Usuario agregado con éxito';
          setTimeout(() => {
            this.router.navigate(['/usuarios']);
          }, 3000);
        } else {
          this.alertMessage = 'Ocurrió un error al agregar el usuario';
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

  // onSubmit() {
  //   this.api.newUser(this.user).subscribe(
  //     (data) => {
  //       if (data.message === 'Success') {
  //         this.alertMessage = 'Usuario agregado con éxito';
  //         setTimeout(() => {
  //           this.router.navigate(['/usuarios']);
  //         }, 3000);
  //       } else {
  //         this.alertMessage = 'Ocurrió un error al agregar el usuario';
  //         this.alertType = 'danger';
  //       }
  //     },
  //     (error) => {
  //       this.alertMessage =
  //         'Ocurrió un error en la solicitud: ' + error.message;
  //       this.alertType = 'danger';
  //     }
  //   );
  // }
}
