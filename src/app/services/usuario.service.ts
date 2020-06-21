import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuarioModel';
import { Observable } from 'rxjs';


@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuario( usuario: Usuario): Observable<Usuario>
  {
    return this.http.post<Usuario>('usuario/add', usuario);
  }
}
