<script setup lang="ts">
interface IProps {
  item: { id: number; name: string; interval: number; unit: string }
}
const props = defineProps<IProps>()
</script>

<template>
  <ul>
    <li>{{ props.item.name }}</li>
    <li>{{ props.item.interval }} {{ props.item.unit.toLowerCase() }}</li>
  </ul>
</template>
<style scoped></style>
