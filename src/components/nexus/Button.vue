// basic vue component

<template>
  <div id="wrapper">

  </div>
</template>

<script setup>
import Nexus from 'nexusui'
import { onMounted, defineProps, defineEmits, nextTick } from 'vue'

const emits = defineEmits(["change"])
let button
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
    default: [75, 75]
  }

})
function turnOff() {
  button.turnOff()
}
function turnOn() {
  button.turnOn()
}
//const dial = ref(null)
onMounted(async () => {
  //console.log(Dial)
  console.log(props.mode)

  button = new Nexus.Button("#wrapper", {
    state: props.state,
    mode: props.mode,
    size: props.size,
    mode: props.mode

  })

  button.resize(props.size[0], props.size[1])
  await nextTick()
  button.value = props.value
  button.on("change", (value) => {
    emits("change", value)
  })
})
defineExpose({
  turnOff,
  turnOn
})
</script>
