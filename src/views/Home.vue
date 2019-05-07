<template>
  <div class="home">    
    <Issues title="Have a good time!" />    
    <Issues title="Don't be bored." />    
  </div>
</template>

<script>
// @ is an alias to /src
import Issues from '@/components/Issues.vue'

export default {
  name: 'home',
  components: {
    Issues
  }
}
</script>
