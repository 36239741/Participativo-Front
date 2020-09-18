import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { CategoriaRepositoryService } from 'src/app/Data/Repository/categoria-repository.service';
import { Observable, Unsubscribable } from 'rxjs';
import { Categoria } from 'src/app/Data/Entity/ICategoriaEntity';
import { ErrorStateMatcher } from '@angular/material/core';
import { Bairro } from 'src/app/Data/Entity/IBairroEntity';
import { NgxViacepService } from '@brunoc/ngx-viacep';
import { ActivatedRoute, Router } from '@angular/router';
import { Publicacao } from 'src/app/Core/Domain/PublicacaoModel';
import { ImgRepositoryService, EType } from 'src/app/Data/Repository/img-repository.service';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';
import { PublicacaoUseCase } from 'src/app/Core/Usecases/PublicacaoUseCase';
import { SaveFormService } from 'src/app/Presentation/Shared/save-form.service';

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
  findAllBairro: Bairro[] = []
  fileToUpload: File = null;
  publicacao: Publicacao =  new Publicacao();
  unsubscrible: Unsubscribable;

  spinner: boolean = false;
  constructor(private formBuilder: FormBuilder,
              private cep: NgxViacepService,
              private snackBar: SnackbarService,
              private saveFormService: SaveFormService,
              private imgService: ImgRepositoryService,
              private publicacaoUseCase: PublicacaoUseCase,
              private categoriaRepository: CategoriaRepositoryService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit() {
    this.findAllBairro = this.route.snapshot.data.data;
    this.findAllCategoria = this.categoriaRepository.findAll();
    this.createForm();
    this.form.get('numero').reset('')
    this.getForm();
  
  }

  getForm() {
    this.saveFormService.get().subscribe(result => {
      if(result != null) {
        this.form.get('descricao').setValue(result.descricao);
        this.form.get('logradouro').setValue(result.logradouro);
        this.form.get('numero').setValue(result.numero);
        this.form.get('complemento').setValue(result.complemento);
        this.form.get('cep').setValue(result.cep);
        this.form.get('bairroId').setValue(result.bairroId);
        this.form.get('categoriaId').setValue(result.categoriaId);
      }

    }).unsubscribe();
  }
  saveForm() {
    this.saveFormService.save(this.form.value)
  }
  async createPublicacao() {
    if(this.form.valid) {
      this.spinner = true;
      this.publicacao = this.form.value;
      try {
       (await (this.publicacaoUseCase.create(this.publicacao))).toPromise()
          .then(result => { 
            if(this.fileToUpload != null) {
              this.imgService.upload(this.fileToUpload , EType['Publicacao'], result).toPromise();
            }
          this.form.reset();
            Object.keys(this.form.controls).forEach(key => {
              this.form.get(key).setErrors(null) ;
          });
          this.router.navigate(['home'])
          this.spinner = false;
           })
      } catch (error) {
        this.snackBar.open({ message: error.message, duration: 5, customClass: 'error' })
        this.spinner = false;
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
    public markAllAsTouched(formGroup: FormGroup): void {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
        control.markAsTouched();
        if (control.controls) {
            this.markAllAsTouched(control);
        }
    });
  }
  createForm() {
    this.form = this.formBuilder.group({
      descricao: new FormControl(this.publicacao.descricao, [Validators.required, Validators.minLength(20)]),
      logradouro: new FormControl(this.publicacao.logradouro, Validators.required),
      numero: new FormControl(this.publicacao.numero),
      complemento: new FormControl(this.publicacao.complemento),
      cep: new FormControl(this.publicacao.cep),
      bairroId: new FormControl(this.publicacao.bairroId, Validators.required),
      categoriaId: new FormControl(this.publicacao.categoriaId, Validators.required),
      img: new FormControl('', [this.imgTypeValidator]),
      ocult: new FormControl(null, [ ]),
    })
    this.form.get('img').setErrors(null)
  }
  /*Funcao procula o elemento com o id 'upload' e faz o evento de click*/
  openFile() {
    document.getElementById('upload').click();
  }
  cepSearch() {
    let cep:string = this.form.get('cep').value;
    if(cep.length > 0 && cep != null) {
    this.cep.buscarPorCep(cep)
      .then(cep => {  
      this.form.get('logradouro').setValue(cep.logradouro)
      this.form.get('complemento').setValue(cep.complemento)
      let bairroResult: Bairro[] = this.findAllBairro.filter(value => {
        return value.nome.toLowerCase().trim() === cep.bairro.toLowerCase().trim(); 
      })
      if(bairroResult.length > 0) {
        this.form.get('bairroId').setValue(String(bairroResult[0].id));
      }
      })
    }
  }
  /* Recebe o file vindo do input oculto */
  handleFileInput(file: FileList) {
    this.form.get('img').setValue(file.item(0).name);
    this.fileToUpload = file.item(0);
  }
  /* Valida o tipo de imagem */
  imgTypeValidator(control: AbstractControl) {
    let fileName:string = control.value
    if(fileName) {
      let type:string[] = fileName.trim().split('.');
      let permitType: string[] = ['png', 'jpg'];
      let result: string[] = permitType.filter(value => { return value === type[type.length -1] });
      return result.length === 0 ? { imgTypeValidator: true } : null;
    } else {
        return null
    }
  }
  /* Valida se tem alguma imagem */
  imgRequired(control: AbstractControl) {
    return control.value != null ? null : { imgRequired: true };
  }
}
