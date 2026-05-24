<template>
  <div ref="wrapper"></div>
</template>

<script setup>
  import Nexus from 'nexusui'
  import { onMounted, onUnmounted, nextTick, ref } from 'vue'

  const props = defineProps({
    size: {
      type: Array,
      default: () => [300, 150]
    }
  })

  const wrapper = ref(null)
  const oscilloscope = ref(null)

  onMounted(async () => {
    if (!wrapper.value) {
      return
    }

    oscilloscope.value = new Nexus.Oscilloscope(wrapper.value, {
      size: props.size
    })

    await nextTick()
    oscilloscope.value.resize(props.size[0], props.size[1])
    await nextTick()
  })

  onUnmounted(() => {
    if (oscilloscope.value && typeof oscilloscope.value.destroy === 'function') {
      oscilloscope.value.destroy()
    }
  })

  defineExpose({ oscilloscope })
</script>
