import { Component, OnInit, Inject } from '@angular/core';
import { OpenStreetMapProvider } from 'leaflet-geosearch';


import * as L from 'leaflet';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Endereco } from 'src/app/Data/Entity/IPublicacaioTimeLineEntity';
const iconUrl = 'assets/icons/l6lpees-orange-pin-vector.svg'
const iconDefault = L.icon({
  iconUrl,
  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const provider = new OpenStreetMapProvider();
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map;
  enderecoValidate: boolean = false
  constructor( @Inject(MAT_DIALOG_DATA) public data: Endereco,
              private dialogRef: MatDialog,) { }

  ngOnInit() {
    this.openMap();
  }

  closeMap() {
    this.dialogRef.closeAll();
  }
  async openMap () {
    const results = await provider.search(
      { query: `${this.data.logradouro} ${this.data.numero}, Foz do iguacu`});
    results.length == 0 ? this.enderecoValidate = true : this.enderecoValidate = false
    this.map = await L.map('map').setView([results[0].y, results[0].x], 13);

    const tiles = await L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
  tiles.addTo(this.map);
  const circle = await L.marker([results[0].y, results[0].x]).addTo(this.map)
  .bindPopup(`${this.data.logradouro ? this.data.logradouro : ''} 
  ${this.data.numero ? this.data.numero : ''} 
  ${this.data.logradouro || this.data.numero ? '-' : ''} 
  ${this.data.bairro ? this.data.bairro.nome : ''} <br> 
  ${this.data.complemento ? this.data.complemento : ''}`)
  .openPopup();;

  }

  //formata de forma generica os campos
formataCampo(campo, Mascara, evento) { 
  var boleanoMascara; 

  var Digitato = evento.keyCode;
  let exp = /\-|\.|\/|\(|\)| /g
  let campoSoNumeros = campo.toString().replace( exp, "" ); 

  var posicaoCampo = 0;    
  var NovoValorCampo="";
  var TamanhoMascara = campoSoNumeros.length;; 

  if (Digitato != 8) { // backspace 
          for(let i=0; i<= TamanhoMascara; i++) { 
                  boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                                                          || (Mascara.charAt(i) == "/")) 
                  boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(") 
                                                          || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " ")) 
                  if (boleanoMascara) { 
                          NovoValorCampo += Mascara.charAt(i); 
                            TamanhoMascara++;
                  }else { 
                          NovoValorCampo += campoSoNumeros.charAt(posicaoCampo); 
                          posicaoCampo++; 
                    }              
            }      
          campo = NovoValorCampo;
            return campo; 
  }else { 
          return true; 
  }
}

}
