import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ErrorStateMatcher, DateAdapter } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/Data/Entity/IUsuarioEntity';
import { UsuarioRepositoryService } from 'src/app/Data/Repository/usuario-repository.service';
import { Unsubscribable } from 'rxjs';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';
import { UsuarioUpdateEntity } from 'src/app/Data/Entity/IUsuarioUpdateEntity';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'participativo-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.css']
})
export class PerfilEditComponent implements OnInit, OnDestroy {
  form: FormGroup; 
  unsubscribe: Unsubscribable[] = [];
  constructor(private formBuilder: FormBuilder,
              private adapter: DateAdapter<any>,
              public dialog: MatDialog,
              private snackBar: SnackbarService,
              private userRepository: UsuarioRepositoryService,
             @Inject(MAT_DIALOG_DATA) public data: Usuario) { 
               this.adapter.setLocale(moment.locale());
             }


  ngOnInit() {
    this.createForm();
  }
  /* Funcao popula o formulario */
  createForm() {
    this.form = this.formBuilder.group({
       dataNascimento: new FormControl(new Date(this.data.dataNascimento), [Validators.required, this.ageValidator]),
       email: new FormControl(this.data.email, [Validators.required, Validators.email]),
       nome: new FormControl(this.data.nome, Validators.required),
       sobrenome: new FormControl(this.data.sobrenome, Validators.required),
       telefone: new FormControl(this.data.telefone, Validators.required),
     })
   }
     /*
  Recupera os valores do formulario e preenche um objeto do tipo Usuario
  */
  valuesForm() {
    let usuario: UsuarioUpdateEntity = {
      nome: this.form.get('nome').value,
      sobrenome: this.form.get('sobrenome').value,
      dataNascimento: new Date(this.form.get('dataNascimento').value).toLocaleDateString(),
      email: this.form.get('email').value,
      telefone: this.form.get('telefone').value,
    }
    return usuario;
  }
   /* Funcao envia as informacoes atualizadas para o backend */
   updateUser() {
     let usuario = this.valuesForm();
     this.unsubscribe.push(    
       this.userRepository.update(usuario, this.data.uuid).subscribe(() => {
         this.snackBar.open({ message: 'Atualizado com sucesso!', duration: 5, customClass: 'success' })
         this.dialog.closeAll()
        } , err => {
        this.snackBar.open({ message: err.error.message, duration: 5, customClass: 'error' })
       })
     );
   }
   /* Funcao fecha a modal */
   closeEdit() {
    this.dialog.closeAll();
   }

   /* Funcao valida a idade | se for abaixo de 13 gera um erro */
   ageValidator(control: AbstractControl) {
    const date = control.value;
    let age = Math.floor(moment(new Date()).diff(moment(date),'years',true));
    const valid = age > 13 ? null : { ageValid: true }; 
    return valid;
  }

  ngOnDestroy(): void {
    this.unsubscribe.map(result => result.unsubscribe());
  }
}
