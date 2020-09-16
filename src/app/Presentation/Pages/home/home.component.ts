import { Component, OnInit } from '@angular/core';
import { PublicacaoTimelineContent, PublicacaoTimeline } from 'src/app/Data/Entity/IPublicacaioTimeLineEntity';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEndService } from '../../Base/layout/page-end.service';
import { PublicacaoUseCase } from 'src/app/Core/Usecases/PublicacaoUseCase';
import { isArray } from 'util';

@Component({
  selector: 'participativo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  publicacaoTimeLine: PublicacaoTimelineContent = 
    {content: [], number: 0, size: 0, totalElements: 0, totalPages: 0 };
  content: PublicacaoTimeline[] = []
  pageEndd: boolean = false;
  last: boolean = false;
  pageNumber: number;
  url: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private publicacaoUseCase: PublicacaoUseCase,
              private behavior: PageEndService) { 

  }

   ngOnInit() {
    this.route.data.subscribe(async () => {
      if(isArray(this.route.snapshot.data.data.content)) {
        this.publicacaoTimeLine = this.route.snapshot.data.data;
      }else {
        this.content = []
        this.url = this.route.snapshot.params.uuid;
        this.content.push(this.route.snapshot.data.data);
        this.publicacaoTimeLine.content = this.content;
      }
    });
    this.last = this.publicacaoTimeLine['last'];
    this.pageEnd();
  }


  /* Funcao verifica se esta no fim da pagina e nao e a ultima pagina do pageable e faz um nova requisicao para pagina seguinte */
  pageEnd() {
    this.behavior.getBehavior().subscribe(result => {
      this.pageEndd = result;
      if(result === true && this.last === false) {
        this.pageNumber = this.publicacaoTimeLine.number
        let nextPage = this.pageNumber + 1
        console.log(this.pageNumber)
        this.publicacaoUseCase.findAll({ page: String(nextPage), linesPerPage: '5',orderBy: 'createdAt', direction:'DESC' }).subscribe(timeline => {
          timeline.content.map(result => {
            this.publicacaoTimeLine.content.push(result)
          })
          this.publicacaoTimeLine.number = timeline.number;
          this.last = timeline['last']
        })
      }
    })
  }
  publicacaoTimeLineContent(publicacaoTime: PublicacaoTimelineContent) {
    this.publicacaoTimeLine = publicacaoTime;
  }
  lastPage(last: boolean) {
    this.last = last;
  }

}
