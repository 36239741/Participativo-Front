import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'participativo-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit, OnDestroy {
  link: string = '/registrar';
  unsubscribe: Unsubscribable[] = [];
  constructor(private route: ActivatedRoute) { }


  ngOnInit() {
   this.unsubscribe.push(
    this.route.paramMap.subscribe(param => {
      console.log(param)
      if(param.get('link') != null) {
        this.link = param.get('link');
      }
    })
   )
  }

  ngOnDestroy(): void {
    this.unsubscribe.map(result => result.unsubscribe())
  }

}
