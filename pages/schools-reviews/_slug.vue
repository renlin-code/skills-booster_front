<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    :breadcrumbs-page-name="page.title"
    breadcrumbsSliced
  >
    <SchoolContent class="sb-observe sb-observe--fade" :content="page" />
  </Page>
</template>

<script>
import animateOnScrollMixin from "~/mixins/animateOnScrollMixin";

import Page from "~/components/Layout/Page.vue";
import SchoolContent from "~/components/Sections/Reviews/SchoolContent.vue";

export default {
  name: "SchoolPage",
  mixins: [animateOnScrollMixin],
  components: {
    Page,
    SchoolContent,
  },
  data: () => ({
    breadcrumbsRoutes: [
      {
        name: "Главная",
        path: "/",
      },
      {
        name: "Отзывы о школах",
        path: "/schools-reviews",
      },
    ],
  }),
  async asyncData({ $axios, params }) {
    const { slug } = params;

    const page = await $axios.$get(`/wp-json/get/schools/${slug}`);
    return { page };
  },
};
</script>
