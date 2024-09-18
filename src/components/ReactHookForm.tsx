import {Text, View, TextInput, Button} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import React from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    firstName: yup.string().required('Campo obrigatório').default(''),
    lastName: yup
      .string()
      .max(10, 'Limite de 10 carcteres atingido')
      .notRequired()
      .default(''),
  })
  .required();

type SchemaValues = yup.InferType<typeof schema>;

export const ReactHookForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SchemaValues) => console.log(data);

  return (
    <View>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => {
          return (
            <TextInput
              placeholder="First name"
              onChangeText={onChange}
              value={value}
            />
          );
        }}
        name="firstName"
      />
      {errors.firstName && <Text>{errors.firstName.message}</Text>}

      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <TextInput
            placeholder="Last name"
            onChangeText={onChange}
            value={value ?? undefined}
          />
        )}
        name="lastName"
      />
      {errors.lastName && <Text>{errors.lastName.message}</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
