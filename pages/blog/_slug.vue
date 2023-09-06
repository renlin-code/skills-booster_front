<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    :breadcrumbs-page-name="page.title"
    breadcrumbsSliced
  >
    <ArticleContent :content="page" />
  </Page>
</template>

<script>
import Page from "~/components/Layout/Page.vue";
import ArticleContent from "~/components/Sections/Blog/ArticleContent.vue";

export default {
  name: "ArticlePage",
  components: {
    Page,
    ArticleContent,
  },
  data: () => ({
    breadcrumbsRoutes: [
      {
        name: "Главная",
        path: "/",
      },
      {
        name: "Блог",
        path: "/blog",
      },
    ],
  }),
  async asyncData({ $axios, params }) {
    console.log(params);
    const splittedSlug = params.slug.split("-");
    const id = splittedSlug[splittedSlug.length - 1];

    const page = await $axios.$get(`/wp-json/get/articles/${id}`);
    console.log(page);
    return { page };
  },
};
</script>
