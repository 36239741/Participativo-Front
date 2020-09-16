import { Component, OnInit, Inject, Input } from '@angular/core';
import { Apoios } from 'src/app/Data/Entity/IPublicacaioTimeLineEntity';

@Component({
  selector: 'app-show-apoiadores',
  templateUrl: './show-apoiadores.component.html',
  styleUrls: ['./show-apoiadores.component.css']
})
export class ShowApoiadoresComponent implements OnInit {
  @Input() apoiadores: Apoios[];
  dezenoveApoiadores: Apoios[];
  tamanhoDiv: number = 0;
  constructor() { }

  ngOnInit() {
    this.tamanhoDiv = document.getElementById('content').clientHeight;
    this.dezenoveApoiadores = this.apoiadores.slice(0, 19);
  }

}
