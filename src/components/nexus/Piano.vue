// basic vue component

<template>
  <div id="wrapper">

  </div>
</template>

<script setup>
import Nexus from 'nexusui'
import { onMounted, defineProps, defineEmits, nextTick } from 'vue'

const emits = defineEmits(["change"])
let piano
const props = defineProps({
  mode: {
    type: String, //  button,toggle,impulse
    default: "button"
  },
  lowNote: {
    type: Number,
    default: 0
  },
  highNote: {
    type: Number,
    default: 127
  },
  size: {
    type: Array,
    default: [75, 75]
  }

})
function toggleKey(key, value) {

  piano.toggleKey(key, value)
}
//const dial = ref(null)
onMounted(async () => {

  piano = new Nexus.Piano("#wrapper", {
    lowNote: props.lowNote,
    highNote: props.highNote,
    mode: props.mode,
    size: props.size,
    mode: props.mode

  })

  piano.resize(props.size[0], props.size[1])
  await nextTick()
  piano.value = props.value
  piano.on("change", (value) => {
    emits("change", value)
  })
})
defineExpose({
  toggleKey
})
</script>
