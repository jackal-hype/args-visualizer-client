<template>
    <div class="issue">
        <Contenteditable class="problem" v-bind:content="issue.problem" @update="onChangeProblem" />
        <Contenteditable class="title" v-bind:content="issue.title" @update="onChangeTitle" />
        <div class="arguments-wrap">
            <Arguments type="pros" v-bind:issueId="issue._id" v-bind:argsPassed="issue.pros" v-on:childToParent="onArgMessage" />
            <Arguments type="cons" v-bind:issueId="issue._id" v-bind:argsPassed="issue.cons" v-on:childToParent="onArgMessage" />
        </div>
    </div>
</template>

<script>
import Arguments from "./Arguments.vue"
import Contenteditable from "./Contenteditable.vue"

export default {
    name: "Issue",

    components: {
        Arguments,
        Contenteditable
    },

    data() {
        return {
           aa: 'aaa',
           issue: {}
        };
    },

    props: {
        issuePassed: Object
    },

    watch: {
        issuePassed(newVal) {
            console.log("Issue issuePassed from parent: ", newVal, this)
            // newVal.title += 'gg'
            this.issue = newVal
            console.log('Issue $data.issue.title: ', this.issue.title)
        }
    },

    methods: {
        onArgMessage(msg) {
            if (msg.type == 'pros') {
                this.issue.pros = msg.args
            } else if (msg.type == 'cons') {
                this.issue.cons = msg.args
            }
        },

        onChangeProblem(val) {
            console.log("Issue onChangeProblem event: ", val)
            this.issue.problem = val
            // this.$emit('')
            // this.issue.problem = $event
        },

        onChangeTitle(val) {
            console.log("Issue onChangeTitle event: ", val)
            this.issue.title = val
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .problem {
        padding: 8px;
        margin-bottom: 10px;
        font-size: 1em;
        min-height: 2em;
        background-color: #f7f7f7;
        width: 60%;
        margin: 0 auto;
    }
    .arguments-wrap {
        width: 100%;
        display: flex;
    }

    .arguments-wrap .arguments {
        flex: 50%;
    }

    .title {
        font-size: 2em;
        padding: 3px 8px;
        margin-bottom: 10px;
    }
</style>
