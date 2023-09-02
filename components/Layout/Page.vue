<template>
  <div class="page">
    <BreadCrumbs class="page__breadcrumbs sb-container" />
    <div class="page__sections">
      <slot />
    </div>
  </div>
</template>

<script>
import BreadCrumbs from '../Others/BreadCrumbs.vue';

export default {
    name: "Page",
    mounted() {
        const routePath = this.$route.name;
        this.$nuxt.$emit("pagePathName", routePath);
    },
    components: { BreadCrumbs }
};
</script>

<style scoped lang="scss">
.page {
  &__breadcrumbs {
    margin-top: 20rem;
    @media screen and (max-width: $brakepoint) {
      margin-top: 12rem;
    }
  }
  &__sections {
    display: flex;
    flex-direction: column;
    gap: 80rem;
    margin: 40rem 0 80rem;
    @media screen and (max-width: $brakepoint) {
      gap: 40rem;
      margin: 24rem 0 40rem;
    }
  }
}
</style>
