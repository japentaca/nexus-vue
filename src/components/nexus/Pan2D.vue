<template>
  <div ref="wrapper"></div>
</template>

<script setup>
  import Nexus from 'nexusui'
  import { onMounted, onUnmounted, ref, nextTick } from 'vue'
  import { useDebounceFn } from '@vueuse/core'

  const emits = defineEmits(["change"])
  const wrapper = ref(null)
  let component = null

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
    if (!wrapper.value) {
      return
    }

    component = new Nexus.Pan2D(wrapper.value, {
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
    // Verificar si el componente tiene el método resize antes de llamarlo
    if (component.resize && typeof component.resize === 'function') {
      component.resize(props.size[0], props.size[1])
    }
    await nextTick()

    // Verificar si el componente tiene el método on antes de llamarlo
    if (component.on && typeof component.on === 'function') {
      component.on("change", (value) => {
        debouncedFn(value)
      })
    }

    const debouncedFn = useDebounceFn((value) => {
      emits("change", value)
    }, 50)
  })

  onUnmounted(() => {
    if (component && typeof component.destroy === 'function') {
      component.destroy()
    }
  })
</script>
