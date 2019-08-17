<template>
  <div>
    <input v-model.trim="title" id="title" cols="30" rows="10" placeholder="タイトルを入力してください">
    <div>{{title.length}}/100</div>
    <div>最大文字数100文字</div>
    <button v-on:click="route">配信開始</button>
  </div>
</template>

<script>
import firebase from 'firebase';
import cookie from 'js-cookie';

export default {
  beforeMount(){
    const isAlive = cookie.get('alive');
    console.log(typeof isAlive);
    if(isAlive !== 'true'){
      this.$router.replace(`/`);
    }
  },

  methods:{
    route:function(){
      if(this.title.length === 0){
        this.title = 'non title'
      }
      const db = firebase.firestore();
      db.collection('broadcast').add({
        displayName: cookie.get('user'),
        uid: cookie.get('uid'),
        title: this.title
      }).then(docRef => {
        this.$router.replace(`/start/${docRef.id}`);
      }).catch(err => {
        alert('ログインしてください');
        this.$router.replace(`/`);
      });
    }
  },

  data() {
    return{
      title:'',
    }
  }
}
</script>