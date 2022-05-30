import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

import uuid from 'react-native-uuid';

const AddAttachment = ({navigation}) => {
  const [checked, setChecked] = useState(false);
  const [InComplete, setInComplete] = useState(false);
  const [Complete, setComplete] = useState(false);
  const [OwnTask, setOwnTask] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [assignTask, setAssignTask] = useState([]);
  const [incompletedTask, setIncompletedTask] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);

  const isFocused = useIsFocused();
  let indexOfInCom = [];
  let indexOfCom = [];
  const getLocalStorageData = async () => {
    let user = await AsyncStorage.getItem('userData');
    let data = JSON.parse(user);
   
    // setUserData(data);
    // return data;
    return data;
  };
  const getDataFromFirStore = async taskId => {
    const userData = await getLocalStorageData();
    const data = [];
    let assign = [];
    let completed = [];
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
    completed = data.filter(item => item.status === 'completed');
    incompleted = data.filter(item => item.status === 'incompleted');
   
    let data2 = [...incompleted, ...assign, ...completed];
    let indexArray = [];

    // setAssignTask(assign);
    // setCompletedTask(completed);
    // setIncompletedTask(incompleted);
    // console.log('data from firestore==>', data);

    setTaskData(data2);
  };
  const deleteTask = async taskId => {
    let taskArray=[...taskData]
    taskArray=taskArray.filter((item)=>item.taskId!==taskId)
    
    await firestore().collection('Tasks').doc(taskId).delete();
    setTaskData(taskArray)
  };
  const updateTaskStatus = async (taskId, status) => {
    await firestore().collection('Tasks').doc(taskId).update({
      isChecked: true,
      status,
    });
  };
  const updateCheckStatus = async (taskId, status) => {
    if (status === 'incompleted' || status === 'assign') {
      let assign = [];
      let completed = [];
      let incompleted = [];
      let taskArray = [...taskData];
      let singleTask = taskArray.filter(item => item.taskId === taskId);
      let indexOfTask = taskArray.findIndex(obj => obj.taskId == taskId);
      singleTask[0] = {
        ...singleTask[0],
        isChecked: true,
        status: 'completed',
      };
      taskArray[indexOfTask] = singleTask[0];
      assign = taskArray.filter(item => item.status === 'assign');
      completed = taskArray.filter(item => item.status === 'completed');
      incompleted = taskArray.filter(item => item.status === 'incompleted');
      let data2 = [...incompleted, ...assign, ...completed];
      indexOfInCom = [];
      indexOfCom = [];
      updateTaskStatus(taskId, 'completed');
      setTaskData(data2);
    }
  };
  useEffect(() => {
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NewTask');
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '40%',
              alignItems: 'center',
            }}>
            <Icons size={15} name="plus" color="#333333" />

            <Text styles={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
              Add New Task
            </Text>
          </View>
        </TouchableOpacity>
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
                    <CheckBox
                      checked={item.isChecked}
                      size={20}
                      onPress={() => {
                        updateCheckStatus(item.taskId, item.status);
                      }}
                    />
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
                      backgroundColor: 'red',
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => deleteTask(item.taskId)}>
                      <Icons size={20} name="delete" color="white" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <View style={{flexDirection: 'row', marginHorizontal: 60}}>
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
                    <CheckBox
                      checked={item.isChecked}
                      size={20}
                      onPress={() =>
                        updateCheckStatus(item.taskId, item.status)
                      }
                    />
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
                      backgroundColor: 'red',
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => deleteTask(item.taskId)}>
                      <Icons size={20} name="delete" color="white" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <View style={{flexDirection: 'row', marginHorizontal: 60}}>
                    <Ionicons name="alarm-outline" size={20} />
                    <Text>{item.time}</Text>
                  </View>
                </View>
              </>
            );
          } else if (item.status === 'completed') {
            indexOfCom.push(index);

            return (
              <>
                {index === indexOfCom[0] ? (
                  <>
                    <Text
                      style={{fontSize: 15, fontWeight: 'bold', marginTop: 13}}>
                      Completed
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        pointerEvents="none"
                        style={{
                          justifyContent: 'flex-start',
                          flexDirection: 'row',
                        }}>
                        <CheckBox
                          checked={item.isChecked}
                          size={20}
                          // onPress={() => setOwnTask(!OwnTask)}
                        />
                        <Text
                          style={{
                            textAlignVertical: 'center',
                            fontSize: 20,
                            color: 'black',
                          }}>
                          {item.summary}
                        </Text>
                      </View>
                      {/* <View
                        style={{
                          backgroundColor: 'red',
                          justifyContent: 'center',
                          paddingHorizontal: 10,
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => deleteTask(item.taskId)}>
                          <Icons size={20} name="delete" color="white" />
                        </TouchableOpacity>
                      </View> */}
                    </View>
                  </>
                ) : (
                  <View
                    pointerEvents="none"
                    style={{
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <CheckBox
                      checked={item.isChecked}
                      size={20}
                      // onPress={() => setOwnTask(!OwnTask)}
                    />
                    <Text
                      style={{
                        textAlignVertical: 'center',
                        fontSize: 20,
                        color: 'black',
                      }}>
                      {item.summary}
                    </Text>
                  </View>
                )}
              </>
            );
          } else {
            return <View></View>;
          }
        })}

        {/* <View style={{marginVertical: 15}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            complete my test
          </Text>
          <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
            <CheckBox
              checked={Complete}
              size={20}
              onPress={() => setComplete(!Complete)}
            />
            <Text
              style={{
                textAlignVertical: 'center',
                fontSize: 20,
                color: 'black',
              }}>
              meeting with jack
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 60}}>
            <Ionicons name="alarm-outline" size={20} />
            <Text>Today 17.00</Text>
          </View>
          <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
            <CheckBox
              checked={checked}
              size={20}
              onPress={() => setChecked(!checked)}
            />
            <Text
              style={{
                textAlignVertical: 'center',
                fontSize: 20,
                color: 'black',
              }}>
              meeting with jack
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 60}}>
            <Ionicons name="alarm-outline" size={20} />
            <Text>Today 17.00</Text>
          </View>
          <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
            <CheckBox
              checked={checked}
              size={20}
              onPress={() => setChecked(!checked)}
            />
            <Text
              style={{
                textAlignVertical: 'center',
                fontSize: 20,
                color: 'black',
              }}>
              meeting with jack
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 60}}>
            <Ionicons name="alarm-outline" size={20} />
            <Text>Today 17.00</Text>
          </View>
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
  },
});

export default AddAttachment;
