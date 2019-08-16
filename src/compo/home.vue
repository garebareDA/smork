<template>
  <div>
    <h1>smork</h1>
    <h2 v-on:click="login()">login</h2>
  </div>
</template>

<script>
import auth from 'firebase';
import cookie from 'js-cookie';

export default {
  methods:{
    login: function(){
      console.log('click')
      const provider = new auth.auth.GoogleAuthProvider();

      auth.auth().signInWithPopup(provider).then(function(result) {
        const token = result.credential.accessToken;
        const user = result.user.displayName;
        const uid = result.user.uid;
        const alive = true;

        cookie.set('user', user);
        cookie.set('uid', uid);
        cookie.set('alive', alive);
      }).catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        alert('ログインに失敗しました、やり直してください');
      });
    },
  }

}
</script>
