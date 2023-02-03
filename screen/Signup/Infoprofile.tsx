import react from 'react'
import { StyleSheet, Text, View } from 'react-native'


export const Infoprofile =  ({navigation}) => {

    return(
        <View>
        <Text>Info Profile</Text>

        <Text onPress={()=>{
        navigation.navigate("Login")
        }}> INSCRIPTION </Text>
      </View>
    ) 
}


const styles = StyleSheet.create({
   
  });
  
  