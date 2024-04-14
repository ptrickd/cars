<script setup lang="ts">
interface IProps {
  item: { id: number; name: string; interval: number; unit: string }
}
const props = defineProps<IProps>()
console.log(props.item.name)
</script>

<template>
  <div>
    <li>{{ props.item.name }}</li>
    <li>{{ props.item.interval }} {{ props.item.unit }}</li>
  </div>
</template>
