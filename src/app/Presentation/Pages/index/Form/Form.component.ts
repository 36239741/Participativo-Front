import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { Usuario } from 'src/app/Data/Entity/IUsuarioEntity';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'participativo-Form',
  templateUrl: './Form.component.html',
  styleUrls: ['./Form.component.css']
})
export class FormComponent implements OnInit {
  hide = true;
  form: FormGroup; 
  constructor(private formBuilder: FormBuilder,
              private usuarioUserCase: UsuarioUseCase) {}

  ngOnInit() {
    this.createForm()
  }
  /*
  Verfica recupera os valores do formulario e verifaca a validade do formulario e entao envia pra funcao
  create dos casos de usos
  */
  register() {
    let usuario = this.valuesForm();
    if(this.validateForm()) {
      this.usuarioUserCase.create(usuario);
    }
  }
  /*
  Recupera os valores do formulario e preenche um objeto do tipo Usuario
  */
  valuesForm() {
    let usuario: Usuario = {
      cpf: this.form.get('cpf').value,
      nome: this.form.get('nome').value,
      sobrenome: this.form.get('sobrenome').value,
      dataNascimento: new Date(this.form.get('dataNascimento').value).toLocaleDateString(),
      email: this.form.get('email').value,
      senha: this.form.get('senha').value,
      telefone: this.form.get('telefone').value,
    }
    return usuario;
  }
/*
Instancia um reactive form
*/
  createForm() {
   this.form = this.formBuilder.group({
      cpf: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', Validators.required),
      sobrenome: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      senha: new FormControl('', [Validators.required, Validators.min(4)])
    })
  }
  /*
  Valida o formulario
  */
  validateForm(): boolean {
    return this.form.valid ? true : false;
  }

}
