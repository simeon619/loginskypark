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

const selectMulti = [
  {
    Entite: require('../assets/images/confident.png'),
    Compagnie: require('../assets/images/confident.png'),
    Organisation: require('../assets/images/confident.png'),
  },
  {
    Individu: require('../assets/images/surprised.png'),
    resident: require('../assets/images/surprised.png'),
    locataire: require('../assets/images/surprised.png'),
    Proprio: require('../assets/images/surprised.png'),
  },
];
const caret = {
  caret: require('../assets/images/caret-down.png'),
};
export const SelectMultiple = ({
  name,
  control,
}: {
  name: string;
  control: any;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [statut, setStatut] = useState(Object.keys(selectMulti[0])[1]);
  const [visible, setVisible] = useState(false);
  const [sousGroup, setSousGroup] = useState(selectMulti[0]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setVisible(false);
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
  function fnChooseStatut2(status: string, gr: number, str: any): void {
    setVisible(!visible);
    setSousGroup(str);
    if (status === Object.keys(str)[0]) setStatut(Object.keys(str)[1]);
    else {
      setStatut(status);
    }
  }

  function fnChooseStatut(status: string): void {
    setStatut(status);
    field.onChange(status);
  }
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
              {!visible && (
                <Text style={styles.textStatut}>Selectionnez un groupe</Text>
              )}
              {visible && (
                <Text style={styles.textStatut}>Selectionnez un statut</Text>
              )}
              <View style={styles.statutContainer}>
                {!visible &&
                  selectMulti.map((select, j) => (
                    <>
                      {Object.keys(select).map((value, i, map) => (
                        <View
                          style={[
                            styles.statut,
                            i === 0 && { display: 'flex' },
                          ]}
                          key={Object.keys(select)[i] + Date.now()}>
                          <Pressable
                            onPress={() => fnChooseStatut2(value, j, select)}>
                            <Image
                              source={select[Object.keys(select)[i]]}
                              style={[
                                styles.ImageStyle,
                                statut === Object.keys(select)[i] &&
                                  styles.select,
                              ]}
                            />
                            <Text style={styles.textStatus}>
                              {Object.keys(select)[i]}
                            </Text>
                          </Pressable>
                        </View>
                      ))}
                    </>
                  ))}

                {visible &&
                  Object.keys(sousGroup).map((value, i) => (
                    <View
                      style={[styles.statut, i !== 0 && { display: 'flex' }]}
                      key={value + Date.now()}>
                      <Pressable onPress={() => fnChooseStatut(value)}>
                        <Image
                          source={sousGroup[Object.keys(sousGroup)[i]]}
                          style={[
                            styles.ImageStyle,
                            statut === Object.keys(sousGroup)[i] &&
                              styles.select,
                          ]}
                        />
                        <Text style={styles.textStatus}>
                          {Object.keys(sousGroup)[i]}
                        </Text>
                      </Pressable>
                    </View>
                  ))}
              </View>
              <Pressable style={[styles.btnNext]} onPress={toggleModal}>
                {visible && <Text style={styles.textNext}>Continue</Text>}
                {!visible && <Text style={styles.textNext}></Text>}
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.inputContainner}>
        {visible && (
          <Text style={styles.textSelect}>choisissez votre statut</Text>
        )}
        <TouchableOpacity style={styles.btnInput} onPress={toggleModal}>
          <Image source={sousGroup[statut]} style={styles.iconStatut} />
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
    justifyContent: 'space-evenly',
    columnGap: 5,
  },
  hide: {
    display: 'none',
  },
  statut: {
    display: 'none',
    textAlign: 'center',
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
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
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'contain',
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
    marginBottom: 10,
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
