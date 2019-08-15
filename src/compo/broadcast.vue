<template>
  <div>
    <h1 v-on:click="close">終了</h1>
  </div>
</template>

<script>
  import Peer from 'skyway-js';

  export default {
    mounted: function(){
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
