import { Component, OnInit } from '@angular/core';
import { MapsAPILoader, NoOpMapsAPILoader, MouseEvent } from 'angular2-google-maps/core';
import { Router } from '@angular/router';

import { Site } from '../../objects/site.ts';
import { BahnService } from '../../services/bahn/bahn.service';
import { OpenstreetmapService } from '../../services/openstreetmap/openstreetmap.service';

import { CalcHelper } from '../../helper/calc.helper';
import { MapsOptions } from './maps.options';

@Component({
  selector: 'welcome',
  templateUrl: 'app/components/start/start.component.html'
})
export class StartComponent implements OnInit{
    mapsoptions : MapsOptions = new MapsOptions();

    searchStr:string = "";
    public sites : Array<Site>;
    markers: marker[] = [];
    matches: Site[] = [];
    
    searchDistance : string = "10 Km";
    showUmkreis : boolean = false;
    pos : position;

    constructor(private _bahnservice : BahnService, private _streetmapservice : OpenstreetmapService, private _router: Router){}

    searchLocation(){
      /* Mithilfe der Openstreetmap Geocode Api wird der Suchstring zu Koordinaten
      aufgelöst. */

      this._streetmapservice.getGeocode(this.searchStr).
        then(result => {
          if(result.length == 1){
            this.pos = {
              lat : parseFloat(result[0]['lat']),
              lng : parseFloat(result[0]['lon'])
            };
            this.filterlocation();
          } else {
            this.matches = [];
          }
          this.setMapPosition();
        });    
    }

    setMapPosition(){
      /* Wenn der Suchstring null ist, wird die Karte wieder auf Gesamtdeutschland
      zentriert und der Zoom dementsprechend angepasst. Wenn der Suchstring nicht
      null ist, wird nur die Karte herangezoomt. */

      if(this.searchStr.length == 0 || this.searchStr == null){
        this.pos = {
          lat : 51.289406,
          lng : 10.656738  
        }
        this.mapsoptions.zoom = 6;
        return;
      } 
      this.mapsoptions.zoom = 12;
    }

    filterlocation(){
      /* Es wird der Abstand zwischen dem gesuchten Ort und den vorher abgerufenen
      Parkplätzen berechnet. Wenn der Abstand geringer als "distance" ist, dann wird
      er in der Liste unter dem Suchfeld angezeigt. */


      if (this.sites == null || this.sites.length < 1){
        return;
      }
      if (this.pos == null){ 
        return ; 
      }
      let calc = new CalcHelper();
      this.matches = [];
      this.matches = this.sites.filter(site => {
        var sitePos : position = {
          lat: parseFloat(site.parkraumGeoLatitude),
          lng: parseFloat(site.parkraumGeoLongitude) 
        };
        if ( calc.distanceBetweenTwoPoints(this.pos, sitePos) < this.getChosenDistance()){
          return true;
        }
        return false;
      });

      if(this.getChosenDistance() > 20){
        this.mapsoptions.zoom = 10;  
        return;
      }
      if(this.getChosenDistance() > 10){
        this.mapsoptions.zoom = 11;
        return;  
      }
      this.mapsoptions.zoom = 12;
    }

    getDistance(site : Site){
      /* Gibt die Entfernung zu einer spezifischen Site zurück. Wird für die Auflistung
      der Suchergebnisse verwendet. */

      let calc = new CalcHelper();
      var sitePos : position = {
          lat: parseFloat(site.parkraumGeoLatitude),
          lng: parseFloat(site.parkraumGeoLongitude) 
        };
      return calc.distanceBetweenTwoPoints(this.pos, sitePos);
    }

    getChosenDistance() : number {
      /* Wandelt den Inhalt des Select-Feldes in eine Zahl um, mit der die
      Umkreissuche durchgeführt wird. */

      if (this.searchDistance == "2 Km"){
        return 2;
      }
      if (this.searchDistance == "5 Km"){
        return 5;
      }
      if (this.searchDistance == "10 Km"){
        return 10;
      }
      if (this.searchDistance == "15 Km"){
        return 15;
      }
      if (this.searchDistance == "20 Km"){
        return 20;
      }
      if (this.searchDistance == "50 Km"){
        return 50;
      }
      // Default
      return 10;
    }

    getUserLocation(){
      /* Abrufen der aktuellen Koordinaten und Filterung der gespeicherten 
      Parkplätze. Auf mobilen Geräten wird die Position über GPS abgerufen. */

      if(navigator && navigator.geolocation){
        
          navigator.geolocation.getCurrentPosition(pos => {
            this.searchStr = "";
            this.pos = {
              lat : pos.coords.latitude,
              lng : pos.coords.longitude
            }

            this.filterlocation();  
          }, error => {
            alert('Aktuelle Position konnte nicht abgerufen werden.');
          }, {timeout:10000}); 
      } else {
        alert('Aktuelle Position konnte nicht abgerufen werden!');
      }
    }

    showUmkreisEdit(){
      /* Verändert die Sichtbarkeit des Select Feldes für den Umkreis */

      this.showUmkreis = !this.showUmkreis;
    }

    umkreisChanged(e){
      /* Wird aufgerufen, wenn der Umkreis für die Suche verändert wird. */

      this.searchDistance = e.target.value;
      this.filterlocation();
      this.showUmkreisEdit();
    }

    ngOnInit(){
      /* In der Init-Methode werden alle verfügbaren Parkplätze von der Bahn Api 
      geladen und jeweils ein Marker für die Google Map angelegt. */
      
      this._bahnservice.getSites()
          .subscribe(s => {
              this.sites = s;
              this.sites.forEach((site : Site) => {
                this.markers.push({  
                  id: site.parkraumId,
                  lat: parseFloat(site.parkraumGeoLatitude),
                  lng: parseFloat(site.parkraumGeoLongitude),
                });
              });
              this.setMapPosition();
          });

    }

    clickedMarker(index: number) {
      /* Beim Klick auf einen Marker in der Google Karte wird die zugehörige Seite
      geöffnet. */

      let link = ['/site', this.markers[index].id];
      this._router.navigate(link);
    }
}

// Interface für type safety.
interface marker {
	lat: number;
	lng: number;
	id: string;
}

// Interface für type safety.
interface indexObject {
  type: type,
  id: string,
  lat: number;
	lng: number;
  keywords: string[]
}

// Interface für type safety.
interface position {
    lat : number, 
    lng : number
}
