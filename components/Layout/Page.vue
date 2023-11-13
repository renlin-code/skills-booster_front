<template>
  <div class="page">
    <BreadCrumbs
      class="page__breadcrumbs sb-container"
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
import BreadCrumbs from "~/components/Navigation/BreadCrumbs.vue";

export default {
  name: "Page",
  components: { BreadCrumbs },
  head() {
    const headJson = this.page.yoast_head_json;

    const metaArray = [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      },
      {
        name: "robots",
        content: "noindex, nofollow",
      },
      { name: "format-detection", content: "telephone=no" },
      { name: "google", content: "notranslate" },

      {
        name: "description",
        content: headJson.description,
      },

      //OPEN GRAPH TAGS
      {
        property: "og:title",
        content: headJson.title,
      },
      {
        property: "og:description",
        content: headJson.description,
      },
      {
        property: "og:url",
        content: `https://skills-booster.ru${this.$route.fullPath}`,
      },
      {
        property: "og:type",
        content: "article",
      },
      {
        property: "og:image",
        content: '/images/others/opengraph_img.png',
      },
    ];

    return {
      title: headJson.title,
      meta: metaArray,
      htmlAttrs: {
        lang: "ru",
      },
    };
  },

  props: {
    page: {
      type: Object,
    },
    breadcrumbsRoutes: {
      type: Array,
    },
    breadcrumbsPageName: {
      type: String,
    },
    breadcrumbsSliced: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    const routePath = this.$route.name;
    this.$nuxt.$emit("page-path-name", routePath);
  },
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
