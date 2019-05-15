<template>
    <div class="issues">
        <h3 class="title" v-if="issues.length < 1">{{ title }}</h3>
        <ul class="menu">
            <li class="issues-list" v-for="(issue, i) in issues" :key="i">
                <a href="javascript:0" v-on:click="showIssue(i)">{{ issue.title }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import http from '@/http'

export default {
    name: 'IssuesList',

    data() {
        return {
            issues: []
        }
    },

    props: [
        'title'
    ],

    created() {
        this.loadList()
    },

    methods: {
        async loadList() {
            http.get('issues', {
                sort: 'createdAt:desc',
                limit: 10,
                offset: 0
            }).then(res => {
                //console.log(res)
                this.issues = res.data
                if (this.issues.length > 0) {
                    this.showIssue(0)
                }
            }).catch(err => {
                console.log(err)
            })
        },

        showIssue(i) {
            let issue = this.issues[i]
            console.log('IssuesList showIssue(): ', JSON.stringify(issue))
            this.$emit('issueSelected', issue)
        }
    }
}
</script>

<style scoped>
    li {
        margin-bottom: 5px;
        font-size: 1em;
        line-height: 1.2em;
        padding: 3px;
    }
    li a:hover {
        cursor: pointer;
        font-size: 1.05em;
    }
    li a:hover {
        color: #43bb43;
    }
</style>