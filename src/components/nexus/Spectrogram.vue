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
  const spectrogram = ref(null)

  onMounted(async () => {
    if (!wrapper.value) {
      return
    }

    spectrogram.value = new Nexus.Spectrogram(wrapper.value, {
      size: props.size
    })

    await nextTick()
    spectrogram.value.resize(props.size[0], props.size[1])
    await nextTick()
  })

  onUnmounted(() => {
    if (spectrogram.value && typeof spectrogram.value.destroy === 'function') {
      spectrogram.value.destroy()
    }
  })

  defineExpose({ spectrogram })
</script>
