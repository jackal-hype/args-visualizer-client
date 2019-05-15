<template>
    <div class="arguments">
        <div class="title">{{ title }}</div>
        <input class="typing" v-model="typingArg" placeholder="..." @submit="addArg" />
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
        display: block;
        padding: 8px 30px 20px 20px;
        font-size: 1.5em;
    }
    .title {
        margin-bottom: 8px;
    }
    .typing {
        width: 100%;
        font-size: 1em;
        border-radius: 8px;
        margin-bottom: 10px;
        padding: 3px 11px;

    }
    .typing:focus {
        border-radius: 6px;
        border: 2px solid #6ee;
    }
    ul {
        text-align: right;
        padding: 5px 3px 20px 5px;
        line-height: 1.5em;
    }

</style>
