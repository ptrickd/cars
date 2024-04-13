<script setup lang="ts">
const brand = 'Toyota'
const model = 'Rav4'
const kms = 165000
</script>

<template>
  <header></header>
  <body>
    <ol>
      <li>Brand: {{ brand }}</li>
      <li>Model: {{ model }}</li>
      <li>Mileage: {{ kms }} km</li>
    </ol>
  </body>
</template>

<style scoped></style>
