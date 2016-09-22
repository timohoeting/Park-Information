import { Injectable }    from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OpenstreetmapService{
    private cityUrl: string;
    
    constructor(private _http:Http){}

    getGeocode(city : string){
        this.cityUrl = "http://nominatim.openstreetmap.org/search?q=" + city + "&limit=1&format=json";
        
        return this._http.get(this.cityUrl)
                .toPromise()
                .then(response => response.json())
                .catch(error => console.log(error));
    }
}