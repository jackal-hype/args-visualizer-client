<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Старт</router-link>
      <router-link to="/issues">Решения</router-link>
      <router-link to="/lyrics">Финиш</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css";
@import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.4em;
  padding: 5px 32px;
  margin: 0 4px;
  text-decoration: none;
  border: 3px solid #2c3e50;
  border-radius: 12px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

p {
  padding: 5px 5px 5px;
}

h3 {
  margin-bottom: 15px;
}

</style>
