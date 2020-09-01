import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'participativo-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  @Input() src: string;
  @Input() alt : string;
  @Input() width : string;
  @Input() height : string;
  @Input() borderColor: string;
  @Input() id: string;
  constructor() { }

  ngOnInit() {
    console.log(this.borderColor)
  }

}
