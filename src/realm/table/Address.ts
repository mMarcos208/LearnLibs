import Realm, {ObjectSchema} from 'realm';
import {GeoLocation} from './GeoLocation';

export class Address extends Realm.Object<Address> {
  street!: number;
  suite!: string;
  city!: string;
  zipcode!: string;
  geo!: GeoLocation;
  static schema: ObjectSchema = {
    name: 'Address',
    properties: {
      street: 'int',
      suite: 'string',
      city: 'string',
      zipcode: 'string',
      geo: 'GeoLocation',
    },
  };
}
