import react from 'react'
import { StyleSheet, Text, View } from 'react-native'


export const Infolocalisation = ({navigation}) => {
    return(
        <View>
        <Text>Info Profile</Text>

        <Text onPress={()=>{
        navigation.navigate("Infoprofile")
        }}> INSCRIPTION </Text>
      </View>
    ) 
}


const styles = StyleSheet.create({
   
  });
  
  