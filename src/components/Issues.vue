<template>
  <div class="issue">
    <p>Leave your issues here, {{ name }} ! Wiu wiu wiu.</p>
    
    <br>
    <form @submit.prevent="addIssue">
      <input type="text" placeholder="Enter an issue you have..." 
        v-model="issue" name="issue"
        v-validate="'min: 5'" />
      <p class="alert" v-if="errors.has('issue')" >{{ errors.first('issue') }}</p>
    </form>

    <ul>
      <li v-for="(data, i) in issues" :key="i">{{ i }}: {{ data.issue }} </li>
    </ul>
    <p v-if="issues.length > 1">You have more than 1 issue!</p>
    <p v-else>You dont overload with the issues.</p>
    <div v-bind:class="{ alert: !hideAlert, 'funny-class': showFunnyClass }">{{ alert }}</div>
    <div v-bind:style="{ backgroundColor: bg.color, width: bg.width, height: bg.height }"></div>
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Issues.css" scoped>
</style>
