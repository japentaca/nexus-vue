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
let toggle = null
const props = defineProps({

  state: {
    type: Boolean,
    default: false
  },

  size: {
    type: Array,
    default: () => [75, 75]
  }

})
function flip() {
  if (toggle) {
    toggle.turnOff()
  }
}
function turnOn() {
  if (toggle) {
    toggle.turnOn()
  }
}
//const dial = ref(null)
onMounted(async () => {
  if (!wrapper.value) {
    return
  }


  toggle = new Nexus.Toggle(wrapper.value, {
    state: props.state,
    size: props.size

  })

  toggle.resize(props.size[0], props.size[1])
  await nextTick()
  toggle.on("change", (value) => {
    emits("change", value)
  })
})

onUnmounted(() => {
  if (toggle && typeof toggle.destroy === 'function') {
    toggle.destroy()
  }
})

defineExpose({
  flip,
  turnOn
})
</script>

