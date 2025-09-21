<template>
  <div id="wrapper"></div>
</template>

<script setup>
  import Nexus from 'nexusui'
  import { onMounted, defineProps, defineEmits, nextTick } from 'vue'
  import { useDebounceFn } from '@vueuse/core'

  const emits = defineEmits(["change"])

  const props = defineProps({
    size: {
      type: Array,
      default: () => [120, 25]
    },
    mode: {
      type: String,
      default: 'absolute'
    },
    min: {
      type: Number,
      default: -1
    },
    max: {
      type: Number,
      default: 1
    },
    step: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    }
  })

  onMounted(async () => {
    const component = new Nexus.Pan("#wrapper", {
      size: props.size,
      mode: props.mode,
      min: props.min,
      max: props.max,
      step: props.step,
      value: props.value
    })

    await nextTick()
    component.resize(props.size[0], props.size[1])
    await nextTick()

    component.on("change", (value) => {
      debouncedFn(value)
    })

    const debouncedFn = useDebounceFn((value) => {
      emits("change", value)
    }, 50)
  })
</script>