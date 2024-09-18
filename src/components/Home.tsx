import {useState} from 'react';
import React from 'react';
import {Button, FlatList, Pressable, Text, TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useQuery, useRealm} from '@realm/react';
import {User} from '../realm/table';
import axios from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const Home = ({navigation}: Props) => {
  const [newProfileName, setNewProfileName] = useState('');
  const [profileToUpdate, setProfileToUpdate] = useState<number | null>(null);

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
    if (profileToUpdate !== null) {
      const toUpdate = realm.objectForPrimaryKey<User>(User, profileToUpdate);
      realm.write(() => {
        if (toUpdate) {
          toUpdate.name = newProfileName;
        }
      });
    }
  };

  const deleteProfile = (id: number) => {
    const toDelete = realm.objectForPrimaryKey<User>(User, id);
    realm.write(() => {
      if (toDelete) {
        realm.delete(toDelete);
      }
    });
  };

  const deleteAll = () => {
    realm.write(() => {
      realm.deleteAll();
    });
  };

  return (
    <View>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('ReactQuery', {id: 10})}
      />
      <Pressable onPress={() => console.log('teste')} />
      <Button title="Adicionar usuarios" onPress={createUsers} />
      <Button title="Remover todos" onPress={deleteAll} />
      <FlatList
        data={usersDb}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable onPress={() => setProfileToUpdate(item.id)}>
              <Text>{item.name}</Text>
            </Pressable>
            <Pressable onPress={() => deleteProfile(item.id)}>
              <MaterialCommunityIcons name="airplane" size={30} color="#000" />
            </Pressable>
          </View>
        )}
      />
      {profileToUpdate !== null && (
        <>
          <TextInput
            onChangeText={setNewProfileName}
            value={newProfileName}
            placeholder="Adicione um novo nome..."
          />
          <Button title="Atualizar usuário" onPress={updateUser} />
        </>
      )}
      <Button
        onPress={() => navigation.navigate('ReactHookForm')}
        title="Acessar React hook form"
      />
    </View>
  );
};
