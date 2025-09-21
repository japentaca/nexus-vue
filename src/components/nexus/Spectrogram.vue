<template>
  <div id="wrapper"></div>
</template>

<script setup>
  import Nexus from 'nexusui'
  import { onMounted, defineProps, nextTick, ref, defineExpose } from 'vue'

  const props = defineProps({
    size: {
      type: Array,
      default: () => [300, 150]
    }
  })

  const spectrogram = ref(null)

  onMounted(async () => {
    spectrogram.value = new Nexus.Spectrogram("#wrapper", {
      size: props.size
    })

    await nextTick()
    spectrogram.value.resize(props.size[0], props.size[1])
    await nextTick()
  })

  defineExpose({ spectrogram })
</script>