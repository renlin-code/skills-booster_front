<template>
  <div class="page">
    <div class="page__sections">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Page",
  mounted() {
    const routePath = this.$route.name;
    this.$nuxt.$emit("pagePathName", routePath);
  },
};
</script>

<style scoped lang="scss">
.page {
  &__sections {
    display: flex;
    flex-direction: column;
    gap: 80rem;
    margin: 40rem 0 80rem;
    @media screen and (max-width: $brakepoint) {
      gap: 40rem;
      margin: 30rem 0 40rem;
    }
  }
}
</style>
