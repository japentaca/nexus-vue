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
    numberOfButtons: {
      type: Number,
      default: 4
    },
    active: {
      type: Number,
      default: -1
    }
  })

  onMounted(async () => {
    const component = new Nexus.Radio("#wrapper", {
      size: props.size,
      numberOfButtons: props.numberOfButtons,
      active: props.active
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