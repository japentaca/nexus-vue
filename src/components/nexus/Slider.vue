// basic vue component

<template>
  <div ref="wrapper">

  </div>
</template>

<script setup>
import Nexus from 'nexusui'
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const emits = defineEmits(["change", "update:modelValue"])
const wrapper = ref(null)
let component = null

const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined
  },
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
    default: () => [75, 75]
  }
})
//const dial = ref(null)
onMounted(async () => {
  if (!wrapper.value) {
    return
  }


  component = new Nexus.Slider(wrapper.value, {
    size: props.size,

    min: props.min,
    max: props.max,
    step: props.step,

    mode: props.mode

  })

  // Verificar si el componente tiene el método resize antes de llamarlo
  if (component.resize && typeof component.resize === 'function') {
    component.resize(props.size[0], props.size[1])
  }
  await nextTick()
  const initialValue = props.modelValue ?? props.value
  component.value = initialValue
  // Verificar si el componente tiene el método on antes de llamarlo
  if (component.on && typeof component.on === 'function') {
    component.on("change", (value) => {
      debouncedFn()
    })
  }
  const debouncedFn = useDebounceFn(() => {
    //console.log("change", dial.value)
    emits("change", component.value)
    emits("update:modelValue", component.value)
  }, 50)
})

watch(() => props.modelValue, (value) => {
  if (!component || typeof value !== 'number') {
    return
  }

  if (component.value !== value) {
    component.value = value
  }
})

onUnmounted(() => {
  if (component && typeof component.destroy === 'function') {
    component.destroy()
  }
})
</script>

