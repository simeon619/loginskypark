import { yupResolver } from '@hookform/resolvers/yup';
import PhoneNumber from 'google-libphonenumber';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Input } from '../components/Inputs';
import { InputTel } from '../components/InputTel';
import { Select } from '../components/Select';
import { COLORS } from '../themes/colors';
import { addInfo, RootState } from '../wharehouse/store';

type formSchema = {
  name: string;
  email: string;
  tel: number;
  password: string;
  status: 'locataire' | 'proprio' | 'cieDeGestion' | 'resident' | 'organisation';
  // age: string; // 17.07.1999
  // sexe: 'feminin' | 'masculin';
};


export const Formstatut = ({ navigation }: { navigation?: any }) => {
  const validationSchema = yup
    .object({
      name: yup
        .string()
        .required('Veuillez saisir un nom')
        .min(3, 'minimum trois caractere')
        .max(30, 'trop de caractere')
        .matches(new RegExp('^[A-Z][A-Za-zéèêë-]+$'), 'caractere interdit'),
      email: yup
        .string()
        .required('Veuillez saisir une adresse email')
        .matches(
          new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i,
          ),
          'Veuillez saisir une adresse email valide',
        ),
      password: yup
        .string()
        .min(6, 'Doit fait au moins six caracteres')
        .required('Mot de passe est requis'),
      statut: yup.string(),
      confirmPassword: yup
        .string()
        .required('Veuillez confirme votre mot de passe')
        .oneOf([yup.ref('password')], 'mot depasse ne corespondes pas'),
      tel: yup
        .string()
        .required('Veuillez votre numero de telephone')
        .test('tel', 'format incorrect', val => validatePhoneNumber(val)),
    })

    .required();

    const randomImages = {
      ENTITE: require('../assets/images/confident.png'),
      PERSONNE: require('../assets/images/surprised.png'),
    };
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<formSchema>({
    resolver: yupResolver(validationSchema),
  });
  const [recupValid, setRecupValid] = useState('RU');

  const validatePhoneNumber = phoneNumber => {
    let phoneUtil: libphonenumber.PhoneNumberUtil;
    let parsedNumber;
    try {
      phoneUtil = PhoneNumber.PhoneNumberUtil.getInstance();
      parsedNumber = phoneUtil.parse(phoneNumber, 'ZZ');
    } catch (error) {
      return false;
    }
    if (phoneUtil.getRegionCodeForNumber(parsedNumber) === null) {
      setRecupValid('ZZ');
    } else {
      setRecupValid(phoneUtil.getRegionCodeForNumber(parsedNumber));
    }

    return phoneUtil.isValidNumber(parsedNumber);
  };

  const dispatch = useDispatch();
  const infoForm = useSelector((state :RootState ) => state.incription );
  console.log(infoForm+ "ext");
  function submit(data: formSchema) {
    dispatch(addInfo(data))
  }

  return (
    <>
      <KeyboardAwareScrollView
        extraHeight={200}
        enableOnAndroid={true}
        extraScrollHeight={240}
        keyboardOpeningTime={2000}
        style={styles.form}
        // behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        // enabled
        // keyboardVerticalOffset={Platform.select({ios: 0, android: 700})}
      >
        <View style={styles.form}>
          <Select name="statut" control={control} randomImages={randomImages}/>
          <Input
            name="name"
            control={control}
            placeholder="entrez votre nom"
            icon={2}
          />
          <Input
            name="email"
            control={control}
            icon={1}
            placeholder="entrez votre email"
          />
            <InputTel
            name="tel"
            icon={recupValid}
            control={control}
            placeholder="entrez votre numero"
          />
          <Input
            name="password"
            password
            control={control}
            icon={0}
            placeholder="entrez votre mot de passe"
          />
          <Input
            name="confirmPassword"
            password
            control={control}
            icon={0}
            placeholder="confirmez  votre mot de passe"
          />
        

          <View style={styles.btnNext}>
            <Text
              onPress={handleSubmit(submit)}
              style={[
                styles.textNext,
                !isValid && { backgroundColor: '#123' },
              ]}>
              Suivant
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    borderColor: COLORS.blue,
    padding: 5,
  },

  btnNext: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
  },

  btnConnexion: {
    marginTop: 10,
  },
  textNext: {
    backgroundColor: COLORS.blue,
    marginVertical: 12,
    fontSize: 30,
    borderRadius: 90,
    color: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 5,
    textAlign: 'center',
  },
});
