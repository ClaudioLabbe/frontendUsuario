import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuarioModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css'],
  providers: [UsuarioService]
})
export class AgregarUsuarioComponent implements OnInit {
  formGroup: FormGroup;
  usuario: Usuario = new Usuario();
  usuarioRest: Usuario = new Usuario();

  respuesta: boolean;
  esCumpleanios: boolean;

  constructor( protected usuarioService: UsuarioService, public builder: FormBuilder, public spinnerService: NgxSpinnerService) {
    this.formGroup = this.builder.group({
      nombre: ['', Validators.pattern('[a-zA-Z]*')],
      apellido: ['', Validators.pattern('[a-zA-Z]*')],
      fechaDeNacimiento: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.respuesta = false;
    this.esCumpleanios = false;
  }

  guardar(){
    this.respuesta = false;
    this.esCumpleanios = false;

    this.usuarioRest.poema = null;

    this.spinnerService.show();

    this.usuarioService.getUsuario(this.usuario).subscribe(
      (data: any) => {
        this.usuarioRest = data;

        if (this.usuarioRest.poema != null){
          this.esCumpleanios = true;
        }

        this.respuesta = true;
        this.spinnerService.hide();
      }
    );
  }
}
