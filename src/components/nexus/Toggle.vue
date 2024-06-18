// basic vue component

<template>
  <div id="wrapper">
  </div>
</template>

<script setup>
import Nexus from 'nexusui'
import { onMounted, defineProps, defineEmits, nextTick } from 'vue'

const emits = defineEmits(["change"])
let toggle
const props = defineProps({

  state: {
    type: Boolean,
    default: false
  },

  size: {
    type: Array,
    default: [75, 75]
  }

})
function flip() {
  toggle.turnOff()
}
function turnOn() {
  toggle.turnOn()
}
//const dial = ref(null)
onMounted(async () => {


  toggle = new Nexus.Toggle("#wrapper", {
    state: props.state,
    size: props.size,

  })

  toggle.resize(props.size[0], props.size[1])
  await nextTick()
  toggle.value = props.value
  toggle.on("change", (value) => {
    emits("change", value)
  })
})
defineExpose({
  flip
})
</script>
