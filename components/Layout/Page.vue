<template>
  <div class="page">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Page",
  mounted() {
    const routePath = this.$route.name;
    this.$nuxt.$emit('pagePathName', routePath);
  },
}
</script>
