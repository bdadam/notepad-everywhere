import Vue from 'vue';

import { createStore } from 'redux';

// console.log(createStore);

//
// const x = new Vue({
//     data: { asdf: 'qwe' },
//     el: document.body
// });

// console.log(Vue);
// console.log(Vue);

window.firebase.initializeApp({
    apiKey: 'AIzaSyAlHga3HJLrFs31WNUCnuNS8X5Gczkv6tY',
    authDomain: 'notepad-everywhere.firebaseapp.com',
    databaseURL: 'https://notepad-everywhere.firebaseio.com',
    storageBucket: 'notepad-everywhere.appspot.com'
});
