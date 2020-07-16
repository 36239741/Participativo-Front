import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthenticationService } from 'src/app/Infra/Authentication/authentication.service';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';

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
  constructor(
    private authentication: AuthenticationService,
    private snackBar: SnackbarService
    ) {
   }

  ngOnInit() {
  }
  matcher = new MyErrorStateMatcher();
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);



  login() {
    if(this.validate()) {
      this.submit(this.formValues());
    }
  }

  submit(login?: Login) {
    this.authentication.login(login).subscribe(() => {}, error => 
    {this.snackBar.open(error.error.message, 5 , 'error');});
  }

  formValues() {
    let Login = {
      email: this.email.value,
      senha: this.password.value
    }
    return Login;
  }
  validate() {
    return this.email.valid && this.password.valid ? true : false;
  }
}



