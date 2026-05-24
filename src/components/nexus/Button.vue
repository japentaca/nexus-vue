// basic vue component

<template>
  <div ref="wrapper">

  </div>
</template>

<script setup>
import Nexus from 'nexusui'
import { onMounted, onUnmounted, ref, nextTick } from 'vue'

const emits = defineEmits(["change"])
const wrapper = ref(null)
let button = null
const props = defineProps({
  mode: {
    type: String, //  "button", "aftertouch", "impulse", or "toggle"
    default: "button"
  },
  state: {
    type: Boolean,
    default: false
  },

  size: {
    type: Array,
    default: () => [75, 75]
  }

})
function turnOff() {
  if (button) {
    button.turnOff()
  }
}
function turnOn() {
  if (button) {
    button.turnOn()
  }
}
//const dial = ref(null)
onMounted(async () => {
  if (!wrapper.value) {
    return
  }

  button = new Nexus.Button(wrapper.value, {
    state: props.state,
    mode: props.mode,
    size: props.size

  })

  button.resize(props.size[0], props.size[1])
  await nextTick()
  button.on("change", (value) => {
    emits("change", value)
  })
})

onUnmounted(() => {
  if (button && typeof button.destroy === 'function') {
    button.destroy()
  }
})

defineExpose({
  turnOff,
  turnOn
})
</script>

