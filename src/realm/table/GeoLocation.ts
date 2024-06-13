import Realm, {ObjectSchema} from 'realm';

export class GeoLocation extends Realm.Object<GeoLocation> {
  lat!: number;
  lng!: number;

  static schema: ObjectSchema = {
    name: 'GeoLocation',
    properties: {
      lat: 'float',
      lng: 'float',
    },
  };
}
