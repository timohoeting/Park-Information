import { NgModule }      from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { SiteComponent } from './components/site/site.component';
import { StartComponent } from './components/start/start.component';
import { BahnService } from './services/bahn/bahn.service';
import { FirebaseService } from './services/firebase/firebase.service';
import { OpenstreetmapService } from './services/openstreetmap/openstreetmap.service';
import { ChartsModule } from 'ng2-charts';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyCmB16sJ3C1fklbjd-kQhik8BgEhJianW4",
    authDomain: "parkinfoportal-1473250335625.firebaseapp.com",
    databaseURL: "https://parkinfoportal-1473250335625.firebaseio.com",
    storageBucket: "parkinfoportal-1473250335625.appspot.com",
    messagingSenderId: "462678452044"
};

@NgModule({
    imports: [ 
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBHaj_QP1SIUap9oriwgUFGiZUweLqt8tk'
        }),
        ChartsModule,
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    declarations: [ 
        AppComponent,
        SiteComponent,
        StartComponent
    ],
    providers: [
        {
            provide: LocationStrategy, 
            useClass: HashLocationStrategy
        },
        BahnService,
        OpenstreetmapService,
        FirebaseService
    ],
    bootstrap: [ 
        AppComponent 
    ]
})
export class AppModule { }
