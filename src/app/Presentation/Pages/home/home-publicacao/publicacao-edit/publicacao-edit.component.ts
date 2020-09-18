import { Component, OnInit, Inject, AfterViewInit, AfterContentChecked, ChangeDetectorRef, AfterViewChecked, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { NgxViacepService } from '@brunoc/ngx-viacep';
import { Publicacao } from 'src/app/Core/Domain/PublicacaoModel';
import { Observable } from 'rxjs';
import { Categoria, PublicacaoTimelineContent, PublicacaoTimeline } from 'src/app/Data/Entity/IPublicacaioTimeLineEntity';
import { Bairro } from 'src/app/Data/Entity/IBairroEntity';
import { CategoriaRepositoryService } from 'src/app/Data/Repository/categoria-repository.service';
import { BairroRepositoryService } from 'src/app/Data/Repository/bairro-repository.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PublicacaoUseCase } from 'src/app/Core/Usecases/PublicacaoUseCase';
import { ImgRepositoryService, EType } from 'src/app/Data/Repository/img-repository.service';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';

@Component({
  selector: 'app-publicacao-edit',
  templateUrl: './publicacao-edit.component.html',
  styleUrls: ['./publicacao-edit.component.css']
})
export class PublicacaoEditComponent implements OnInit, AfterViewChecked {
  form: FormGroup;
  findAllCategoria: Observable<Categoria>
  findAllBairro: Bairro[] = []
  publicacao: any
  fileToUpload: File = null;

  constructor(private formBuilder: FormBuilder,
              private cep: NgxViacepService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private matDialog: MatDialog,
              private bairro: BairroRepositoryService,
              private changeDetector : ChangeDetectorRef,
              private publicacaoUseCase:PublicacaoUseCase,
              private imgRepository: ImgRepositoryService,
              private snackBar:SnackbarService,
              private categoriaRepository: CategoriaRepositoryService,) { 
                this.publicacao = this.data
              }
  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    this.findAllCategoria = this.categoriaRepository.findAll();
    this.bairro.findAll(1).subscribe(result => { this.findAllBairro = result })
    this.createForm();
  }
  async update() {
    let publicacao: Publicacao = {
      bairroId: this.form.get('bairroId').value,
      cep: this.form.get('cep').value,
      complemento: this.form.get('complemento').value,
      descricao: this.form.get('descricao').value,
      logradouro: this.form.get('logradouro').value,
      numero: this.form.get('numero').value,
      categoriaId: '',
      usuarioUuid: ''
    }
    try {
      await this.publicacaoUseCase.update(publicacao, this.publicacao.uuid).toPromise();
      if(this.fileToUpload != null) {
        await this.imgRepository.upload(this.fileToUpload, EType.Publicacao, this.publicacao.uuid).toPromise();
      }
      this.snackBar.open({ message: 'Publicação alterada com sucesso!', duration: 5, customClass: 'success' });
      this.matDialog.closeAll();
    } catch (error) {
      this.snackBar.open({ message: error.message, duration: 5, customClass: 'error' });
    }
  }
  closeDialog() {
    this.matDialog.closeAll();
  }
    /* Recebe o file vindo do input oculto */
    handleFileInput(file: FileList) {
      this.form.get('img').setValue(file.item(0).name);
      this.fileToUpload = file.item(0);
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
  createForm() {
    this.form = this.formBuilder.group({
      descricao: new FormControl(this.data.descricao, [Validators.required, Validators.minLength(20)]),
      logradouro: new FormControl(this.data.endereco.logradouro, Validators.required),
      numero: new FormControl(this.data.endereco.numero),
      complemento: new FormControl(this.data.endereco.complemento),
      cep: new FormControl(this.data.endereco.cep, Validators.required),
      bairroId: new FormControl(String(this.data.endereco.bairro.id), Validators.required),
      img: new FormControl('', [this.imgTypeValidator]),
      ocult: new FormControl(null),
    })
  }
  
    /* Valida o tipo de imagem */
    imgTypeValidator(control: AbstractControl) {
      let fileName:string = control.value
      if(control.value.length > 0) {
        let type:string[] = fileName.trim().split('.');
        let permitType: string[] = ['png', 'jpg'];
        let result: string[] = permitType.filter(value => { return value === type[type.length -1] });
        return result.length === 0 ? { imgTypeValidator: true } : null;
      }
    }
}
