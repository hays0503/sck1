import { iCity } from "../types/city";

export default function selectCurrentCity({cities, EngNameCity, RusNameCity, KzNameCity}:{cities: iCity[], EngNameCity?: string, RusNameCity?: string,KzNameCity?: string})
{
    if(cities){
        if(RusNameCity) return cities.find(city => city.name_city === RusNameCity);
        if(EngNameCity) return cities.find(city => city.additional_data.EN === EngNameCity);
        if(KzNameCity) return cities.find(city => city.additional_data.KZ === KzNameCity);
        return undefined;
    }else{
        return undefined;
    }
}