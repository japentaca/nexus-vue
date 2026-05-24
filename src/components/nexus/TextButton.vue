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
      default: () => [150, 50]
    },
    state: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'Play'
    },
    alternateText: {
      type: String,
      default: ''
    }
  })

  onMounted(async () => {
    if (!wrapper.value) {
      return
    }

    component = new Nexus.TextButton(wrapper.value, {
      size: props.size,
      state: props.state,
      text: props.text,
      alternateText: props.alternateText
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
