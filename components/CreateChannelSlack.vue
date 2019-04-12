<template>
  <div>
    <a href="https://slack.com/oauth/authorize?client_id=605153691248.609016052086&scope=incoming-webhook">
      <img alt="Add to Slack"
           height="40"
           width="139"
           src="https://platform.slack-edge.com/img/add_to_slack.png"
           srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x">
      </a>

    <div class="message">
      <span style="font-weight: bold">
        Slack Message 2
      </span>
      <input type='text'
             v-model="content">
      <input type='button'
             value='Send'
             @click='clickButton'>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'CreateChannelSlack',
    created(){
      console.log("route: ", this.$route.query.code);
      if(this.$route.query.code){
        const urlGetCode = 'https://slack.com/api/oauth.access?client_id=605153691248.609016052086&client_secret=bdaccd221ce904c1ffad5df972c6e8a3&code=' + this.$route.query.code;
        axios.post(urlGetCode).then((response)=> {
          this.webhookUrl = response.data.incoming_webhook.url.toString();
        })
      }
    },

    data() {
      return {
        webhookUrl: '',
        timeCurrent: parseInt(new Date().getTime() / 1000),
        content: '',
        formData: {
          attachments: [
            {
              fallback: "Required plain-text summary of the attachment.",
              color: "#36a64f",
              pretext: "",
              author_name: "From: Su.lx95 API",
              author_icon: "http://static.minhphong306.com/images/daicaphong/me.jpg",
              title: "Open error detail",
              title_link: "https://api.slack.com/",
              text: "See error detail",
              fields: [
                {
                  title: "Priority",
                  value: "High",
                  short: false
                }
              ],
              image_url: "http://my-website.com/path/to/image.jpg",
              thumb_url: "http://example.com/path/to/thumb.png",
              footer: "Slack API",
              footer_icon: "https://platform.slack-edge.com/img/default_application_icon.png",
              ts: this.timeCurrent
            }
          ]
        }
      }
    },

    methods: {
      clickButton() {
        if(this.webhookUrl && this.content){
          this.formData.attachments[0].pretext = this.content;
          const url = this.webhookUrl;
          const data = this.formData;
          axios.post(url, JSON.stringify(data), {
            withCredentials: false,
            transformRequest: [(data, headers) => {
              delete headers.post["Content-type"];
              return data
            }]
          }).then((response)=> {
          })
        }else {
          console.log("Ban chua duoc xac thuc hoac text dien vao bi rong");
        }
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
    border-radius: 10px;
  }
</style>
