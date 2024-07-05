import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {Button, Text, View} from 'react-native';
import axios from 'axios';
import {User} from '../realm/table';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

const getTodos = (): Promise<User[]> =>
  axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(response => response.data);

type Props = NativeStackScreenProps<RootStackParamList, 'ReactQuery'>;

export const ReactQuery = ({route}: Props) => {
  //const queryClient = useQueryClient();
  console.log('routes', route.params.id);
  const query = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  return (
    <View style={{flex: 1}}>
      {query.data?.map(todo => (
        <Text key={todo.id}>{todo.username}</Text>
      ))}

      <Button
        title="Refetch"
        onPress={() => {
          query.refetch();
        }}
      />
    </View>
  );
};
