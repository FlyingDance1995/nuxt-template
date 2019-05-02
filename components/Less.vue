<template>
  <div>
    <div>
      <div style="height: 40px; width: 100%;" class="bg-primary"></div>
      <h3>Title: {{text}}</h3>
      <h4 class="text-primary">ENV: {{env}}</h4>
    </div>
    <p class="text-success bg-primary pl-md mb-xl">Less Less Less</p>
    <Button class="mb-xl ml-md" type="primary">Primary</Button>
  </div>
</template>
<script>
  import 'iview/dist/styles/iview.css';

  export default {
    name: 'Less',
    data() {
      return {
        background: process.env.THEME === 'mainnet' ? `bg-secondary` : `bg-primary`,
        env: process.env.THEME,
        color: process.env.THEME === 'mainnet' ? `red` : `#4e7cfb`,
      }
    },
    computed: {
      text() {
        return process.env.THEME === 'mainnet' ? `Mainnet Nuxt Project` : `Testnet Nuxt Project`;
      }
    }
  }
</script>
