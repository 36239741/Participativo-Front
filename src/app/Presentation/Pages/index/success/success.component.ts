import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Success } from './success.interface';

@Component({
  selector: 'participativo-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  method?: string = '';
  success: Success;
  constructor(private actRoute: ActivatedRoute,
              private route: Router) { }

  ngOnInit() {
    this.checkMethod();
  }

  async checkMethod() {
    this.method = await this.actRoute.snapshot.params.method;
    console.log(this.method)
    if(this.method == 'registro') {
      this.success = {title: 'Registro efetuado!', phrase: 'Verifique seu email para confirmar seu cadastro.'};
    }
    else if (this.method == 'recuperar-senha') {
      this.success = {title: 'E-mail enviado!', phrase: 'Verifique seu email e clique no botão "Alterar a senha".'}
    }
    else {
      this.route.navigate(['/'])
    }
  }

}
