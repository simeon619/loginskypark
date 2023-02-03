import {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import { COLORS } from '../themes/colors';

export const LogoStart = ({navigation}) => {
  useEffect(() => {
    const time = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => {
      clearTimeout(time);
    };
  });
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/svg1_login.jpg')}
        style={{width: 300, height: 300}}
        fadeDuration={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
