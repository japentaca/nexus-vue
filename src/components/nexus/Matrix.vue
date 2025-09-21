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
      default: () => [200, 200]
    },
    rows: {
      type: Number,
      default: 5
    },
    columns: {
      type: Number,
      default: 10
    },
    mode: {
      type: String,
      default: 'toggle'
    }
  })

  onMounted(async () => {
    const component = new Nexus.Matrix("#wrapper", {
      size: props.size,
      rows: props.rows,
      columns: props.columns,
      mode: props.mode
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