import {useController} from 'react-hook-form';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS} from '../themes/colors';
const randomImages = [
  require('../assets/images/padlock.png'),
  require('../assets/images/email.png'),
  require('../assets/images/user.png'),
];
export const Input = ({
  name,
  control,
  password,
  placeholder,
  icon,
}: {
  name: string;
  control: any;
  password?: boolean;
  placeholder: string;
  icon: number;
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
          !!errorDeatils && {
            borderColor: COLORS.error,
            borderBottomWidth: 1,
            backgroundColor: COLORS.error,
          },
        ]}>
        <Image source={randomImages[icon]} style={styles.ImageStyle} />
        <TextInput
          style={{flex: 1, color: 'rgb(12 74 110)'}}
          value={field.value}
          onChangeText={field.onChange}
          placeholderTextColor={COLORS.blue}
          placeholder={placeholder}
          secureTextEntry={password}
          underlineColorAndroid="transparent"
        />
      </View>
      {!!errorDeatils && <Text style={styles.error}> {errorDeatils} </Text>}
      {!!!errorDeatils && <Text style={styles.error}> {errorDeatils} </Text>}
    </>
  );
};

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.backgroundInput,
    height: 50,
    borderRadius: 99,
    marginHorizontal: 19,
    elevation: 10,
    color: COLORS.blue,
    marginTop: 10,
  },
  ImageStyle: {
    margin: 15,
    height: 20,
    tintColor: COLORS.blue,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },

  error: {
    fontSize: 11,
    color: COLORS.error,
    borderRadius: 20,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
});
