export class Occupancy {
    site : site;
    allocation : allocation;
}

interface site {
      id : number,
      siteId : number,
      flaechenNummer : number,
      stationName : string,
      siteName : string,
      displayName : string
}

interface allocation {
      validData : boolean,
      timestamp : string,
      timeSegment : string,
      category : number,
      text : string
}