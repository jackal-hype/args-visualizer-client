<template>
  <div class="issue">
    <h3 class="title">{{ title }}</h3>
    <form @submit.prevent="addIssue">
      <input type="text" placeholder="Enter an issue you have..." 
        v-model="issue" name="issue"
        v-validate="'min: 5'" />
      <transition name="alert-in">
        <p class="alert" v-if="errors.has('issue')" >{{ errors.first('issue') }}</p>
      </transition>
    </form>

    <ul>
      <!-- animate.css classes used: -->
      <transition-group name="list" enter-active-class="animated bounceInUp">
        <li v-for="(data, i) in issues" :key="i">{{ data.issue }}
          <i class="fa fa-times rm-icon" v-on:click="remove(i)"></i>
        </li>
      </transition-group>
    </ul>
    <p v-if="issues.length > 1" class="font-sm">You have more than 1 issue!</p>
    <p v-else class="font-sm">You don't overload with the issues.</p>
    <br>    
  </div>
</template>

<script>
export default {
  name: 'Issues',
  data() {
    return {
      name: 'Dickhead',
      btnState: true,
      issues: [
        { issue: 'my husband says it\'s worth' },
        { issue: 'my mummy never loved me' }
      ],
      issue: '',
      hideAlert: false,
      showFunnyClass: true,
      alert: 'My boyfriend alerted me',
      bg: {
        color: '#c50f08',
        width: '100%',
        height: '30px'
      }      
    }
  }, 
  props: [
    'title'
  ],

  methods: {
    addIssue() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.issues.push({ issue: this.issue })
          this.issue = ''
        } else {
          console.log('input not valid')
        }
      })      
    },

    remove(id) {
      this.issues.splice(id, 1)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Issues.css" scoped>
</style>
