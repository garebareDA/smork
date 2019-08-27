<template>
  <div>
      <div class="hostIcon">
      <img :src="photoURL">
      <h2>{{title}}</h2>
      <h3>{{displayName}}</h3>
      <button v-on:click="close()">終了</button>
    </div>
  </div>
</template>

<script>
  import Peer from 'skyway-js';
  import firebase from 'firebase';
  let room

  export default {
    beforeRouteLeave (to, from, next){
      const _this = this;
      const db = firebase.firestore();
      const broadcast = db.collection('broadcast').doc(this.$route.params.id);
      broadcast.get().then(doc => {
        _this.photoURL = doc.data().photoURL
        _this.title = doc.data().title
        _this.displayName = doc.data().displayName
      }).catch(() => {
        _this.$router.replace('/');
      });
      next();
    },

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
        room = peer.joinRoom(`${_this.$route.params.id}`,{mode: 'sfu', stream: localStream});
        room.once('open', () => {
          console.log('接続しました');
          room.send('close');
        });

        room.on('close', () =>{
          _this.close();
        });

        room.on('peerJoin',() => {
          room.send('close');
        });
      });
    },

    created(){
        window.addEventListener('beforeunload', e =>{
        room.close();
        const db = firebase.firestore();
        db.collection('broadcast').doc(`${this.$route.params.id}`).delete().then(() =>{
          console.log('delete')
        }).catch(e => {
          console.log(e);
        });
        e.returnValue = '配信を終了しました';
      }, false);

      const _this = this;
      const db = firebase.firestore();
      const broadcast = db.collection('broadcast').doc(this.$route.params.id);
      broadcast.get().then(doc => {
        _this.photoURL = doc.data().photoURL
        _this.title = doc.data().title
        _this.displayName = doc.data().displayName
      }).catch(() => {
        _this.$router.replace('/');
      });
    },

    methods:{
      close(){
        room.close();
        const db = firebase.firestore();
        db.collection('broadcast').doc(`${this.$route.params.id}`).delete().then(() =>{
          console.log('delete')
        }).catch(e => {
          console.log(e);
        });
        this.$router.replace('/');
      },
    },

    data(){
      return{
        photoURL:String,
        title: String,
        displayName: String
      }
    }
  }
</script>
