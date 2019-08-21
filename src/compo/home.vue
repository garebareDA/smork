<template>
  <div>
    <h1>smork</h1>
    <div v-if="isLogin === true">
      <img :src="photURL">
      <div>{{displayName}}</div>
      <div>ログイン中</div>
      <router-link to="/broadcast/setting">
      <a>配信する</a>
      </router-link>
    </div>
    <div v-else>
    <a v-on:click="login()">ログイン</a>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  created() {
    const _this = this
    firebase.auth().onAuthStateChanged(user => {
      if(user){
          user.providerData.forEach(profile => {
            const displayName = profile.displayName;
            const uid = profile.uid;
            const photoURL = profile.photoURL;
            _this.displayName = displayName;
            _this.isLogin = true;
            _this.photURL = photoURL
          });
      }else{
        console.log('not login');
      }
    });

    const db = firebase.firestore();
    db.collection("broadcast").onSnapshot(snapshot =>{
      snapshot.forEach(doc => {
        console.log(doc.id);
        console.log(doc.data());
      });
    });
  },

  methods:{
    login(){
      console.log('click')
      const provider = new firebase.auth.GoogleAuthProvider();
      const _this = this
      firebase.auth().signInWithPopup(provider).then(function(result) {
        const user = result.user.displayName;
        const photURL = result.user.photoURL;

        _this.isLogin = true;
        _this.displayName = user;
        _this.photURL = photURL;
      }).catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        alert('ログインに失敗しました、やり直してください');
      });
    }
  },
  data(){
    return{
      list:[],
      isLogin:false,
      displayName:String,
      photURL:String
    }
  },
}
</script>
