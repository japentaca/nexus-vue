// basic vue component

<template>
  <div id="wrapper">

  </div>
</template>

<script setup>
import Nexus from 'nexusui'
import { onMounted, defineProps, defineEmits, nextTick } from 'vue'

const emits = defineEmits(["change"])

const props = defineProps({
  value: {
    type: Number,
    default: 0
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
    type: String, // default: linear
    default: "relative"
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

  let slider = new Nexus.Slider("#wrapper", {
    size: props.size,

    min: props.min,
    max: props.max,
    step: props.step,

    mode: props.mode

  })

  slider.resize(props.size[0], props.size[1])
  await nextTick()
  slider.value = props.value
  slider.on("change", (value) => {
    emits("change", value)
  })
})
</script>
