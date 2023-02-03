import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import {useController} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS} from '../themes/colors';

export const InputTel = ({
  name,
  control,
  placeholder,
  icon,
}: {
  name: string;
  control: any;
  password?: boolean;
  placeholder: string;
  icon: string;
}) => {
  const {
    field,
    fieldState: {error},
  } = useController({
    control,
    defaultValue: '',
    name,
  });
  let errorDeatils = error?.message;

  return (
    <>
    <View
      style={[
        styles.SectionStyle,
        !!errorDeatils && {borderColor: 'rgb(190 18 60)', borderBottomWidth: 1},
      ]}>
      <Text style={styles.ImageStyle} >{getUnicodeFlagIcon(icon)}</Text>
      <TextInput
        style={{flex: 1, color: 'rgb(12 74 110)'}}
        value={field.value}
        onChangeText={field.onChange}
        keyboardType="phone-pad"
        placeholderTextColor={COLORS.blue}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
      />
    </View>
   {!!errorDeatils && <Text style={styles.error}> {errorDeatils} </Text>}
   {!(!!errorDeatils) && <Text style={styles.error}> {errorDeatils} </Text>}
    </>  
  );
};

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundInput,
    height: 50,
    borderRadius: 99,
    marginHorizontal : 19,
    elevation: 3,
    marginTop: 20,
  },
  ImageStyle: {
    fontSize: 25,
    marginLeft : '4%',
    alignItems: 'center',
  },

  error: {
    fontSize: 11,
    color: 'rgb(190 18 60)',
    width: 'auto',
    borderRadius: 20,
    paddingHorizontal: 1,
    textAlign: 'center',
  },
});
