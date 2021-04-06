<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
body {
  margin: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>