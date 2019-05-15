<template>
    <div contenteditable="true" @input="update" :placeholder="placeholder"></div>
</template>

<script>
export default {
    name: "Contenteditable",

    props: [
        "content",
        "placeholder"
    ],
    watch: {
        content(newVal) {
            // console.log('Contenteditable watch: ', newVal, oldVal)
            this.setContent(newVal)
        }
    },

    mounted() {
        // this.$el.innerText = this.content
        this.setContent(this.content)
    },

    methods: {
        update(event) {
            this.$emit("update", event.target.innerText)
        },

        setContent(val) {
            // console.log('Contenteditable setContent: ', val)
            if (document.activeElement == this.$el) {
                return // do not reset cursor
            }
            this.$el.innerText = val
        }
    }
};
</script>

<style>
    [contenteditable]:empty:not(:focus)::before {
        opacity: 0.3;
        color: #a5a5a5;
        content: attr(placeholder);
    }
</style>