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
      <Envelope @change="onChange" :points="[{ x: 0.1, y: 0 }, { x: 0.2, y: 1 }, { x: 0.5, y: 0.5 }, { x: 1, y: 0 }]"
        :size="[300, 150]" :duration="1" :loop="false" :noNewPoints="true" />
      <Position @change="onChange" :size="[200, 200]" />
      <Number @change="onChange" :size="[100, 50]" />
      <Pan @change="onChange" :size="[200, 50]" />
      <Pan2D @change="onChange" :size="[200, 200]" />
      <Radio @change="onChange" :size="[200, 50]" :numberOfButtons="4" />
      <Select @change="onChange" :size="[200, 50]" :options="['Option1', 'Option2', 'Option3']" />
      <Matrix @change="onChange" :size="[200, 200]" :rows="5" :columns="5" />
      <Tilt @change="onChange" :size="[200, 50]" />
      <Meter :size="[30, 100]" />
      <Oscilloscope :size="[300, 150]" />
      <Sequencer @change="onChange" @step="onChange" :size="[400, 200]" :rows="5" :columns="10" />
      <Spectrogram :size="[300, 150]" />
      <TextButton @change="onChange" :size="[150, 50]" text="Play" alternateText="Stop" />
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
  import Envelope from "./components/nexus/Envelope.vue"
  import Position from "./components/nexus/Position.vue"
  import Number from "./components/nexus/Number.vue"
  import Pan from "./components/nexus/Pan.vue"
  import Pan2D from "./components/nexus/Pan2D.vue"
  import Radio from "./components/nexus/Radio.vue"
  import Select from "./components/nexus/Select.vue"
  import Matrix from "./components/nexus/Matrix.vue"
  import Tilt from "./components/nexus/Tilt.vue"
  import Meter from "./components/nexus/Meter.vue"
  import Oscilloscope from "./components/nexus/Oscilloscope.vue"
  import Sequencer from "./components/nexus/Sequencer.vue"
  import Spectrogram from "./components/nexus/Spectrogram.vue"
  import TextButton from "./components/nexus/TextButton.vue"


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
