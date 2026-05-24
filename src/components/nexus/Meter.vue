<template>
  <div ref="wrapper"></div>
</template>

<script setup>
  import Nexus from 'nexusui'
  import { onMounted, onUnmounted, nextTick, ref } from 'vue'

  const props = defineProps({
    size: {
      type: Array,
      default: () => [30, 100]
    }
  })

  const wrapper = ref(null)
  const meter = ref(null)

  onMounted(async () => {
    if (!wrapper.value) {
      return
    }

    meter.value = new Nexus.Meter(wrapper.value, {
      size: props.size
    })

    await nextTick()
    meter.value.resize(props.size[0], props.size[1])
    await nextTick()
  })

  onUnmounted(() => {
    if (meter.value && typeof meter.value.destroy === 'function') {
      meter.value.destroy()
    }
  })

  defineExpose({ meter })
</script>
