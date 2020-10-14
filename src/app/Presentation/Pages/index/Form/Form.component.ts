import { Component, OnInit } from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, ErrorStateMatcher} from '@angular/material/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { Usuario } from 'src/app/Data/Entity/IUsuarioEntity';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';
import * as moment from 'moment';
import * as libCpf from 'gerador-validador-cpf';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';
import { SaveFormService } from '../../../Shared/save-form.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'participativo-Form',
  templateUrl: './Form.component.html',
  styleUrls: ['./Form.component.css'],
  providers: [// The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},]
})
export class FormComponent implements OnInit {
  hide = true;
  hide2 = true;
  form: FormGroup; 
  spinner: boolean = false;
  constructor(private formBuilder: FormBuilder,
              private snackBar: SnackbarService,
              private saveForm: SaveFormService,
              private usuarioUserCase: UsuarioUseCase) {
              }

  ngOnInit() {
    this.createForm()
    this.get();
  }
  /*
  Verfica recupera os valores do formulario e verifaca a validade do formulario e entao envia pra funcao
  create dos casos de usos
  */
  register() {
    let usuario = this.valuesForm();
    if(this.validateForm()) {
      this.spinner = true;
      if(this.usuarioUserCase.create(usuario)) {
        this.spinner = false;
      }
    }
  }
  save() {
    this.saveForm.delete();
    this.saveForm.save(this.valuesForm())
  }
  get() {
    this.saveForm.get().subscribe(result => {
      if(result != null) {
        this.form.get('cpf').setValue(result.cpf);
        this.form.get('nome').setValue(result.nome);
        this.form.get('sobrenome').setValue(result.sobrenome);
        this.form.get('dataNascimento').setValue(result.dataNascimento != null ? moment(result.dataNascimento, 'DD-MM-YYYY').toDate() : '');
        this.form.get('email').setValue(result.email);
        this.form.get('senha').setValue(result.senha);
        this.form.get('telefone').setValue(result.telefone);
      }
      });
  }
  delete() {
    this.saveForm.delete();
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
      cpf: new FormControl('', [Validators.required, this.cpfValidator]),
      dataNascimento: new FormControl('', [Validators.required, this.ageValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', Validators.required),
      sobrenome: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      senha: new FormControl('', [Validators.required, Validators.min(4)]),
      novaSenha2: new FormControl('', [ Validators.required ]),
    }, { validators: this.compare })
  }
  /*
  Valida o formulario
  */
  validateForm(): boolean {
    if(this.form.valid) {
      return true
    }else {
      this.snackBar.open({ message: 'Preencha corretamenta os campos do formulario', duration: 5 , customClass: 'error' });
      return false
    }
  }

  ageValidator(control: AbstractControl) {
    const date = control.value;
    let age = Math.floor(moment(new Date()).diff(moment(date),'years',true));
    const valid = age > 13 ? null : { ageValid: true }; 
    return valid;
  }
  cpfValidator(control: AbstractControl) {
    const cpf = control.value;
    let valid = libCpf.validate(cpf) ? null : { cpfValid: true };
    return valid;
  }
      /* Funcao e um validador se os dois inputs contem o mesmo valor */
      compare(control: AbstractControl) {
        if(!(control.get('novaSenha2').value === control.get('senha').value)) {
          control.get('novaSenha2').setErrors({ compare: true })
        }else{
          return null;
        }
      }

}
