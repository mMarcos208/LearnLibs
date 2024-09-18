import * as React from 'react';
import {useController, FieldValues, FieldPath, Control} from 'react-hook-form';
import {TextInput, View, Text} from 'react-native';

export type ControlledInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  placeholder?: string;
};

export const ControlledInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  placeholder,
}: ControlledInputProps<TFieldValues, TName>) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    field: {ref, ...field},
    fieldState: {error},
  } = useController({control, name});

  return (
    <View>
      <TextInput
        {...field}
        onChangeText={field.onChange}
        placeholder={placeholder}
      />
      <Text>{error?.message}</Text>
    </View>
  );
};
