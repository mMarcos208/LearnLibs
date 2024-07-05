import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {Button, Text, View} from 'react-native';
import axios from 'axios';

const getTodos = (): Promise<any[]> =>
  axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.data);

export const ReactQuery = () => {
  //const queryClient = useQueryClient();

  const query = useQuery({queryKey: ['todos'], queryFn: getTodos});

  //   const mutation = useMutation({
  //     mutationFn: postTodo,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({queryKey: ['todos']});
  //     },
  //   });

  return (
    <View style={{flex: 1}}>
      {query.data?.map(todo => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}

      <Button
        title="Adicionar usuarios"
        // onPress={() => {
        //   mutation.mutate({
        //     id: Date.now(),
        //     title: 'Do Laundry',
        //   });
        // }}
      />
    </View>
  );
};
