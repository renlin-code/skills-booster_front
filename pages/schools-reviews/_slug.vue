<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    :breadcrumbs-page-name="page.title"
    breadcrumbsSliced
  >
    <SchoolContent :content="page" />
  </Page>
</template>

<script>
import Page from "~/components/Layout/Page.vue";
import SchoolContent from "~/components/Sections/Reviews/SchoolContent.vue";

export default {
  name: "SchoolPage",
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
