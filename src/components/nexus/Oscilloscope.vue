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

  const oscilloscope = ref(null)

  onMounted(async () => {
    oscilloscope.value = new Nexus.Oscilloscope("#wrapper", {
      size: props.size
    })

    await nextTick()
    oscilloscope.value.resize(props.size[0], props.size[1])
    await nextTick()
  })

  defineExpose({ oscilloscope })
</script>