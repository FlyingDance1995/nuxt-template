<template>
  <div class="Content">
    <div class="container">
      <h1 class="Content__Title">
        {{ $t('home.title') }}
      </h1>
      <p>{{ $t('home.introduction') }}</p>
    </div>
    <Less />
    <!--<CreateChannelSlack/>-->
    <Slack/>
    <SocketIO/>
    <Echart/>
  </div>
</template>

<script>
import Less from '~/components/Less.vue'
import Slack from '~/components/Slack.vue'
import SocketIO from '~/components/SocketIO.vue'
import Echart from '~/components/Echart.vue'
import CreateChannelSlack from '~/components/CreateChannelSlack.vue'

export default {
  components: {
    Less,
    SocketIO,
    Echart,
    Slack,
    CreateChannelSlack
  },
  head() {
    return { title: this.$t('home.title') }
  }
}
</script>
