<script setup>

</script>

<template>

  <Button @change="onChange" mode="toggle" :size="button_size" />

  <!--
 <Multislider @change="onChange" :values="multiSlider_values" :numberOfSliders="5" :size="multislider_size" />
<Piano ref="piano" @change="onChange" :size="piano_size" />
  <Slider @change="onChange" :size="Slider_size" />

  <Dial @change="onChange" :size="dial_size" />
-->


</template>

<script setup>

import { ref } from 'vue'
import Dial from "./components/nexus/Dial.vue"
import Slider from "./components/nexus/Slider.vue"
import Multislider from "./components/nexus/Multislider.vue"
import Piano from "./components/nexus/Piano.vue"
import Button from "./components/nexus/Button.vue"  
let piano_size = [600, 100]
let dial_size = [200, 200]
let button_size = [160, 160]
let slider_size = [30, 10]
let multislider_size = [280, 130]
let multiSlider_values=[10,20,30,40,50]
const piano=ref(null)


const onChange = (value) => {
  console.log(value)
}

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
