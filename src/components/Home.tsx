import React from 'react';
import {Button, FlatList, Text, View} from 'react-native';

import {useQuery, useRealm} from '@realm/react';
import {User} from '../realm/table';
import axios from 'axios';

export const Home = () => {
  const realm = useRealm();

  const usersDb = useQuery(User);

  const addUsers = async () => {
    try {
      const users = await axios.get<User[]>(
        'https://jsonplaceholder.typicode.com/users',
      );
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
      <FlatList
        data={usersDb}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <>
            <Text>{item.name}</Text>
          </>
        )}
      />
    </View>
  );
};
/**
 * Deletar tudo
 * Deletar por id
 * Buscar por id
 * Atualizar
 * Buscar por formas diferentes
 * Mudanças de propriedades dos nomes da tabela
 */
