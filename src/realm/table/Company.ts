import Realm, {ObjectSchema} from 'realm';

export class Company extends Realm.Object<Company> {
  name!: string;
  catchPhrase!: string;
  bs!: string;

  static schema: ObjectSchema = {
    name: 'Company',
    properties: {
      name: 'string',
      catchPhrase: 'string',
      bs: 'string',
    },
  };
}
