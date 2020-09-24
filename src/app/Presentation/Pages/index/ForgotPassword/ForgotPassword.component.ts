import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';
import { Unsubscribable } from 'rxjs';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'participativo-ForgotPassword',
  templateUrl: './ForgotPassword.component.html',
  styleUrls: ['./ForgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private snackBar: SnackbarService,
    private usuarioUseCase: UsuarioUseCase) { }


  forgotPasswordInput = new FormControl('', [Validators.required, Validators.email]);
  unsubscribable: Unsubscribable;
  spinner: boolean = false;

  ngOnInit() {
    
  }
  /* Funcao verifica se o input esta valido, se sim envia o email para redifinir a senha, se nao 
  abre uma modal com a mensagem do error */
  forgotPassword () {
    if(this.forgotPasswordInput.valid) {
      this.spinner = true;
     this.unsubscribable =  this.usuarioUseCase.redefinePassword(this.forgotPasswordInput.value)
        .subscribe(() => {
          this.forgotPasswordInput.reset();
          this.router.navigate(['/'])
          this.snackBar.open({ message: 'Siga as instruções do email enviado para redefinir a senha', duration: 5, customClass: 'success' })
        },
         err => {
          this.snackBar.open({ message: err.error.message, duration: 5, customClass: 'error' });
          this.spinner = false
         },
         () => {
          this.unsubscribable.unsubscribe();
          this.spinner = false
         })
    }
  }

  ngOnDestroy(): void {
    
  }
}
