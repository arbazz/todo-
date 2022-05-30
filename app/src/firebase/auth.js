import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
// import {updateUserFCMToken} from '../utils/notificationService'
const usersCollection = firestore().collection('Users');

async function signupWithEmailAndPassword(data) {
  return new Promise(async (res, rej) => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async e => {
        data.uid = e.user?.uid;
        // AsyncStorage.setItem('uid', e.user?.uid);
        // AsyncStorage.setItem('userData', JSON.stringify(data));

        await firestore().collection('Users').doc(data.uid).set(data);
        // console.log('userDocoment is=>',userDocument)
        res('done');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
        }

        if (error.code === 'auth/invalid-email') {
        }
        rej(error?.message);
        console.log(error);
      });
  });
}
async function signinWithEmailAndPassword(data) {
  const signInData = {};
  // const sendRequestArray = [];
  // const followArray = [];
  // const recieveFollowingArray = [];
  // const revieveRequestArray = [];

  return new Promise(async (res, rej) => {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async e => {
        data.uid = e.user?.uid;
        // await updateUserFCMToken(e.user.uid);

        await firebase
          .firestore()
          .collection('Users')
          .doc(data.uid)
          .get()
          .then(item => {
            let data = item.data();

            AsyncStorage.setItem('uid', e.user?.uid);
            AsyncStorage.setItem('userData', JSON.stringify(data));
          });
        let historyData = [];
        await firebase
          .firestore()
          .collection('LocationHistory')
          .where('userId', '==', data.uid)
          .get()
          .then(qsnapshot => {
            qsnapshot.forEach(item => {
              console.log('location history data===>', item.data());
              historyData.push(item.data());
              let data = {
                historyData: historyData,
              };
              AsyncStorage.setItem('History', JSON.stringify(historyData));
            });
          });

        res('done');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
        }

        if (error.code === 'auth/invalid-email') {
        }
        rej(error?.message);
      });
  });
}

export {signupWithEmailAndPassword, signinWithEmailAndPassword};
