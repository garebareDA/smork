'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import Firebase from 'firebase';
import Peer from 'skyway-js';

import home from './compo/home.vue';
import setting from './compo/setting.vue';
import broadcast from './compo/broadcast.vue';
import radio from './compo/broacastclient.vue'

const peer = new Peer({key: '841ce991-89d8-4257-b656-500ea6b055d5'});

const firebaseConfig = {

};

Firebase.initializeApp(firebaseConfig);

Vue.use(Router);

const routes = [
  {path: '/', component:home},
  {path: '/broadcast/setting', component:setting},
  {path: '/broadcast/start/:id', component:broadcast},
  {path:'/radio/:id', component:radio}
];

const router = new Router({
  routes:routes,
  mode:'history'
});

new Vue({
  el:'#app',
  router:router
});