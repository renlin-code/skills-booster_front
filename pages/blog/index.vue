<template>
  <Page :page="page" :breadcrumbs-routes="breadcrumbsRoutes" breadcrumbs-page-name="Блог">
    <BlogSection extended :injected-title="pageContent.title" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";

import Page from "~/components/Layout/Page.vue";
import BlogSection from "~/components/Sections/Blog/BlogSection.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(150)],
  components: {
    Page,
    BlogSection,
  },
  data: () => ({
    breadcrumbsRoutes: [
      {
        name: "Главная",
        path: "/",
      }
    ]
  })
};
</script>
