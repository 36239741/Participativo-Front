import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';

@Component({
  selector: 'participativo-validateUser',
  templateUrl: './validateUser.component.html',
  styleUrls: ['./validateUser.component.css']
})
export class ValidateUserComponent implements OnInit {
  constructor(private actRoute: ActivatedRoute,
              private usuarioUseCase: UsuarioUseCase) { }
  message: string  = ""
  ngOnInit() {
    this.activeUser();
  }

  async activeUser() {
    let token = await this.actRoute.snapshot.params.token;
    let email = await this.actRoute.snapshot.params.email;
    try {
      await this.usuarioUseCase.active(token, email).toPromise();
      this.message = "Usuário ativado com sucesso"
    } catch (error) {
      this.message = error.message;
      console.log(error)
    }
  }

}
