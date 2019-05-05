<template>
  <div class="home">    
    <Issues />
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
