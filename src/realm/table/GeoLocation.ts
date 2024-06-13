import Realm, {ObjectSchema} from 'realm';

export class GeoLocation extends Realm.Object<GeoLocation> {
  lat!: string;
  lng!: string;

  static schema: ObjectSchema = {
    name: 'GeoLocation',
    properties: {
      lat: 'string',
      lng: 'string',
    },
  };
}
