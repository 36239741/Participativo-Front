import {
    trigger,
    state,
    style,
    query,
    animate,
    transition,
    group,
    animateChild,
    stagger,
  } from '@angular/animations';


export const routeAnimations = trigger('routeAnimations', [
    state('registrar', style({
        height: '700px'
    })),
    transition('* => registrar', animate('400ms ease-in-out')),
    transition('registrar => *', animate('400ms ease-in-out')),
  ])