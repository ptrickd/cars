<template>
  <div class="container">
    <v-panel class="panel"
      ><h1>About Cars</h1>
      <div class="grid-layout">
        <div class="version">
          <h4>Version: {{ version }}</h4>
        </div>
        <!-- <div>date of last update</div> -->
        <div class="license"><h4>License: GPL-3.0</h4></div>
        <div class="description">
          <p>{{ description }}</p>
        </div>

        <div class="website">
          <h4>Website: <a href="https://github.com/ptrickd/cars">Github</a></h4>
        </div>
        <div class="icon">
          <v-image src="/favicon.svg" alt="Icon of car app" width="150" />
        </div>
      </div>
    </v-panel>
  </div>
</template>

<style scoped lang="css">
h1 {
  text-align: center;
}

p {
  text-align: center;
}

.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.panel {
  max-height: calc(80vh-120px);
  max-width: 700px;
  margin-top: 2rem;
  padding: 1.5rem 1.5rem;
}

.grid-layout {
  display: grid;
  grid-template-areas:
    'icon version license'
    'icon description description'
    'icon website .';
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
}

.version {
  grid-area: version;
  text-align: center;
}

.license {
  grid-area: license;
  text-align: center;
}

.description {
  grid-area: description;
  padding: 1rem;
  text-align: center;
}

.website {
  grid-area: website;
  text-align: center;
}

.icon {
  grid-area: icon;
  display: flex;
  @media (max-width: 360px) {
    display: none;
  }
}
</style>

<script setup lang="ts">
import { version } from '../../package.json'

const description =
  'Car is an app to track the regular maintenances and repairs\
   made on your vehicle. It is free and open source.'
</script>
