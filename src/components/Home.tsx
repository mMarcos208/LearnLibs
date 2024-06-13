import React, {useState} from 'react';
import {Button, FlatList, Pressable, Text, TextInput, View} from 'react-native';

import {useQuery, useRealm} from '@realm/react';
import {User} from '../realm/table';
import axios from 'axios';

export const Home = () => {
  const [newProfileName, setNewProfileName] = useState('');
  const [profileToUpdate, setProfileToUpdate] = useState<number>();
  const realm = useRealm();

  const usersDb = useQuery(User);

  const createUsers = async () => {
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

  const updateUser = () => {
    const toUpdate = realm.objects(User).filtered(`id == ${profileToUpdate}`);
    realm.write(() => {
      toUpdate[0].name = newProfileName;
    });
  };

  return (
    <View>
      <Button title="Adicionar usuarios" onPress={createUsers} />
      <Button title="Remover todos" onPress={createUsers} />
      <FlatList
        data={usersDb}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              setProfileToUpdate(item.id);
            }}>
            <Text>{item.name}</Text>
          </Pressable>
        )}
      />
      {profileToUpdate && (
        <TextInput
          onChangeText={setNewProfileName}
          value={newProfileName}
          placeholder="Adicione um novo nome..."
        />
      )}
      <Button title="Atualizar usuário" onPress={updateUser} />
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
