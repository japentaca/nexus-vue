<template>
  <div id="wrapper"></div>
</template>

<script setup>
  import Nexus from 'nexusui'
  import { onMounted, defineProps, nextTick, ref, defineExpose } from 'vue'

  const props = defineProps({
    size: {
      type: Array,
      default: () => [30, 100]
    }
  })

  const meter = ref(null)

  onMounted(async () => {
    meter.value = new Nexus.Meter("#wrapper", {
      size: props.size
    })

    await nextTick()
    meter.value.resize(props.size[0], props.size[1])
    await nextTick()
  })

  defineExpose({ meter })
</script>