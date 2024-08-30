import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DetalleUsuarioComponent } from './components/detalle-usuario/detalle-usuario.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AgregarComponent } from './components/agregar/agregar.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuario/:id', component: DetalleUsuarioComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
