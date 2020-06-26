import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { routeAnimations } from './route.animations'


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  animations: [ routeAnimations ]
})
export class IndexComponent implements OnInit {
  hide = true;
  
  constructor() { 
   
  }

  ngOnInit() {
  }

prepareRoute(outlet: RouterOutlet) {
  return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
}



}
