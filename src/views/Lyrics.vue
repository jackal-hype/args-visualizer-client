<template>
    <div class="lyrics">
        <h1>В данном видео:</h1>
        <ul class="lyrics-list">
            <li>Приложение для принятия Решений</li>
            <li>
                Исходный код:
                <strong>node.js, express, mongodb, vue.js</strong>
            </li>
            <li>Пара слов о развитии проектов</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Lyrics"
};
</script>

<style scoped>
.lyrics {
    text-align: left;
    width: 800px;
    margin: 20px auto 50px;
    padding-left: 165px;
}
h1 {
    margin-bottom: 20px;
    padding-left: 60px;
}

li {
    font-size: 1.5em;
    line-height: 1.6em;
}

li:before {
    content: "\2014 ";
}
</style>