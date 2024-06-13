import Realm from 'realm';
import {User} from '../table';

export const onMigration = (oldRealm: Realm, newRealm: Realm) => {
  if (oldRealm.schemaVersion === 3) {
    const oldObjects: Realm.Results<User> = oldRealm.objects(User);
    const newObjects: Realm.Results<User> = newRealm.objects(User);
    // loop through all objects and set the fullName property in the
    // new schema
    for (const objectIndex in oldObjects) {
      const oldObject = oldObjects[objectIndex];
      const newObject = newObjects[objectIndex];
      newObject.fullName = `${oldObject.name} ${oldObject.username}`;
    }
  }
};
