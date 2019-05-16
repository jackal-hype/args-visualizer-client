<template>
    <div class="arguments">
        <div :class="colorClassTitle">{{ title }}</div>
        <input class="typing" v-model="typingArg" placeholder="..." v-on:keyup.enter="addArg" />
        <ul>
            <li v-for="(arg, i) in args" :key="i" :style="'font-size: ' + arg.fontSize + 'px;'">
                {{ arg.title }}
                <span class="i-group" :style="{ display: ctrlsDisplay }">
                    <i class="up far fa-thumbs-up" @click="volUp(arg)" />
                    <i class="down far fa-thumbs-down" @click="volDown(arg)" />
                    <i class="rm fas fa-cannabis" @click="rm(arg, i)" />
                </span>
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
            args: [],
            defaultFontSize: 20     // px
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
        },
        ctrlsDisplay() {
            return this.ctrlsShown ? 'inline-block' : 'none'
        }
    },

    props: {
        issueId: String,
        type: String, // pros | cons
        argsPassed: Array,
        ctrlsShown: Boolean
    },
    watch: {
        argsPassed(newVal) {
            this.args = newVal
            this.typingArg = ''
            console.log('Arguments argsPassed from parent: ', newVal)
        }
    },

    methods: {
        addArg() {
            // console.log(this.typingArg, this.args)
            this.args.push({
                title: this.typingArg,
                fontSize: this.defaultFontSize
            })
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
        font-size: 1.5em;
    }
    .pros {
        color: #42b978;
    }
    .cons {
        color: #f34352;
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
        line-height: inherit;
        font-size: 1em;
    }
    li {
        margin-bottom: 0.3em;
    }
    li i {
        margin-left: 3px;
        font-size: 16px;
        opacity: 0.8;
        cursor: pointer;
    }
    .i-group {
        margin-left: 5px;
        white-space: nowrap;
    }

</style>
