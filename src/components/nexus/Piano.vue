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
let piano = null
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
    default: () => [75, 75]
  }

})
function toggleKey(key, value) {
  if (piano) {
    piano.toggleKey(key, value)
  }
}
//const dial = ref(null)
onMounted(async () => {
  if (!wrapper.value) {
    return
  }

  piano = new Nexus.Piano(wrapper.value, {
    lowNote: props.lowNote,
    highNote: props.highNote,
    mode: props.mode,
    size: props.size

  })

  piano.resize(props.size[0], props.size[1])
  await nextTick()
  piano.on("change", (value) => {
    emits("change", value)
  })
})

onUnmounted(() => {
  if (piano && typeof piano.destroy === 'function') {
    piano.destroy()
  }
})

defineExpose({
  toggleKey
})
</script>

