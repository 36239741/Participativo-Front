import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthenticationService } from 'src/app/Infra/Authentication/authentication.service';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export interface Login {
  email: string,
  senha:string
}

@Component({
  selector: 'participativo-UserAction',
  templateUrl: './UserAction.component.html',
  styleUrls: ['./UserAction.component.css']
})
export class UserActionComponent implements OnInit {
  hide = true;
  constructor
  ( private router: Router,
    private authentication: AuthenticationService,
    private snackBar: SnackbarService) {
   }

  ngOnInit() {
  }
  matcher = new MyErrorStateMatcher();
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);


/*
  Executa as demais funcoes 
*/
  login() {
    if(this.validate()) {
      this.submit(this.formValues());
    }
  }
  /*
  Deve fazer o login, se der certo redireciona para /home se nao mostra uma mensagem
  de error atraves de uma snackbar.
  */
  submit(login?: Login) {
    this.authentication.login(login).subscribe(() => {
      this.router.navigate(['home'])
    }, error => 
    {
      this.snackBar.open(
      { message: error.error.message,
        duration: 5,
        customClass: 'error' }
      )
      this.email.reset('');
      this.password.reset('');
    }
      );
  }
/*
Recupera os valores do fomulario de login e isere ne um objeto de formato:
Login: {
    email: string,
    senha:string
}
*/
  formValues() {
    let Login = {
      email: this.email.value,
      senha: this.password.value
    }
    return Login;
  }
/*
Verifica se os campos email e password do formulario estao validos
*/
  validate() {
    return this.email.valid && this.password.valid ? true : false;
  }
}



