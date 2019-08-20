<template>
  <div>
    <h1 v-on:click="close()">終了</h1>
  </div>
</template>

<script>
  import Peer from 'skyway-js';
  import firebase from 'firebase';
  import cookie from 'js-cookie';

  export default {

    beforeMount(){
      let uid
      const _this = this
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          user.providerData.forEach(profile => {
            uid = profile.uid;
          });
        }else{
          console.log('not login');
          _this.$router.replace('/');
        }
      });

      const db = firebase.firestore();
      const broadcast = db.collection('broadcast').doc(this.$route.params.id);
      broadcast.get().then(doc => {
        if(doc.data().uid !== uid){
          alert('ログインしなおしてください');
          _this.$router.replace('/');
        }
      }).catch(() => {
        _this.$router.replace('/');
      });
    },

    mounted(){
      let localStream;
      const peer = new Peer({key:'841ce991-89d8-4257-b656-500ea6b055d5'});
      navigator.mediaDevices.getUserMedia({video: false, audio: true})
      .then(function(stream){
        localStream = stream;
      });

      const _this = this
      peer.on('open', function(){
        const room = peer.joinRoom(`${_this.$route.params.id}`,{mode: 'sfu', stream: localStream});
        room.once('open', () => {
          console.log('接続しました');
        });

        room.on('close', () =>{
          const db = firebase.firestore();
        });
      });
    },

    created(){
        window.addEventListener('beforeunload', e =>{
        const db = firebase.firestore();
        db.collection('broadcast').doc(`${this.$route.params.id}`).delete().then(() =>{
          console.log('delete')
        }).catch(e => {
          console.log(e);
        });
        e.returnValue = '保存忘れはありませんか？';
      }, false);
    },

    methods:{
      close(){
        const db = firebase.firestore();
        db.collection('broadcast').doc(`${this.$route.params.id}`).delete().then(() =>{
          console.log('delete')
        }).catch(e => {
          console.log(e);
        });
      },
    }
  }
</script>
