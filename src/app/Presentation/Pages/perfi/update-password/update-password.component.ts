import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  form: FormGroup;
  hide = true;
  hide2 = true;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private snackBar: SnackbarService,
              private usurioaUseCase: UsuarioUseCase) { }

  ngOnInit() {
    this.createForm()
  }
  cancel() {
    this.dialog.closeAll()
  }
  updatePassword() {
    if(this.form.valid) {
      const newPassword = this.form.get('novaSenha').value
      this.usurioaUseCase.updatePassword(newPassword).subscribe(resp => {
        this.dialog.closeAll()
        this.snackBar.open({message: 'Senha alterada com sucesso!', duration: 5, customClass: 'success'})
      },error => {
        this.snackBar.open({message: error.message, duration:5, customClass:'error'})
      })
    }
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
  
    /* Funcao e um validador se os dois inputs contem o mesmo valor */
    compare(control: AbstractControl) {
      let valid = control.get('novaSenha2').value === control.get('novaSenha').value ? true : false;
      if(!valid) {
        control.get('novaSenha2').setErrors({ compare: true })
      }else{
        return null;
      }
    }
}
