import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';
import { Unsubscribable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'participativo-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css']
})
export class ForgotPasswordFormComponent implements OnInit {
  hide = true;
  hide2 = true;
  form: FormGroup;
  unsubscribable: Unsubscribable;
  jwtHelper = new JwtHelperService();
  spinner: boolean = false;
  buttonDisable: boolean = false
  constructor(private formBuilder: FormBuilder,
              private snackBar: SnackbarService,
              private router: Router,
              private actRoute: ActivatedRoute,
              private usuarioUseCase: UsuarioUseCase) {

   }

  ngOnInit() {
      this.createForm();
  }
  /* Funcao cria o grupo de inputs */
  createForm() {
    this.form = this.formBuilder.group({
      novaSenha: new FormControl('', [Validators.required ]),
      novaSenha2: new FormControl('', [Validators.required ]),
    },
    {validators: this.compare
    })
  }
  
  /* Funcao envia a nova senha se o formulario estiver valido */
 async  sendNewPassword() {
    let token = await this.actRoute.snapshot.params.token;
    if(this.form.valid) {
      this.spinner = true;
      this.buttonDisable = true;
      this.unsubscribable = this.usuarioUseCase.sendNewPassword(this.form.get('novaSenha').value, token)
        .subscribe(() => {
          this.snackBar.open({ message: 'Senha alterada com sucesso!', duration: 5, customClass: 'success' })
          this.router.navigate(['/'])
        },
        err => {
          this.snackBar.open({ message: err.error.message, duration: 5, customClass: 'error' })
        },
        () => {
          this.spinner = false
          this.unsubscribable.unsubscribe();
        })
    }
  }

  /* Funcao e um validador se os dois inputs contem o mesmo valor */
  compare(control: AbstractControl) {
    let valid = control.get('novaSenha2').value === control.get('novaSenha').value ? true : false;
    console.log(valid)
    if(!valid) {
      control.get('novaSenha2').setErrors({ compare: true })
    }else{
      return null;
    }
  }
}
