<template>
    <div class="arguments">
        <div class="title">{{ title }}</div>
        <input v-model="typingArg" placeholder="например..." @submit="addArg" />
        <ul>
            <li v-for="(arg, i) in args" :key="i">{{ arg.title }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Arguments',

    data() {
        return {
            typingArg: '',
            args: []
        }
    },

    computed: {
        title() {
            return (this.type == 'pros') ? 'За' : 'Против'
        }
    },

    props: {
        issueId: String,
        type: String, // pros | cons
        argsPassed: Array
    },
    watch: {
        argsPassed(newVal) {
            this.args = newVal
            this.typingArg = ''
            console.log('Arguments argsPassed from parent: ', newVal)
        }
    },

    methods: {
        addArg(val) {
            this.args.push(val)
            this.emitToParent()
        },

        emitToParent() {
            this.$emit('ChildToParent', {type: this.type, args: this.args})
        }
    }
}
</script>

<style scoped>
    .arguments {
        width: 50%;
        display: block;
    }
</style>
