<template>
  <div id="wrapper">
  </div>

</template>

<script setup>
import Nexus from 'nexusui'
import { onMounted, defineProps, defineEmits, nextTick } from 'vue'

const emits = defineEmits(["change"])

const props = defineProps({
  values: {
    type: Array,
    default: [0, 0, 0, 0, 0]
  },
  numberOfSliders: {
    type: Number,
    default: 8
  },
  min: {
    type: Number, // default: 0
    default: 0
  },
  max: {
    type: Number, // default: 100
    default: 100
  },
  step: {
    type: Number, // default: 1
    default: 1
  },

  mode: {
    type: String, // default: bar or line
    default: "bar"
  }
  ,
  size: {
    type: Array,
    default: [75, 75]
  }
})
//const dial = ref(null)
onMounted(async () => {
  //console.log(Dial)
  console.log(props.size)

  let multiSlider = new Nexus.Multislider("#wrapper", {

    numberOfSliders: props.numberOfSliders,
    min: props.min,
    max: props.max,
    step: props.step,
    mode: props.mode,
    size: props.size

  })
  await nextTick()
  multiSlider.resize(props.size[0], props.size[1])
  await nextTick()
  console.log("values", props.values)
  multiSlider.setAllSliders(props.values)
  multiSlider.on("change", (value) => {
    emits("change", value)
  })
})
</script>
