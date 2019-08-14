<template>
  <div>
    <input v-model.trim="title" id="title" cols="30" rows="10" placeholder="タイトルを入力してください"></input>
    <div>{{title.length}}/100</div>
    <div>最大文字数100文字</div>
    <router-link :to="'/broadcast/start/' + title">
      <h2 class="url">配信を開始する</h2>
    </router-link>
  </div>
</template>

<script>
export default {

  data() {
    return{
      title:"",
    }
  }
}
</script>