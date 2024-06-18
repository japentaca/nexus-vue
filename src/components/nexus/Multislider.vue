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


  let component = new Nexus.Multislider("#wrapper", {

    numberOfSliders: props.numberOfSliders,
    min: props.min,
    max: props.max,
    step: props.step,
    mode: props.mode,
    size: props.size

  })
  await nextTick()
  component.resize(props.size[0], props.size[1])
  await nextTick()

  component.setAllSliders(props.values)
  component.on("change", (value) => {

    debouncedFn()
  })
  const debouncedFn = useDebounceFn(() => {

    emits("change", component.values)
  }, 50)

})
</script>
