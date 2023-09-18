<template>
  <div class="page">
    <BreadCrumbs class="page__breadcrumbs sb-container"
      v-if="breadcrumbsPageName && breadcrumbsRoutes"
      :routes="breadcrumbsRoutes"
      :page-name="breadcrumbsPageName"
      :sliced="breadcrumbsSliced"
    />
    <div class="page__sections">
      <slot />
    </div>
  </div>
</template>

<script>
import BreadCrumbs from '~/components/Navigation/BreadCrumbs.vue';

export default {
    name: "Page",
    props: {
      page: {
        type: Object
      },
      breadcrumbsRoutes: {
        type: Array
      },
      breadcrumbsPageName: {
        type: String
      },
      breadcrumbsSliced: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
        const routePath = this.$route.name;
        this.$nuxt.$emit("page-path-name", routePath);
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
