import { Injectable }    from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

import { Station } from '../../objects/station';
import { Site } from '../../objects/site';
import { Occupancy } from '../../objects/occupancy';

@Injectable()
export class BahnService{
    private stationsUrl: string;
    private sitesUrl: string;
    private occupancyUrl: string;
    
    constructor(private _http:Http){}

    getStations(){
        /* Unbenutzt, da die verfügbaren Informationen keinen Mehrwert bieten */
        this.stationsUrl = 'http://opendata.dbbahnpark.info/api/beta/stations';
        return this._http.get(this.stationsUrl)
                .toPromise()
                .then(response => response.json()['results'] as Station[])
                .catch(error => console.log(error));
    }

    public getSites() : Observable<Array<Site>>{
        this.sitesUrl = 'http://opendata.dbbahnpark.info/api/beta/sites';

        return this._http.get(this.sitesUrl)
                .flatMap(response => Observable.from(response.json()['results']))
                .map(json => Site.deserialize(json))
                .toArray();
    }

    getOccupancy(id : String){
        this.occupancyUrl = 'http://opendata.dbbahnpark.info/api/beta/occupancy/' + id;
        return this._http.get(this.occupancyUrl)
                .toPromise()
                .then(response => response.json() as Occupancy)
                .catch(error => (console.log(error)));
    }   
}