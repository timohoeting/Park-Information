export class CalcHelper {
    /**
     * Returns the smallest number greater than or equal to its numeric argument.
     * @param x A numeric expression.
     */
    public distanceBetweenTwoPoints(pos1 : position, pos2 : position) : number{
    // Positionen in Längen und Breiten aufsplitten
    var lat1 = pos1.lat * Math.PI / 180;
    var lng1 = pos1.lng * Math.PI / 180;
    var lat2 = pos2.lat * Math.PI / 180;
    var lng2 = pos2.lng * Math.PI / 180;
    // Radius der Erde in Metern
    var radius = 6371000;
    // Umrechnung Radius - Kilometer 
    var Rk = 6373; 

    // Abstände anhand von Länge und Breite
    var dLng = lng2 - lng1;
    var dLat = lat2 - lat1;
    
    // Heavy Maths
    // Src: https://en.wikipedia.org/wiki/Haversine_formula
    var a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dLng / 2), 2);
    var c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a) );
    
    // Umrechnung in Kilometer
    var km = c*Rk;
    
    // Formatieren auf zwei Kommastellen
    var multiplier = Math.pow(10, 2);
    var result = Math.round(km * multiplier) / multiplier;
    
    return result;
    }
}

interface position {
    lat : number, 
    lng : number
}