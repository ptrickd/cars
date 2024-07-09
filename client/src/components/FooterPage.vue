<template>
  <div class="container">
    <vue-divider class="divider" />
    <div class="info">
      <div class="line"><p>2024</p></div>
      <div class="line"><vue-button class="pi pi-github" text></vue-button></div>
      <div class="line"><p>GPLv3</p></div>
    </div>
  </div>
</template>
<style scoped>
.container {
  min-height: 50px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-left: 15%;
  margin-right: 15%;
}
.line {
  display: flex;
  align-items: center;
}
</style>
