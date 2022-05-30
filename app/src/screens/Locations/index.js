import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  PermissionsAndroid,
  useColorScheme,
  View,
  Image,
  FlatList,
  Platform,
  TouchableOpacity,
} from 'react-native';
//import geolocation
import Geolocation from '@react-native-community/geolocation';
//import vector icons
import Entypo from 'react-native-vector-icons/Entypo';
import {set} from 'react-native-reanimated';
import {Button} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Location = ({navigation}) => {
  const [CurrentLongitude, setCurrentLongitude] = useState('');
  const [CurrentLatitude, setCurrentLatitude] = useState('');
  const [LocationStatus, setLocationStatus] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [history,setHistory]=useState([])
  useEffect(() => {
      getLocationHistoryFromLocal()
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App need your Access your Location please',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // To check if permission granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getLocationHistoryFromLocal=async()=>{
    let user = await AsyncStorage.getItem('History');
    let data = JSON.parse(user);
    console.log('data in local history===>', data);
    setHistory(data)
  }
  const getOneTimeLocation = () => {
    setLocationStatus('getting location ....');
    Geolocation.getCurrentPosition(
      //will give you a current location
      position => {
        setLocationStatus('you are here');
        //getting logitude from the location json
        console.log('current location is here===>', position);
        console.log('position coords', position.coords);
        const CurrentLongitude = JSON.stringify(position.coords.longitude);
        //getting the latutude from location json
        const CurrentLatitude = JSON.stringify(position.coords.latitude);
        //setting longitude state
        setCurrentLongitude(CurrentLongitude);
        //setting latitude state
        setCurrentLatitude(CurrentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 4000,
        maximumAge: 2000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //will give you the location on location change

        setLocationStatus('You are here');
        console.log('posiiton here===>', position);

        //getting the longitude  from the location json
        const CurrentLongitude = JSON.stringify(position.coords.longitude);

        //getting the latituude  from the location json
        const CurrentLatitude = JSON.stringify(position.coords.latitude);

        //setting longitude state
        setCurrentLongitude(CurrentLongitude);

        //setting latitude state
        setCurrentLatitude(CurrentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
      },
    );
  };

  const getPlace = async () => {
    try {
      console.log(
        'coordinates==============>',
        CurrentLatitude,
        '  ',
        CurrentLongitude,
      );
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${CurrentLongitude},${CurrentLatitude}.json?types=place&limit=1&access_token=pk.eyJ1IjoibWF0cml4LXRlY2giLCJhIjoiY2wxZGJhMHR3MGZ2ZjNkczloOTRpZDQ2bCJ9.CzgTvH3duaPWKHY6aWNEJA&country=pk`,
      );
      const myDAta = await response.json();
      console.log('api ', myDAta);
      if (CurrentLatitude !== '' && CurrentLongitude !== '') {
        let place =
          myDAta?.features?.length !== 0
            ? myDAta?.features?.[0].place_name
            : 'Karachi Pakistan';
        sendDataToFirebase(CurrentLatitude, CurrentLongitude, place);
      }

      if (myDAta?.features?.length) {
        setPlaceName(myDAta?.features?.[0].place_name);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getLocalStorageData = async () => {
    let user = await AsyncStorage.getItem('userData');
    let data = JSON.parse(user);
    console.log('data in local===>', data);

    return data;
  };
  const sendDataToFirebase = async (latitude, longitude, place) => {
    console.log('send data to firebase');
    const userData = await getLocalStorageData();
    let locationId = uuid.v4();

    locationId = locationId.replace(/-/g, '_');
    let createdDate = new Date().getTime();
    data = {
      latitude,
      longitude,
      place,
      createdDate,
      locationId,
      userId:userData?.uid
    };
    console.log('data===> in firestore*-+', data);
    try {
      await firestore().collection('LocationHistory').doc(locationId).set(data);
    } catch (e) {
      console.log('error in send data to firebase', e);
    }
  };
  useEffect(() => {
    console.log('current latitude use effect calling', CurrentLatitude);
    getPlace();
  }, [CurrentLatitude]);
  // const getPlace = async () => {
  //     try{
  //         const response = await fetch(
  //             "https://api.mapbox.com/geocoding/v5/mapbox.places/-73.97255357406968,40.73988581645611.json?types=place%2Cpostcode%2Caddress&limit=1&access_token=pk.eyJ1IjoibWF0cml4LXRlY2giLCJhIjoiY2wxZGJhMHR3MGZ2ZjNkczloOTRpZDQ2bCJ9.CzgTvH3duaPWKHY6aWNEJA"
  //         );
  //         const myDAta = await response.json();
  //         console.log(myDAta)
  //     } catch (error) {
  //         console.log(error);
  //     }

  //     };
  //     useEffect(() => {
  //         getPlace();
  //     },[]);
  //}

  const LoacationHistory = [
    {
      Location: 'halsingigatang,SE',
      Longitude: '5877.2393°E',
    },
    {
      Location: 'halsingigatang,SE',
      Longitude: '5877.2393°E',
    },
    {
      Location: 'halsingigatang,SE',
      Longitude: '5877.2393°E',
    },
    {
      Location: 'Pustegrand halsingigatang,SE',
      Longitude: '5877.2393°E',
    },
  ];
  return (
    <View style={styles.MainConTainer}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '600',
            color: 'black',
            marginVertical: 20,
          }}>
          Location
        </Text>
      </View>
      <View style={{marginHorizontal: 10}}>
        <TouchableOpacity onPress={getOneTimeLocation}>
          <Text style={{fontSize: 15, fontWeight: '500'}}>
            {' '}
            <Entypo name="plus" size={15} /> Check In
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={getOneTimeLocation}>  </TouchableOpacity> */}
        <Text style={{fontSize: 15, fontWeight: '500', marginTop: 10}}>
          Location
        </Text>
      </View>
      <View>
        <View style={{marginVertical: 10, flexDirection: 'row', padding: 5}}>
          <Image source={require('../../Assets/pinLocation.png')} />
          <Text style={{marginLeft: 5}}>{LocationStatus}</Text>
          <Text style={{marginLeft: 5}}>{LocationStatus}</Text>
        </View>
        <View style={{marginLeft: 30}}>
          <Text>longitude {CurrentLongitude}</Text>
        </View>
        <View style={{marginLeft: 30}}>
          <Text> {placeName}</Text>
        </View>
      </View>

      <View style={{marginHorizontal: 10, marginVertical: 10}}>
        <Text style={{fontSize: 15, fontWeight: '500', marginTop: 10}}>
          Previous Location
        </Text>

        <FlatList
          data={history}
          renderItem={({item}) => {
            return (
              <>
                <View
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    padding: 5,
                  }}>
                  <Image source={require('../../Assets/pinLocation.png')} />
                  <Text style={{marginLeft: 5}}>{item.place}</Text>
                </View>
                <View style={{marginLeft: 30}}>
                  <Text>{item.latitude+"°E"}</Text>
                </View>
              </>
            );
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  MainConTainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});
export default Location;
