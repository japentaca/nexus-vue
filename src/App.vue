<template>
  <div class="wrapper">
    <div class="sevensegment">
      {{ lahora }}


      <Toggle @change="onChange" :size="button_size" />

      <Button @change="onChange" mode="toggle" :size="button_size" />
      <Multislider @change="onChange" :values="multiSlider_values" :numberOfSliders="5" :size="multislider_size" />
      <Piano ref="piano" lowNote="24" highNote="96" @change="onChange" :size="piano_size" />
      <Slider @change="onChange" :size="slider_size" />
      <Dial @change="onChange" value="50" :size="dial_size" />

    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import Dial from "./components/nexus/Dial.vue"
import Slider from "./components/nexus/Slider.vue"
import Multislider from "./components/nexus/Multislider.vue"
import Piano from "./components/nexus/Piano.vue"
import Button from "./components/nexus/Button.vue"
import Toggle from "./components/nexus/Toggle.vue"


const lahora = ref(0)
setInterval(() => {
  lahora.value = new Date().toLocaleTimeString()
}, 1000)
const sd = ref(null)


//segmentDisplay.pattern="########"
//segmentDisplay.segmentCount= 16



let piano_size = [600, 100]
let dial_size = [200, 200]
let button_size = [30, 30]
let slider_size = [100, 30]
let multislider_size = [280, 130]
let multiSlider_values = [10, 20, 30, 40, 50]
const piano = ref(null)


const onChange = (value) => {
  console.log(value)
}

</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/seven-segment');


.wrapper {

  width: 100vw;
  height: 100vh;
  background-color: rgb(132, 132, 132);
  display: flex;




}

.sevensegment {
  font-family: 'Seven Segment';
  font-size: 50px;
  color: rgb(0, 149, 162);
  background-color: rgb(154, 154, 154);
}
</style>
