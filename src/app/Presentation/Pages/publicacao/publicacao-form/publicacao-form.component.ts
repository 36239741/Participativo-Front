import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { CategoriaRepositoryService } from 'src/app/Data/Repository/categoria-repository.service';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/Data/Entity/ICategoriaEntity';
import { ErrorStateMatcher } from '@angular/material/core';
import { BairroRepositoryService } from 'src/app/Data/Repository/bairro-repository.service';
import { Bairro } from 'src/app/Data/Entity/IBairroEntity';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'participativo-publicacao-form',
  templateUrl: './publicacao-form.component.html',
  styleUrls: ['./publicacao-form.component.css']
})
export class PublicacaoFormComponent implements OnInit {
  form: FormGroup;
  findAllCategoria: Observable<Categoria>
  findAllBairro: Observable<Bairro>
  fileToUpload: File = null;
  constructor(private formBuilder: FormBuilder,
              private categoriaRepository: CategoriaRepositoryService,
              private bairroRepository: BairroRepositoryService,) { }

  ngOnInit() {
    this.findAllCategoria = this.categoriaRepository.findAll();
    this.findAllBairro = this.bairroRepository.findAll(1);
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      descricao: new FormControl('', Validators.required),
      longadouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      complemento: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      bairroId: new FormControl('', Validators.required),
      categoriaId: new FormControl('', Validators.required),
      usuarioUuid: new FormControl('', Validators.required)
    })
  }
  /*Funcao procula o elemento com o id 'upload' e faz o evento de click*/
  openFile() {
    document.getElementById('upload').click();
  }

  handleFileInput(file: File) {
    this.fileToUpload = file;
}

}
