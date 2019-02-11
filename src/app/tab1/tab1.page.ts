import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Property } from '../models/property';
import { map } from 'rxjs/operators';
import { Region } from '../models/region';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  public busquedaRealizada: boolean = false;
  private url: string = 'http://inmobiliariaelestrecho.com/wp-json/wp/v2/';
  private urlFoto: string = 'http://inmobiliariaelestrecho.com/wp-json/wp/v2/media/';
  public properties: Property[];
  public regiones: Region[];
  public termino: string;
  
  constructor(private http: Http) {
    this.traerRegiones();
  }

  ngOnInit(): void {
    if(this.busquedaRealizada) {
      this.traerPisos();
    }
  }

  public volver() {
    this.busquedaRealizada = false;
    this.ngOnInit();
  }

  public propertiesByRegion(termino: string) {
    var propertiesByRegion = [];
    
    for (let i = 0; i < this.properties.length; i++) {
      for (let j in this.properties[i].region) {
        if (this.properties[i].regionStr[j] === termino) {
          propertiesByRegion.push(this.properties[i]);
        }
      }      
    }

    return propertiesByRegion;
  }

  public traerPisos() {
    this.http.get(this.url + 'property?per_page=100').pipe(map(res => res.json())).subscribe(data => {
      this.properties = data;
      
      for (let i = 0; i < this.properties.length; i++) {
        this.http.get(this.urlFoto + this.properties[i].featured_media).pipe(map(res => res.json())).subscribe(datosInternos => {
          this.properties[i].foto = datosInternos.guid.rendered;
        });

        this.properties[i].regionStr = [];

        for (let j in this.properties[i].region) {
          this.properties[i].regionStr.push(this.getRegion(this.properties[i].region[j]));
        }

        this.properties[i].propertyFeatureStr = [];

        for (let j in this.properties[i].property_feature) {
          this.properties[i].propertyFeatureStr.push(this.getFeatures(this.properties[i].property_feature[j]));
        }
      }
    });
  }

  public traerRegiones() {
    this.http.get(this.url + 'region?per_page=100').pipe(map(res => res.json())).subscribe(data => {
      this.regiones = data;
    });
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

  public buscar() {
    console.log(this.termino);
    this.busquedaRealizada = true;
    this.ngOnInit();
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



}
