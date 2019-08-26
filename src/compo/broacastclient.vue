<template>
  <div>
    <h1 v-on:click="close">終了</h1>
    <div class="remote-streams" id="js-remote-streams"></div>
  </div>
</template>

<script>
  import Peer from 'skyway-js';
  import firebase from 'firebase';
  let room

  export default {

    beforeRouteLeave (to, from, next){
      this.close();
      next();
    },

    mounted (){
      let localStream;
      const peer = new Peer({key:'841ce991-89d8-4257-b656-500ea6b055d5', debug:3});
      const _this = this

      peer.on('open', function(){
        room = peer.joinRoom(`${_this.$route.params.id}`,{mode: 'sfu', stream: localStream});
        let hostPeer

        room.once('open', () => {
          console.log('接続しました');
        });

        room.on('stream', async function(stream){
          const remoteVideos = document.getElementById('js-remote-streams');
          const newVideo = document.createElement('video');
          newVideo.srcObject = stream;
          newVideo.playsInline = true;
          newVideo.class = "video";
          newVideo.autoplay = true;
          newVideo.setAttribute('data-peer-id', stream.peerId);
          remoteVideos.appendChild(newVideo);
          console.log('stream')
        });

        room.on('close', () =>{
          const db = firebase.firestore();
          db.collection('brodcast').doc(this.$route.params.id).delete();
        });

        room.on('data', ({src, data}) =>{
          hostPeer = src
        });

        room.on('peerLeave', (peerId) => {
          if(hostPeer === peerId){
            this.close();
            alert('配信が終了しました');
          }
        });

        console.log(room.name);
        console.log(room.members);

      });
    },

    methods:{
      close(){
        room.close();
        console.log('close');
      },
    }
  }
</script>
