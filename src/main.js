'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import Cokkei from 'vue-cookie';
import * as Firebase from 'firebase/app';

import home from './compo/home.vue';
import setting from './compo/setting.vue';
import broadcast from './compo/broadcast.vue';
import radio from './compo/broacastclient.vue';

let firebaseConfig = {
  apiKey: "AIzaSyB3DX2LR85bdl-rxG6Yc87OKbbiBRma2Vc",
  authDomain: "smork-5493e.firebaseapp.com",
  databaseURL: "https://smork-5493e.firebaseio.com",
  projectId: "smork-5493e",
  storageBucket: "smork-5493e.appspot.com",
  messagingSenderId: "886071085294",
  appId: "1:886071085294:web:b346add9c82b2f17"
};

Firebase.initializeApp(firebaseConfig);

Vue.use(Router);
Vue.use(Cokkei);

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