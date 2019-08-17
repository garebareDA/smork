<template>
  <div>
    <h1 v-on:click="close">終了</h1>
    <div class="remote-streams" id="js-remote-streams"></div>
  </div>
</template>

<script>
  import Peer from 'skyway-js';

  export default {
    mounted: function(){
      let localStream;
      const peer = new Peer({key:'841ce991-89d8-4257-b656-500ea6b055d5'});
      const _this = this

      peer.on('open', function(){
        const room = peer.joinRoom(`${_this.$route.params.id}`,{mode: 'sfu', stream: localStream});

        room.once('open', () => {
          console.log('接続しました');
        });

        room.on('stream', async function(stream){
          const remoteVideos = document.getElementById('js-remote-streams');
          const newVideo = document.createElement('video');
          newVideo.srcObject = stream;
          newVideo.playsInline = true;
          newVideo.id = "video";
          newVideo.autoplay = true;
          newVideo.setAttribute('data-peer-id', stream.peerId);
          remoteVideos.appendChild(newVideo);
          console.log('stream')
        });

        room.on('close', () =>{
          const db = firebase.firestore();
          db.collection('brodcastNow').doc(this.$route.params.id).delete();
        });

        console.log(room.name);
        console.log(room.members);

      });
    },

    methods:{
      close:function(){
        peer.close();
      },
    }
  }
</script>
