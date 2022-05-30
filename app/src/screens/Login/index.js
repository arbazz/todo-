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
import {signinWithEmailAndPassword} from '../../firebase';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignin = async () => {
    let data = {
      email,
      password: password,
    };
    try {
      const response = await signinWithEmailAndPassword(data);
      console.log(response);

      if (response === 'done') {
        navigation.navigate('HomeTabs');
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <View style={style.MainContainer}>
      <View style={{marginVertical: 25, alignItems: 'center'}}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
          Log in
        </Text>
      </View>
      <View style={{}}>
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
      <View style={{marginVertical: 130, alignItems: 'center'}}>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#000000',
              width: 300,
              height: 45,
              borderRadius: 25,
            }}
            onPress={() => handleSignin()}>
            <Text
              style={{color: 'white', textAlign: 'center', marginVertical: 10}}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 20}}>
          <TouchableOpacity>
            <Text
              style={{color: 'black', alignSelf: 'center', fontWeight: 'bold'}}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 20}}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={{color: 'black', alignSelf: 'center', fontWeight: 'bold'}}>
              Do not have an account want to sign up
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
export default Login;
