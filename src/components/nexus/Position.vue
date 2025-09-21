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
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    minX: {
      type: Number,
      default: 0
    },
    maxX: {
      type: Number,
      default: 1
    },
    minY: {
      type: Number,
      default: 0
    },
    maxY: {
      type: Number,
      default: 1
    }
  })

  onMounted(async () => {
    const component = new Nexus.Position("#wrapper", {
      size: props.size,
      mode: props.mode,
      x: props.x,
      y: props.y,
      minX: props.minX,
      maxX: props.maxX,
      minY: props.minY,
      maxY: props.maxY
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