<template>
    <div class="issues">
        <div class="col-left">
            <IssuesList title="Недавние Решения" v-on:issueSelected="loadIssue" />
        </div>
        <div class="main">
            <Issue v-bind:issuePassed="currentIssue" />
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import IssuesList from "@/components/IssuesList.vue";
import Issue from "@/components/Issue.vue";

export default {
    name: "issues",

    components: {
        Issue,
        IssuesList
    },

    data() {
        return {
            currentIssue: {}
        }
    },

    methods: {
        loadIssue(issue) {
            console.log('from IssueList: ', issue)
            this.currentIssue = issue
        }
    }
};
</script>

<style scoped>
.issues {
    padding: 10px 50px;
}
.col-left {
    float: left;
    width: 250px;
    padding: 20px 3px;
}
.main {
    padding: 10px 10px 10px;
    margin: 0 0 0 260px;
}
</style>