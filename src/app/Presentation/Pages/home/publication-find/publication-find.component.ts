import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FindPublicationBehaviorService } from 'src/app/Presentation/Base/layout/find-publication-behavior.service';
import { Unsubscribable } from 'rxjs';
import { PublicacaoUseCase } from 'src/app/Core/Usecases/PublicacaoUseCase';
import { Publicacao } from 'src/app/Data/Entity/IPublicacaoEntity';
import { ThemePalette } from '@angular/material/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  id: string;
  disabled: boolean;
  pk: string;
}
@Component({
  selector: 'participativo-publication-find',
  templateUrl: './publication-find.component.html',
  styleUrls: ['./publication-find.component.css']
})
export class PublicationFindComponent implements OnInit, OnDestroy {
  unsubscribable: Unsubscribable[] = [];
  publicacaoImageUrl = environment.IMG_URL_PUBLICATION;
  usuarioImageUrl = environment.IMG_URL_USER;
  publicacoesList: Publicacao[] = [];
  params: string;
  categorias: string[] = ['1','2','3'];
  categoria: string;
  comResultado: boolean = false
  task : Task[] = 
  [{color: "primary", name: 'Sugestão', completed: true, id: 'sugestao', 'disabled': false, 'pk': '2'}, 
  {color: "primary", name: 'Reclamação', completed: true, id: 'reclamacao', 'disabled': false, 'pk': '1'},
  {color: "primary", name: 'Elogio', completed: true, id: 'elogio', 'disabled': false, 'pk': '3'}]
  constructor(private route: ActivatedRoute,  
              private publicacaoUseCase: PublicacaoUseCase,
              private router: Router,
              private behaviorSearch: FindPublicationBehaviorService) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => { 
      this.params = params.descricao 
    })
    this.search();
  }
  ngOnDestroy(): void {
    this.unsubscribable.map(result => {result.unsubscribe();})
  }

  filter(event) {
    if(event.source.id === 'sugestao') { this.filterVerify('2', event) }
    if(event.source.id === 'reclamacao') { this.filterVerify('1', event) }
    if(event.source.id === 'elogio') { this.filterVerify('3', event) }
  }
  filterVerify(categoria: string, event) {
    this.task.map(value => {value.disabled = false})
    if(this.categorias.length >= 1) {
      const index = this.categorias.indexOf(categoria);
      if(index > -1) {
        this.categorias.splice(index, 1);
      }
      else {
        this.categorias.push(categoria);
        this.categorias.sort();
      }
          let categoriaString = this.categorias.reduce((pv , cv) => {return pv += ',' + cv })
          this.router.navigate(['home/buscar'], { queryParams: {descricao: this.params, categorias: categoriaString}})
          this.search();
    }
    if(this.categorias.length === 1) {
      this.task.map(value => {
        if(value.pk === this.categorias[0]){
          value.disabled = true;
        }
      })
    }
  } 

  categoriasSplit() {
    this.categorias = this.categoria.split(',');
  }
  
  search() {
    this.behaviorSearch.get().subscribe(descricao => 
      {
        this.publicacoesList = []
        this.publicacaoUseCase.findByParams(descricao, this.categorias).subscribe(result => {
          result.content.length ===  0 ? this.comResultado = true : this.comResultado = false
         result.content.map(publicacao => {this.unsubscribable.push(this.publicacaoUseCase.findOne(publicacao.uuid).subscribe(publicacao => {
          this.publicacoesList.push(publicacao);
       }))})
      })})
  }


}