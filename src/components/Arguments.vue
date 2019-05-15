<template>
    <div class="arguments">
        <div :class="colorClassTitle">{{ title }}</div>
        <input class="typing" v-model="typingArg" placeholder="..." @submit="addArg" />
        <ul>
            <li v-for="(arg, i) in args" :key="i" :style="'font-size: ' + arg.fontSize + 'px;'">
                {{ arg.title }}<i class="up far fa-thumbs-up" @click="volUp(arg)" />
                <i class="down far fa-thumbs-down" @click="volDown(arg)" />
                <i class="fas fa-cannabis" @click="rm(arg, i)" />
            </li>
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
        },
        colorClass() {
            return (this.type == 'pros') ? 'pros' : 'cons'
        },
        colorClassTitle() {
            return this.colorClass + ' title'
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
        },

        volUp(item) {
            item.fontSize = 1.1 * item.fontSize
        },

        volDown(item) {
            item.fontSize = 0.9 * item.fontSize
        },

        rm(item, i) {
            console.log(item, this.args)
            this.args.splice(i, 1)
        }
    }
}
</script>

<style scoped>
    .arguments {
        display: block;
        padding: 8px 30px 20px 20px;
        font-size: 20px;
    }
    .title {
        margin-bottom: 8px;
        font-size: 1.3em;
    }
    .pros {
        color: #8b8;
    }
    .cons {
        color: #f45;
    }
    .typing {
        width: 100%;
        font-size: 1em;
        border-radius: 8px;
        margin-bottom: 10px;
        padding: 3px 11px;

    }
    .typing:focus {
        border-radius: 8px;
        border: none;
        padding: 5px 11px;
    }
    ul {
        text-align: right;
        padding: 5px 0px 20px 5px;
        line-height: 1.8em;
        font-size: 1em;
    }
    li i {
        margin-left: 7px;
        font-size: 16px;
        opacity: 0.8;
        cursor: pointer;
    }

</style>
