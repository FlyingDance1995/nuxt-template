<template>
  <div class="message">
    <span style="font-weight: bold">
      Socket Message
    </span>
    <input type='text' v-model="content">
    <input type='button' value='Send' @click='clickButton'>
  </div>
</template>

<script>
  import io from 'socket.io-client';

  export default {
    name: 'SocketIO',
    data() {
      return {
        content: '',
        socket: io('127.0.0.1:3000')
      }
    },

    created() {
      this.socket.on('connect', () => {
        this.socket.emit('join', {"username": "chinh", "password": "123"});
      });

      this.socket.on('messages', (data) => {
        console.log(data);
      });

      this.socket.on('broadcast', (data) => {
        console.log(data);
      });
    },

    methods: {
      clickButton() {
        this.socket.emit('eventClient', this.content);
      }
    }
  }
</script>

<style>
  .message {
    margin: 40px auto;
    background: cornsilk;
    width: 400px;
    border: 1px solid #7f828b;
    padding: 10px;
  }
</style>
