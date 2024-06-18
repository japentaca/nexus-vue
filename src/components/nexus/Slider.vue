// basic vue component

<template>
  <div id="wrapper">

  </div>
</template>

<script setup>
import Nexus from 'nexusui'
import { onMounted, defineProps, defineEmits, nextTick } from 'vue'
import { useDebounceFn } from '@vueuse/core'

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


  let component = new Nexus.Slider("#wrapper", {
    size: props.size,

    min: props.min,
    max: props.max,
    step: props.step,

    mode: props.mode

  })

  component.resize(props.size[0], props.size[1])
  await nextTick()
  component.value = props.value
  component.on("change", (value) => {
    debouncedFn()
  })
  const debouncedFn = useDebounceFn(() => {
    //console.log("change", dial.value)
    emits("change", component.value)
  }, 50)
})
</script>
