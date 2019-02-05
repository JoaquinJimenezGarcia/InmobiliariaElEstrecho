import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Property } from '../models/property';
import { map } from 'rxjs/operators';
import { strict } from 'assert';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {
  private url: string = "http://inmobiliariaelestrecho.com/wp-json/wp/v2/property?per_page=100";
  public properties: Property[];
  public favoritos: string[];

  constructor(private http: Http) { 
    this.traerPisos();
  }

  ngOnInit() {
  }

  public traerPisos() {
    //for (let i = 1; i <= 12; i++) {
      this.http.get(this.url).pipe(map(res => res.json())).subscribe(data => {
        this.properties = data;
        
        for (let i = 0; i < this.properties.length; i++) {
          this.properties[i].regionStr = this.getRegion(this.properties[i].region[0]);
          this.properties[i].propertyFeatureStr = [];

          for (let j in this.properties[i].property_feature) {
            this.properties[i].propertyFeatureStr.push(this.getFeatures(this.properties[i].property_feature[j]));
          }
        }
      });
    //}
  }

  public getRegion(regionId: number): string {
    switch (regionId) {
      case 32:
        return 'Algeciras';
      case 29:
        return 'Centro Algeciras';
      case 58:
        return 'Colonia San Miguel';
      case 44:
        return 'El Cobre';
      case 40:
        return 'El Rinconcillo';
      case 55:
        return 'Ermita';
      case 41:
        return 'La Granja';
      case 23:
        return 'La Linea';
      case 46:
        return 'Las Colinas - Pastores';
      case 25:
        return 'Los Barrios';
      case 47:
        return 'Menacha';
      case 45:
        return 'Pelayo';
      case 42:
        return 'Saladillo-Piñera';
      case 43:
        return 'San Bernabe';
      case 39:
        return 'San García-Getares';
      case 30:
        return 'San Roque';
      case 57:
        return 'Santa Margarita';
      case 28:
        return 'Tarifa';
      case 56:
        return 'Varadero';
      case 59:
        return 'Virgen de la Palma';
      default:
        return 'Otro';
    }

  }

  public getFeatures(propertyFeature: number): string {
    switch (propertyFeature) {
      case 26:
        return 'Aire acondicionado';
      case 18:
        return 'Alarma';
      case 37:
        return 'Ascensor';
      case 52:
        return 'Balcón';
      case 24:
        return 'Calefacción Central';
      case 51:
        return 'Chimenea';
      case 49:
        return 'Garaje';
      case 19:
        return 'Gimnasio';
      case 20:
        return 'Internet - WIFI';
      case 48:
        return 'Jardín';
      case 27:
        return 'Lavadero';
      case 53:
        return 'Patio';
      case 21:
        return 'Piscina';
      case 22:
        return 'Piscina Comunitaria';
      case 38:
        return 'Se admite mascota';
      case 54:
        return 'Terraza';
      case 50:
        return 'Trastero';
      default:
        return '';
    }
  }

  public getItems(ev: any) {
    const val = ev.target.value;

    if(val === '') {
      this.traerPisos();
    }

    if (val && val.trim() != '') {
      this.properties = this.properties.filter((item) => {
        return (item.title.rendered.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  public meGusta(id: number) {
    if(localStorage.getItem('favoritos') == null || localStorage.getItem('favoritos') == 'undefined') {
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    } else {
      for (let i = 0; i < localStorage.getItem('favoritos').length; i++) {
        this.favoritos[i] = localStorage.getItem('favoritos')[i];
      }

      this.favoritos.push(id.toString());
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    }

    console.log(localStorage.getItem('favoritos'));
  }

}
