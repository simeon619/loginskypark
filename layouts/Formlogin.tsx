import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import * as yup from 'yup';
import {Input} from '../components/Inputs';

type formSchema = {
  email: string;
  password: string;
};

const validationSchema = yup
  .object({
    email: yup
      .string()
      .matches(
        new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i),
        'Veuillez saisir une adresse email valide',
      )
      .required('Veuillez saisir une adresse email'),
    password: yup
      .string()
      .min(6, 'Doit fait au moins six caracteres')
      .required('Mot de passe est requis'),
  })
  .required();

const FormLogin = ({navigation}: {navigation?: any}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<formSchema>({
    resolver: yupResolver(validationSchema),
  });
  return (
    <View style={styles.form}>
      <Input
        name="email"
        control={control}
        placeholder="entrez votre email"
        icon={1}
      />
      <Input
        name="password"
        control={control}
        password
        icon={0}
        placeholder="saisissez votre mot de passe"
      />
    
      <View style={styles.btnConnexion}>
        <Text
          onPress={handleSubmit(() => {
            console.log('oops');
          })}
          style={[
            styles.textConnexion,
            !isValid && {backgroundColor: '#12347add'},
          ]}>
          LOG IN
        </Text>
      </View>

      <View style={styles.gotoregister}>
        <Text style={styles.simple}>vous n'avez pas de compte ?</Text>
        <Text
          style={styles.link}
          onPress={() => {
            navigation.navigate('Infoperso');
          }}>
          {' '}
          INSCRIPTION{' '}
        </Text>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
  },

  gotoregister: {
    flexDirection: 'row',
    marginTop: 20,
  },

  simple: {},
  link: {
    color: 'rgb(12 74 110)',
    fontWeight: '900',
    textDecorationLine: 'underline',
  },

  btnConnexion: {
    marginTop: 10,
    width: '100%',
    alignItems : 'center'
  },
  textConnexion: {
    backgroundColor: 'rgb(12 74 110)',
    fontSize: 27,
    borderRadius: 90,
    color: '#fff',
    width: '55%',
    paddingVertical: 5,
    textAlign: 'center',
  },
  error: {
    fontSize: 11,
    color: 'white',
    borderStartColor: '#000',
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#aa061266',
  },

});

export default FormLogin;
