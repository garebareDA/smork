<template>
  <div>
    <h1>smork</h1>
    <h2 v-on:click="login()">login</h2>
  </div>
</template>

<script>
import auth from 'firebase';

export default {
  methods:{
    login: function(){
      console.log('click')
      const provider = new auth.auth.GoogleAuthProvider();

    auth.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(result)
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
    },
  }

}
</script>
