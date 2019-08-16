<template>
  <div>
    <input v-model.trim="title" id="title" cols="30" rows="10" placeholder="タイトルを入力してください"></input>
    <div>{{title.length}}/100</div>
    <div>最大文字数100文字</div>
    <router-link :to="id" append>
      <h2 class="url">配信を開始する</h2>
    </router-link>
  </div>
</template>

<script>
import { firestore } from 'firebase';
export default {

  methods:{
    //TODO if文を追加
    route:function(){
      //firebase add で一意のIDで遷移
      const firestoreId = null
      this.$router.push(`/broadcast/start/${firestoreId}`);
    }
  },

  data() {
    return{
      id:"",
    }
  }
}
</script>