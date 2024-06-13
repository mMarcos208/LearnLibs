import Realm, {ObjectSchema} from 'realm';
import {Address} from './Address';
import {Company} from './Company';

export class User extends Realm.Object<User> {
  id!: number;
  name!: string;
  username!: string;
  fullName?: string;
  email!: string;
  address!: Address;
  phone!: string;
  website!: string;
  company!: Company;
  static schema: ObjectSchema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      username: 'string',
      fullName: 'string?',
      email: 'string',
      address: 'Address',
      phone: 'string',
      website: 'string',
      company: 'Company',
    },
  };
}
