export class Meteorite {
    _id: string;
    name: string;
    GeoLocation: string;
    year;

    getLatLang(geolocation: string): any {
        geolocation = geolocation.replace('(', '');
        geolocation = geolocation.replace(')', '');
        geolocation = geolocation.replace(' ', '');
        const gelocationArray = geolocation.split(',');
        return {lat: parseFloat(gelocationArray[0]), lng: parseFloat(gelocationArray[1])};
    }
}