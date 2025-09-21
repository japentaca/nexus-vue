<template>
  <div id="wrapper"></div>
</template>

<script setup>
  import Nexus from 'nexusui'
  import { onMounted, defineProps, defineEmits, nextTick } from 'vue'
  import { useDebounceFn } from '@vueuse/core'

  const emits = defineEmits(["change", "step"])

  const props = defineProps({
    size: {
      type: Array,
      default: () => [400, 200]
    },
    mode: {
      type: String,
      default: 'toggle'
    },
    rows: {
      type: Number,
      default: 5
    },
    columns: {
      type: Number,
      default: 10
    }
  })

  onMounted(async () => {
    const component = new Nexus.Sequencer("#wrapper", {
      size: props.size,
      mode: props.mode,
      rows: props.rows,
      columns: props.columns
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
        debouncedChange(value)
      })

      component.on("step", (value) => {
        debouncedStep(value)
      })
    }

    const debouncedChange = useDebounceFn((value) => {
      emits("change", value)
    }, 50)

    const debouncedStep = useDebounceFn((value) => {
      emits("step", value)
    }, 50)
  })
</script>