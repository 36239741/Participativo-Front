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
  success: Success = { title: '', phrase: '' };
  constructor(private actRoute: ActivatedRoute,
              private route: Router) { }

  ngOnInit() {
    this.checkMethod();
  }

  async checkMethod() {
    this.method = await this.actRoute.snapshot.params.method;
    if(this.method == 'registro') {
      this.success = {title: 'Cadastro efetuado!', phrase: 'Atenção! Verifique seu email para confirmar e validar seu cadastro.'};
    }
    else if (this.method == 'recuperar-senha') {
      this.success = {title: 'E-mail enviado!', phrase: 'Verifique seu email e clique no botão "Alterar a senha".'}
    }
    else {
      this.route.navigate(['/'])  
    }
  }

}
