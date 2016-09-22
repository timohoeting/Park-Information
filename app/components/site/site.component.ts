import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MapsAPILoader, NoOpMapsAPILoader, MouseEvent } from 'angular2-google-maps/core';
import 'rxjs/add/operator/map';

import { BahnService } from '../../services/bahn/bahn.service';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Site } from '../../objects/site.ts';
import { Occupancy } from '../../objects/occupancy.ts';
import { BarWeekOptions } from './bar.week.options';
import { BarDayOptions } from './bar.day.options';
import {MapsOptions } from './maps.options';

@Component({
  selector: 'site',
  templateUrl: 'app/components/site/site.component.html'
})
export class SiteComponent implements OnInit{
    barweekoptions : BarWeekOptions = new BarWeekOptions();
    bardayoptions : BarDayOptions = new BarDayOptions();
    mapsoptions : MapsOptions = new MapsOptions();
    
    weekOccupancyVisible = false;
    
    id : string;
    occ : Occupancy;
    site : Site;

    freeSpaces : string;
    maxSpaces : string;
    priceInfo = false;
    additionalInfo = false;
    occupancyInfo = false;
    priceInfoClass = "fa fa-chevron-circle-down fa-rotate-270";
    additionalInfoClass = "fa fa-chevron-circle-down fa-rotate-270";
    occupancyInfoClass = "fa fa-chevron-circle-down fa-rotate-270";

    marker : marker;
    avaible = false;

    constructor(private _route:ActivatedRoute, private _router: Router, private _bahnservice : BahnService, private _firebaseservice : FirebaseService){}

    ngOnInit(){
        /* Abrufen der Übergabeparameter (id) und im Anschluss den Parkplatz mit der zugehörigen
        parkraumId laden. Wenn die Id nicht gefunden wird, erfolgt die Weiterleitung auf die
        Startseite. Im Anschluss werden die Koordinaten des Parkplatzes in das marker-Objekt
        geschrieben, mit dem die Google Maps Karte zentriert wird. Am Ende wird die aktuelle
        Verfügbarkeit des Parkplatzes geladen. */
        
        this._route.params
                .map(params => params['id'])
                .subscribe((id) => {
                    this.id = id;

                    this._bahnservice.getSites()
                        .subscribe(s => {    
                            var sites : Site[] = s;

                            if (sites == null || sites.length < 1 ) {
                              return;
                            }            
                            
                            sites.forEach(result => {
                                if (result.parkraumId == this.id){
                                  this.site = result;
                                }
                            });

                            if (this.site == null) { 
                                this._router.navigate(["/"]);
                                return;
                            }
                            
                            this.marker = { 
                                lat: parseFloat(this.site.parkraumGeoLatitude),
                                lng: parseFloat(this.site.parkraumGeoLongitude),
                                id: this.site.parkraumId
                            };

                            this.avaible = true;
                            this.maxSpaces = "Ingesamt " + this.site.parkraumStellplaetze + " Plätze.";
                        });

                    this._bahnservice.getOccupancy(this.id)
                        .then(result => {
                            if (result == null || result.length < 1){
                              return; 
                            }
                            
                            this.occ = result;
                            this.initDayOccupancy();
                            this.initWeekOccupancy();
                            this.showParkingSpots();
                        }).catch(error => {
                            this.occ = null;
                        });
                });
    }

    initWeekOccupancy(){
      /* Initialisierung der Daten, auf denen die Wochenverfügbarkeit basiert. Die Daten
      müssen aus einem zusätzlichen System abgerufen werden. */

      var data : number[] = [];
      var day_result : firebase_day[] = [];

      this._firebaseservice.getOccupancy(parseInt(this.id)).subscribe(firebaseday => {
        day_result = firebaseday;   
        day_result.forEach(day => {
            var value = 0;
            for (var i = 0; i < 24; i++) {
              if (day[i] != undefined){
                value += day[i].median; 
              }   
            }
            value = value / 24;
            data.push(value);
        });
        if (data.length < 7){
          var difference = 7 - data.length;
          for (var s = 0; s < difference; s++) {
            data.push(0);
          }
        }

        this.barweekoptions.datasets = [ {
          showTooltips: false,
          label: "Auslastung",
          data: data
        }]
      });
    }

