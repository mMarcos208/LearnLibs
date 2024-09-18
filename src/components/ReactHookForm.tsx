import {View, Button} from 'react-native';
import {useForm} from 'react-hook-form';
import React from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {ControlledInput} from './ControlledInput';

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
  const {control, handleSubmit} = useForm({
    defaultValues: schema.getDefault() as SchemaValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SchemaValues) => console.log(data);

  return (
    <View>
      <ControlledInput
        name="firstName"
        control={control}
        placeholder="Primeiro nome"
      />

      <ControlledInput
        name="lastName"
        control={control}
        placeholder="Último nome"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
