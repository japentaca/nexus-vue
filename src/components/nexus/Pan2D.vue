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
      default: () => [100, 100]
    },
    mode: {
      type: String,
      default: 'absolute'
    },
    minX: {
      type: Number,
      default: -1
    },
    maxX: {
      type: Number,
      default: 1
    },
    minY: {
      type: Number,
      default: -1
    },
    maxY: {
      type: Number,
      default: 1
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  })

  onMounted(async () => {
    const component = new Nexus.Pan2D("#wrapper", {
      size: props.size,
      mode: props.mode,
      minX: props.minX,
      maxX: props.maxX,
      minY: props.minY,
      maxY: props.maxY,
      x: props.x,
      y: props.y
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