    initDayOccupancy(){
      /* Initialisierung der Daten, auf denen die Tagesverfügbarkeit basiert. Die Daten
      müssen aus einem zusätzlichen System abgerufen werden. */

      var data : number[] = [];
      var day_result : firebase_day[] = [];
      var today = new Date().getDay();

      this._firebaseservice.getOccupancy(parseInt(this.id)).subscribe(firebaseday => {
        day_result = firebaseday;   
        day_result.forEach(day => {
          if(day.$key == today.toString()){
            
            
            for (var i = 0; i < 24; i++) {
              if (day[i] == undefined){
                data.push(0);
              }   
              if (day[i] != undefined){
                data.push(day[i].median);
              }   
            }
          }
        });
        
        this.bardayoptions.datasets = [ {
          showTooltips: false,
          label: "Auslastung",
          data: data
        }]
      });
    }

    initCurrentOccupancy(){

    }

    navigateMe(){
      /* An dieser Stelle werden die Koordinaten der aktuellen Site an einen
      Kartendienst übergeben. Bei Apple-Geräten wird Apple Maps als Kartendienst 
      verwendet. Ansonsten wird Google Maps aufgerufen. */
      
      if (navigator.platform.indexOf("iPhone") != -1 ||
            navigator.platform.indexOf("iPad") != -1 ||
            navigator.platform.indexOf("iPod") != -1){
        window.open("http://maps.apple.com/?daddr=" + this.site.parkraumGeoLatitude + "," + this.site.parkraumGeoLongitude + "&t=m&dirflg=d");
      } else {
        window.open("http://maps.google.com/?daddr=" + this.site.parkraumGeoLatitude + "," + this.site.parkraumGeoLongitude + "&t=m&dirflg=d");
      }

    }

    showParkingSpots(){
        /* Anhand der Verfügbarkeitskategorie wird ein Text im Header angezeigt */

        if (this.occ.allocation.category == 1){
          this.freeSpaces = "Weniger als 10 freie Stellplätze.";
        }
        if (this.occ.allocation.category == 2){
          this.freeSpaces = "Zwischen 10 und 30 freien Stellplätzen.";
        }
        if (this.occ.allocation.category == 3){
          this.freeSpaces = "Zwischen 30 und 50 freien Stellplätzen.";
        }
        if (this.occ.allocation.category == 4){
          this.freeSpaces = "Mehr als 50 freie Stellplätze.";
        }
    }

   

    showPriceInfo() {
      /* Anhand des boolean priceInfo wird die Preisinfo ein- oder ausgeklappt. 
      Die beiden CSS-Klassen sind notwendig um bei ausgeklappten Texten das Icon
      zu drehen */

      this.priceInfo = !this.priceInfo;

      if(this.priceInfo){
        this.priceInfoClass = "fa fa-chevron-circle-down";
      }
      if(!this.priceInfo){
        this.priceInfoClass = "fa fa-chevron-circle-down fa-rotate-270";
      }
    }

    showAdditionalInfo() {
      /* Anhand des boolean additionalInfo werden die weiteren Infos ein- oder ausgeklappt. 
      Die beiden CSS-Klassen sind notwendig um bei ausgeklappten Texten das Icon
      zu drehen */

      this.additionalInfo = !this.additionalInfo;

      if(this.additionalInfo){
        this.additionalInfoClass = "fa fa-chevron-circle-down";
      }
      if(!this.additionalInfo){
        this.additionalInfoClass = "fa fa-chevron-circle-down fa-rotate-270";
      }
    }

    showOccupancyInfo() {
      /* Anhand des boolean occupancyInfo werden die weiteren Infos ein- oder ausgeklappt. 
      Die beiden CSS-Klassen sind notwendig um bei ausgeklappten Texten das Icon
      zu drehen */

      this.occupancyInfo = !this.occupancyInfo;

      if(this.occupancyInfo){
        this.occupancyInfoClass = "fa fa-chevron-circle-down";
      }
      if(!this.occupancyInfo){
        this.occupancyInfoClass = "fa fa-chevron-circle-down fa-rotate-270";
      }
    }


    changeVisibleOccupancy(value){
      this.weekOccupancyVisible = value;
    }
}

/* Interface für Google Maps Karte */
interface marker {
	lat: number;
	lng: number;
	id: string;
}

interface firebase_day {
  $key?: string;
  hours : firebase_hour[]
}

interface firebase_hour {
  $key?: string;
  counter : number,
  median : number
}