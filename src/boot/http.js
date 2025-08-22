// src/boot/http.js
import { boot } from 'quasar/wrappers';
import http from 'src/utils/http';

export default boot(({ app }) => {
  app.config.globalProperties.$http = http;
  app.provide('$http', http);
});
