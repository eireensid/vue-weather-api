<template>
  <div id="app">
    <img class="logo" alt="Vue logo" src="./assets/logo.png">
    <Weather />
  </div>
</template>

<script>
import Weather from './components/Weather.vue'

export default {
  name: 'app',
  components: {
    Weather
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  max-width: 150px;
}
</style>

// Задание: требуется сделать веб-форму отображения средней температуры за день и типа погоды (иконки погоды)
// на следующие 3 дня в Ростове-на-Дону, используя данные API OpenWeatherMap. В работе хочется видеть Bootstrap,
// CSS, JS. Готовый код залить на GitHub. Если есть желание использовать какой-то js-фреймворк, например Vue.JS
// – только приветствуется.
