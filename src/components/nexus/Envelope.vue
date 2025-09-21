<template>
  <div id="wrapper"></div>
</template>

<script setup>
  import Nexus from 'nexusui'
  import { onMounted, defineProps, defineEmits, nextTick } from 'vue'
  import { useDebounceFn } from '@vueuse/core'

  const emits = defineEmits(["change"])

  const props = defineProps({
    points: {
      type: Array,
      default: () => [
        [0, 0],
        [0.2, 1],
        [0.5, 0.5],
        [1, 0]
      ] // Default envelope points
    },
    size: {
      type: Array,
      default: () => [300, 150] // Default size of the envelope component
    },
    duration: {
      type: Number,
      default: 1 // Default duration of the envelope
    },
    loop: {
      type: Boolean,
      default: false // Whether the envelope should loop
    },
    noNewPoints: {
      type: Boolean,
      default: false // Whether to allow new points to be added
    }
  })

  onMounted(async () => {
    const component = new Nexus.Envelope("#wrapper", {
      size: props.size,
      points: props.points,
      duration: props.duration,
      loop: props.loop,
      noNewPoints: props.noNewPoints
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
</script>