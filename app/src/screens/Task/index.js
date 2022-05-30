import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icons from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconDate from 'react-native-vector-icons/Fontisto';
import TimeIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
const Task = ({navigation}) => {
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState();
  const [taskData, setTaskData] = useState([]);
  let indexOfInCom = [];
  let indexOfCom = [];
  const getLocalStorageData = async () => {
    let user = await AsyncStorage.getItem('userData');
    let data = JSON.parse(user);
    console.log('data in local===>', data);
    // setUserData(data);
    // return data;
    return data;
  };
  const getDataFromFirStore = async () => {
    console.log('get data from firestore in task==?')
    const userData = await getLocalStorageData();
    const data = [];
    let assign = [];

    let incompleted = [];
    await firestore()
      .collection('Tasks')
      .where('userId', '==', userData.uid)
      .get()
      .then(qSnapshot => {
        qSnapshot.forEach(doc => {
          data.push(doc.data());
        });
      });

    assign = data.filter(item => item.status === 'assign');

    incompleted = data.filter(item => item.status === 'incompleted');
    console.log('incompleted task is=>', incompleted);
    let data2 = [...incompleted, ...assign];
    console.log('Tasks======>',data2)
    // setAssignTask(assign);
    // setCompletedTask(completed);
    // setIncompletedTask(incompleted);
    // console.log('data from firestore==>', data);

    setTaskData(data2);
  };
  useEffect(() => {
    console.log("task use effect eunning==>")
    if (isFocused) {
      getDataFromFirStore();
    }
  }, [isFocused]);
  return (
    <ScrollView>
      {}
      <View style={styles.MainContainer}>
        <View style={{marginVertical: 25, alignItems: 'center'}}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
            Task
          </Text>
        </View>

        {taskData.map((item, index) => {
          if (item.status === 'incompleted' || item.status === 'assign') {
            indexOfInCom.push(index);
            return index === indexOfInCom[0] ? (
              <>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginVertical: 12,
                  }}>
                  Incomplete
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        textAlignVertical: 'center',
                        fontSize: 20,
                        color: 'black',
                      }}>
                      {item.summary}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'blue',
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('NewTask', {
                          task: item,
                        })
                      }>
                      <Icons size={20} name="edit-2" color="white" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Ionicons name="alarm-outline" size={20} />
                    <Text>{item.time}</Text>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    {/* <CheckBox
                        checked={item.isChecked}
                        size={20}
                        onPress={() =>
                          updateCheckStatus(item.taskId, item.status)
                        }
                      /> */}
                    <Text
                      style={{
                        textAlignVertical: 'center',
                        fontSize: 20,
                        color: 'black',
                      }}>
                      {item.summary}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'blue',
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('NewTask', {
                          task: item,
                        })
                      }>
                      <Icons size={20} name="edit-2" color="white" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Ionicons name="alarm-outline" size={20} />
                    <Text>{item.time}</Text>
                  </View>
                </View>
              </>
            );
          }
          // else if (item.status === 'completed') {
          //   indexOfCom.push(index);

          //   return (
          //     <>
          //       {index === indexOfCom[0] ? (
          //         <>
          //           <Text
          //             style={{fontSize: 15, fontWeight: 'bold', marginTop: 13}}>
          //             Completed
          //           </Text>
          //           <View
          //             style={{
          //               flexDirection: 'row',
          //               justifyContent: 'space-between',
          //             }}>
          //             <View
          //               pointerEvents="none"
          //               style={{
          //                 justifyContent: 'flex-start',
          //                 flexDirection: 'row',
          //               }}>
          //               <CheckBox
          //                 checked={item.isChecked}
          //                 size={20}
          //                 // onPress={() => setOwnTask(!OwnTask)}
          //               />
          //               <Text
          //                 style={{
          //                   textAlignVertical: 'center',
          //                   fontSize: 20,
          //                   color: 'black',
          //                 }}>
          //                 {item.summary}
          //               </Text>
          //             </View>

          //           </View>
          //         </>
          //       ) : (
          //         <View
          //           pointerEvents="none"
          //           style={{
          //             justifyContent: 'flex-start',
          //             flexDirection: 'row',
          //           }}>
          //           <CheckBox
          //             checked={item.isChecked}
          //             size={20}
          //             // onPress={() => setOwnTask(!OwnTask)}
          //           />
          //           <Text
          //             style={{
          //               textAlignVertical: 'center',
          //               fontSize: 20,
          //               color: 'black',
          //             }}>
          //             {item.summary}
          //           </Text>
          //         </View>
          //       )}
          //     </>
          //   );
          // }
          else {
            return <View></View>;
          }
        })}
      </View>
    </ScrollView>
  );
};
export default Task;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
  },
});
