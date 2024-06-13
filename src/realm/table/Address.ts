import Realm, {ObjectSchema} from 'realm';
import {GeoLocation} from './GeoLocation';

export class Address extends Realm.Object<Address> {
  street!: string;
  suite!: string;
  city!: string;
  zipcode!: string;
  geo!: GeoLocation;
  static schema: ObjectSchema = {
    name: 'Address',
    properties: {
      street: 'string',
      suite: 'string',
      city: 'string',
      zipcode: 'string',
      geo: 'GeoLocation',
    },
  };
}
