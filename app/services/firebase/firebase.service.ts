import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService {
    occupancy : FirebaseListObservable<firebase_day[]>;
    
    constructor(private af:AngularFire){}

    getOccupancy(id:number){
        if(id != null){
          this.occupancy = this.af.database.list('/site/' + id.toString()) as FirebaseListObservable<firebase_day[]>
        } 
        return this.occupancy;
    }
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