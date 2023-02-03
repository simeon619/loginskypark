import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { COLORS } from '../themes/colors';
import { set_statut } from '../wharehouse/store';


const caret = {
  caret: require('../assets/images/caret-down.png'),
};
export const Select = ({ name, control ,randomImages }: { name: string; control: any , randomImages :any }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [statut, setStatut] = useState(Object.keys(randomImages)[0]);
console.log(Object.keys(randomImages)[0] ,"ksjd");

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const { field } = useController({
    control,
    defaultValue: statut,
    name,
  });
  useEffect(() => {
    dispatch(set_statut(statut));
  
  }, [statut]);
  const dispatch = useDispatch();
  function fnChooseStatut(status: string): void {
    setStatut(status);
   field.onChange(status);
  }
  console.log(statut , "wesh");

  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          isVisible={modalVisible}
          backdropColor="#111"
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          // animationOutTiming={900}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          style={{ margin: 0 }}
          onBackButtonPress={toggleModal}
          onBackdropPress={toggleModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.textStatut}>Selectionnez un statut</Text>
              <View style={styles.statutContainer}>
                {Object.keys(randomImages).map((value, i) => (
                  <View style={styles.statut} key={Object.keys(randomImages)[i]+Date.now()}>
                    <Pressable onPress={() => fnChooseStatut(value)}>
                      <Image
                        source={randomImages[Object.keys(randomImages)[i]]}
                        style={[
                          styles.ImageStyle,
                          statut === Object.keys(randomImages)[i] &&
                            styles.select,
                        ]}
                      />
                      <Text style={styles.textStatus}>
                        {Object.keys(randomImages)[i]}
                      </Text>
                    </Pressable>
                  </View>
                ))}
              </View>
              <Pressable style={[styles.btnNext]} onPress={toggleModal}>
                <Text style={styles.textNext}>Continue</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.inputContainner}>
        <Text style={styles.textSelect}>choisissez votre statut</Text>
        <TouchableOpacity style={styles.btnInput} onPress={toggleModal}>
          <Image source={randomImages[statut]} style={styles.iconStatut} />
          <Text style={styles.textInput}> {statut}</Text>
          <Image source={caret['caret']} style={styles.iconDrop} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.hide}
        value={field.value}
        onChangeText={field.onChange}
      />
    </>
  );
};

const styles = StyleSheet.create({
  statutContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 5,
  },
  hide: {
    display: 'flex',
    width: 0,
    height: 0,
  },
  statut: {
    textAlign: 'center',
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },
  textStatus: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
  },
  iconDrop: {
    margin: 15,
    height: 20,
    tintColor: COLORS.blue,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  iconStatut: {
    margin: 15,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },

  ImageStyle: {
    width: 55,
    height: 55,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  select: {
    borderColor: COLORS.blue,
    borderWidth: 3,
    padding: 30,
  },
  centeredView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalView: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: COLORS.backgroundInput,
    width: '100%',
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
  btnNext: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textNext: {
    color: COLORS.blue,
    width: '40%',
    textAlign: 'center',
    fontSize: 30,
  },
  textStatut: {
    color: '#000',
    width: '100%',
    padding: 10,
    fontSize: 25,
    paddingLeft: 40,
  },
  textInput: {
    fontSize: 16,
    color: 'black',
  },
  btnInput: {
    marginTop: 5,
    flexDirection: 'row',
    borderBottomColor: COLORS.blue,
    borderBottomWidth: 1.5,
    backgroundColor: COLORS.backgroundInput,
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden',
  },
  inputContainner: {
    marginTop: 5,

    alignItems: 'center',
  },

  textSelect: {
    color: COLORS.blue,
    fontSize: 12,
  },
});
