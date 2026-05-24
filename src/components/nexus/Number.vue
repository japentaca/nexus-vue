<template>
  <div ref="wrapper"></div>
</template>

<script setup>
  import Nexus from 'nexusui'
  import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
  import { useDebounceFn } from '@vueuse/core'

  const emits = defineEmits(["change", "update:modelValue"])
  const wrapper = ref(null)
  let component = null

  const props = defineProps({
    size: {
      type: Array,
      default: () => [60, 30]
    },
    value: {
      type: Number,
      default: 0
    },
    modelValue: {
      type: Number,
      default: undefined
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10000
    },
    step: {
      type: Number,
      default: 1
    }
  })

  onMounted(async () => {
    if (!wrapper.value) {
      return
    }

    component = new Nexus.Number(wrapper.value, {
      size: props.size,
      value: props.modelValue ?? props.value,
      min: props.min,
      max: props.max,
      step: props.step
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
      emits("update:modelValue", value)
    }, 50)
  })

  watch(() => props.modelValue, (value) => {
    if (!component || typeof value !== 'number') {
      return
    }

    if (component.value !== value) {
      component.value = value
    }
  })

  onUnmounted(() => {
    if (component && typeof component.destroy === 'function') {
      component.destroy()
    }
  })
</script>
