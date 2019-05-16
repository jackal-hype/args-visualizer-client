<template>
    <div class="issue">
        <div class="ctrls-left">
            <i class="new-issue fas fa-feather-alt fa-lg" @click="newIssue()" title="Новое" />
        </div>
        <div class="ctrls-right">
            <i class="save-issue fas fa-cart-arrow-down fa-lg" @click="saveIssue()" title="Сохранить" />
        </div>
        <div class="ctrls-right"></div>
        <Contenteditable class="problem" v-bind:content="issue.problem" @update="onChangeProblem" placeholder="Проблема..." />
        <Contenteditable class="title" v-bind:content="issue.title" @update="onChangeTitle" placeholder="Решение..." />
        <div class="arguments-wrap">
            <div class="args-ctrls">
                <i class="switch-ctrls fas fa-recycle fa-lg" @click="switchCtrls($event)" />
            </div>
            <Arguments type="pros" v-bind:issueId="issue._id" v-bind:argsPassed="issue.pros" v-on:childToParent="onArgMessage" :ctrlsShown="argsCtrlsShown" />
            <Arguments type="cons" v-bind:issueId="issue._id" v-bind:argsPassed="issue.cons" v-on:childToParent="onArgMessage" :ctrlsShown="argsCtrlsShown" />
        </div>
    </div>
</template>

<script>
import Arguments from "./Arguments.vue"
import Contenteditable from "./Contenteditable.vue"
import http from "@/http"

export default {
    name: "Issue",

    components: {
        Arguments,
        Contenteditable
    },

    data() {
        return {
           issue: {
               problem: '',
               title: ''
           },
           isNew: true,
           isSaved: true,
           isModified: false,
           isInitialized: false,

           argsCtrlsShown: false,
           switchCtrlsRotateAngle: 0
        };
    },

    props: {
        issuePassed: Object
    },

    watch: {
        issuePassed(newVal) {
            console.log("Issue issuePassed from parent: ", newVal, this)
            // newVal.title += 'gg'
            let issue = Object.assign({}, newVal)
            this.newIssue(issue)
            // console.log('Issue $data.issue.title: ', this.issue.title)
        },

        issue: {
            handler(v0, v1) {
                console.log('Issues watch issue: ', v0, v1, {
                    'isInitialized': this.isInitialized,
                    'isNew': this.isNew,
                    'isSaved': this.isSaved,
                    'isModified': this.isModified
                })
                if (this.isInitialized) {
                    this.isModified = true
                    this.isSaved = false
                } else { // for the first after init delayd watch
                    this.isInitialized = true
                }
            },
            deep: true
        }
    },

    mounted() {
        this.newIssue()
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
            // console.log("Issue onChangeProblem event: ", val)
            this.issue.problem = val
        },

        onChangeTitle(val) {
            // console.log("Issue onChangeTitle event: ", val)
            this.issue.title = val
        },

        switchCtrls(ev) {
            let el = ev.target
            this.switchCtrlsRotateAngle += 360
            let ang = this.switchCtrlsRotateAngle
            el.style = `transform: rotate(${ang}deg); -webkit-transform: rotate(${ang}deg); -ms-transform: rotate(${ang}deg);`
            this.argsCtrlsShown = !this.argsCtrlsShown
        },

        newIssue(val) {
            if (this.isInitialized && !this.isSaved) {
                let ans = confirm('Сохраните предыдущие наработки?')
                if (ans) {
                    return false
                }
            }
            console.log('Issue newIssue: ', val)
            this.isInitialized = false  // we set this true in watch.issue() later
            if (val) {    // passed from other component
                this.issue = val
                this.isNew = false
            } else {        // creating new clean
                this.issue = this.getEmptyIssue()
                this.isNew = true
            }

            this.isModified = false
            this.isSaved = true
        },

        getEmptyIssue() {
            return {
                title: '',
                problem: '',
                pros: [],
                cons: []
            }
        },

        saveIssue() {
            let verb = this.isNew ? 'put' : 'patch'
            let url = this.isNew ? 'issues' : 'issues/' + this.issue._id
            http({
                method: verb,
                url: url,
                data: {
                    issue: this.issue
                }
            }).then(res => {
                console.log(res)
                this.isSaved = true
                // TODO trigger sibling method, IssuesList.loadList()
                this.triggerIssuesListReload()
            }).catch(err => {
                console.log(err)
            })
        },

        triggerIssuesListReload() {
            window.EventBus.$emit('needReloadIssuesList', {})
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .issue {
        position: relative;
    }
    .ctrls-left {
        position: absolute;
        left: 15px;
        top: 5px;
    }
    .ctrls-right {
        position: absolute;
        right: 25px;
        top: 5px;
    }

    .problem {
        padding: 8px;
        font-size: 1em;
        min-height: 2em;
        background-color: #f7f7f7;
        width: 60%;
        margin: 0 auto 5px;
        border-radius: 13px;
    }
    .arguments-wrap {
        position: relative;
        width: 100%;
        display: flex;
    }
    .args-ctrls {
        width: 50px;
        position: absolute;
        left: 50%;
        margin: 19px 0 0 -30px;
    }
    .args-ctrls i,
    .ctrls-right,
    .ctrls-left {
        opacity: 0.7;
        cursor: pointer;
    }
    .args-ctrls .switch-ctrls {
        transition: transform 0.6s linear;
    }

    .arguments-wrap .arguments {
        flex: 50%;
    }

    .title {
        font-size: 2em;
        padding: 3px 8px;
        margin-bottom: 6px;
    }
</style>
