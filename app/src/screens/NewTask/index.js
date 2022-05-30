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
import IconDate from 'react-native-vector-icons/Fontisto';
import TimeIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import PushNotification, {Importance} from 'react-native-push-notification';

const NewTask = ({navigation, route}) => {
  const [task, setTask] = useState(route?.params ? route.params.task : null);
  const [summary, setSummary] = useState('');
  const [userData, setUserData] = useState();

  const [description, setDescription] = useState('');
  const [selectedDate, setselectedDate] = useState('');
  const [selectedTime, setselectedTime] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const isFocused = useIsFocused();

  const getLocalStorageData = async () => {
    let user = await AsyncStorage.getItem('userData');
    let data = JSON.parse(user);
    console.log('data in local===>', data);
    setUserData(data);
    // return data;
  };
  useEffect(() => {
    if (isFocused) {
      getLocalStorageData();
    }
  }, [isFocused]);
  const showDatePicker = () => {
    console.log('date time picker modal show');
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const addTask = async () => {
    console.log('add task function calling');
    var combinedDateAndTime = combineDateAndTime();
    console.log('date and time is==>', combinedDateAndTime);
    let taskId = uuid.v4();

    taskId = taskId.replace(/-/g, '_');
    const data = {
      summary,
      description,
      date: combinedDateAndTime.date,
      time: combinedDateAndTime.time,
      userId: userData.uid,
      status: 'assign',
      isChecked: false,
      taskId,
    };

    try {
      await firestore().collection('Tasks').doc(taskId).set(data);
    } catch (e) {
      console.log('error in send data to firebase', e);
    }
    setSummary('');
    setDescription('');
    setselectedDate('');
    setselectedTime('');
    setTime('');
    setDate('');
    navigation.goBack();
  };
  const editTask = async () => {
    console.log('edit task function calling');
    let combinedDateAndTime =
      task.date === selectedDate && task.time === selectedTime
        ? {
            date: selectedDate,
            time: selectedTime,
          }
        : task.date === selectedDate
        ? {
            date: task.date,
            time: selectedTime,
          }
        : task.time === selectedTime
        ? {
            date: selectedDate,
            time: task.time,
          }
        : combineDateAndTime();

    const data = {
      summary,
      description,
      date: combinedDateAndTime.date,
      time: combinedDateAndTime.time,
      userId: task.userId,
      status: task.status,
      isChecked: task.isChecked,
      taskId: task.taskId,
    };
    try {
      await firestore().collection('Tasks').doc(task.taskId).update(data);
    } catch (e) {
      console.log('error in send data to firebase', e);
    }
    setSummary('');
    setDescription('');
    setselectedDate('');
    setselectedTime('');
    setTime('');
    setDate('');

    navigation.goBack();
  };
  useEffect(() => {
    console.log('task comming is===>useeffect', task);
    if (task !== undefined && task !== {} && task !== null) {
      setSummary(task?.summary ? task.summary : '');
      setDescription(task?.description ? task.description : '');
      setselectedDate(task?.date ? task.date : '');
      setselectedTime(task?.time ? task.time : '');
    } else {
    }
  }, [route.params]);
  const combineDateAndTime2 = function () {
    let timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Jan is 0, dec is 11
    var day = date.getDate();

    var dateString = '' + year + '-' + month + '-' + day;

    // var combined = new Date(dateString + ' ' + timeString);
    let combined = {
      date: dateString,
      time: timeString,
    };
    let hourse = time.getHours();
    let minute = time.getMinutes();
    let date2 = date;
    date2.setHours(hourse);
    date2.setMinutes(minute);
    var datum = Date.parse(date2);
    console.log('date 2 is====>', datum);
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      channelId: 'channel-id',
      title: 'My Notification Title',
      message: 'My Notification Message', // (required)
      date: new Date(datum),
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false

      /* Android Only Properties */
    });
  };

  const combineDateAndTime = function () {
    let timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Jan is 0, dec is 11
    var day = date.getDate();

    var dateString = '' + year + '-' + month + '-' + day;

    // var combined = new Date(dateString + ' ' + timeString);
    let combined = {
      date: dateString,
      time: timeString,
    };

    return combined;
  };
  const handleConfirm = date => {
    console.log(
      'A date has been picked: ',
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    );
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Jan is 0, dec is 11
    var day = date.getDate();

    var dateString = '' + year + '-' + month + '-' + day;
    setselectedDate(dateString);
    setDate(date);
    // let dateAndTime=date.split(':')
    // let time=dateAndTime[1]
    // let dates=dateAndTime[0]
    // console.log('dates===>',dates)
    // console.log('time====>',time)
    hideDatePicker();
  };
  const handleTime = time => {
    console.log('time selected=>', time.toLocaleTimeString());
    let timeString = time.getHours() + ':' + time.getMinutes() + ':00';
    setselectedTime(timeString);
    setTime(time);
    hideTimePicker();
  };
  const sendNotification = () => {
    PushNotification.localNotification({
      //... You can use all the options from localNotifications
      channelId: 'channel-id',
      title: 'My Notification Title',
      message: 'My Notification Message', // (required)

      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false

      /* Android Only Properties */
    });
  };
  return (
    <>
      <View style={style.MainContainer}>
        {console.log('task is=====>', task)}
        {/* <TouchableOpacity
          onPress={() => {
            combineDateAndTime2();
          }}>
          <Text>send notification</Text>
        </TouchableOpacity> */}
        <View style={{marginVertical: 25, alignItems: 'center'}}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
            New Task
          </Text>
        </View>
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              borderColor: 'rgba(189, 189, 189, 0.5);',
              borderBottomWidth: 1,
              marginVertical: 20,
              marginTop: 10,
              paddingBottom: 13,
            }}>
            <View style={{marginTop: 14, marginLeft: 14}}>
              <Image source={require('../../Assets/Vector.png')} />
            </View>
            <TextInput
              value={summary}
              onChangeText={setSummary}
              placeholder="Summary"
              placeholderTextColor={'grey'}
              style={{
                paddingLeft: 15,
                width: '90%',
                borderRadius: 5,
                alignSelf: 'center',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              borderColor: 'rgba(189, 189, 189, 0.5);',
              borderBottomWidth: 1,
            }}>
            <View style={{marginTop: 10, marginLeft: 13}}>
              <Image source={require('../../Assets/Description.png')} />
            </View>

            <TextInput
              placeholder={'Description'}
              multiline
              textAlignVertical={'top'}
              numberOfLines={6}
              scrollEnabled={true}
              onChangeText={text => setDescription(text)}
              value={description}
              maxLength={500}
              placeholderTextColor={'grey'}
              style={{
                paddingLeft: 15,
                width: '90%',
                borderRadius: 5,
                alignSelf: 'center',
              }}
            />
          </View>
          <View
            style={{
              borderColor: 'rgba(189, 189, 189, 0.5);',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',

                width: '40%',
                alignItems: 'center',
                paddingVertical: 20,
                // backgroundColor:'black'
              }}>
              <TouchableOpacity onPress={showDatePicker}>
                <IconDate name="date" size={13} color="black" />
              </TouchableOpacity>

              <Text
                style={{
                  paddingLeft: 15,

                  borderRadius: 5,
                }}>
                {selectedDate !== '' ? selectedDate : 'Due date'}
              </Text>
            </View>
          </View>
          <View
            style={{
              borderColor: 'rgba(189, 189, 189, 0.5);',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',

                width: '40%',
                alignItems: 'center',
                paddingVertical: 20,

                // backgroundColor:'black'
              }}>
              <TouchableOpacity onPress={showTimePicker}>
                <TimeIcon name="time-outline" size={13} color="black" />
              </TouchableOpacity>

              <Text
                placeholder={'Description'}
                style={{
                  paddingLeft: 15,

                  borderRadius: 5,
                }}>
                {selectedTime !== '' ? selectedTime : 'Select Time'}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#000000',
                width: 300,
                height: 45,
                borderRadius: 25,
              }}
              onPress={() => {
                if (task) {
                  console.log('task available');
                  editTask();
                } else {
                  console.log('task now vailable');
                  addTask();
                }
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  marginVertical: 10,
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTime}
          onCancel={hideTimePicker}
        />
      </View>
    </>
  );
};
export default NewTask;
const style = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
