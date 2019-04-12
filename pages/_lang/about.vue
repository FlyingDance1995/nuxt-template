<template>
  <div class="Content mb-xl">
    <div class="container">
      <h1 class="Content__Title">
        {{ $t('about.title') }}
      </h1>
      <p>{{ $t('about.introduction') }}</p>
    </div>

    <!--<Slack/>-->
  </div>
</template>

<script>
  import Slack from '~/components/Slack.vue'

export default {
  components: {
    Slack
  },
  head() {
    return { title: this.$t('about.title') }
  }
}
</script>
