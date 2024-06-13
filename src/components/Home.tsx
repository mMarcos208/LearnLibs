import React from 'react';
import {Button, View} from 'react-native';

import {useRealm} from '@realm/react';
import {User} from '../realm/table';
import axios from 'axios';

export const Home = () => {
  const realm = useRealm();

  const addUsers = async () => {
    try {
      const users = await axios.get<User[]>(
        'https://jsonplaceholder.typicode.com/users',
      );
      console.log('users', users.data);
      realm.write(() => {
        users.data.forEach(element => {
          realm.create(User, element);
        });
      });
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <View>
      <Button title="Adicionar usuarios" onPress={addUsers} />
    </View>
  );
};
