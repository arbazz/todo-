import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {signupWithEmailAndPassword} from '../../firebase';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const handleSignup = async () => {
    if (!name && !email && !password)
      return alert('please fill all the fields');
    console.log('fields=>',name,email,password)
    let data = {
      name,
      email,
      password,
      address,
    };
    try {
      const response = await signupWithEmailAndPassword(data);
      console.log(response);
      if (response === 'done') {
        navigation.navigate('Login');
      }
    } catch (err) {
      console.log('error in signup=>', err);
    }
  };

  return (
    <View style={style.MainContainer}>
      <View style={{marginVertical: 25, alignItems: 'center'}}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
          Sign up
        </Text>
      </View>
      <View style={{}}>
        <View style={{marginVertical: 20}}>
          <TextInput
            placeholder="Name"
            placeholderTextColor={'grey'}
            onChangeText={setName}
            style={{
              paddingLeft: 15,
              width: '90%',
              borderRadius: 5,
              alignSelf: 'center',
              backgroundColor: '#F6F6F6',
            }}
          />
        </View>
        <View style={{marginVertical: 20}}>
          <TextInput
            onChangeText={setAddress}
            placeholder="Address"
            placeholderTextColor={'grey'}
            style={{
              paddingLeft: 15,
              width: '90%',
              borderRadius: 5,
              alignSelf: 'center',
              backgroundColor: '#F6F6F6',
            }}
          />
        </View>
        <View style={{marginVertical: 20}}>
          <TextInput
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={'grey'}
            style={{
              paddingLeft: 15,
              width: '90%',
              borderRadius: 5,
              alignSelf: 'center',
              backgroundColor: '#F6F6F6',
            }}
          />
        </View>
        <View>
          <TextInput
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={'grey'}
            secureTextEntry={true}
            style={{
              paddingLeft: 15,
              width: '90%',
              borderRadius: 5,
              alignSelf: 'center',
              backgroundColor: '#F6F6F6',
            }}
          />
        </View>
      </View>
      <View style={{marginVertical: 50, alignItems: 'center'}}>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#000000',
              width: 300,
              height: 45,
              borderRadius: 25,
            }} onPress={()=>handleSignup()}>
            <Text
              style={{color: 'white', textAlign: 'center', marginVertical: 10}}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
export default SignUp;
