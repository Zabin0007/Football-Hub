importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBd-z3rpHHnUrA1udgiBEN-MjU8NL5Kx9E",
  authDomain: "nowscore-24e47.firebaseapp.com",
  projectId: "nowscore-24e47",
  messagingSenderId: "633482518489",
  appId: "1:633482518489:web:620bdfe71d46603e6943c8",
  storageBucket: "nowscore-24e47.appspot.com",
  measurementId: "G-LTDRLJG4Z7"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});