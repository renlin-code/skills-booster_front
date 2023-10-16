<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    breadcrumbs-page-name="Блог"
  >
    <BlogSection class="sb-observe sb-observe--fade" extended :injected-title="pageContent.title" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";
import animateOnScrollMixin from "~/mixins/animateOnScrollMixin";

import Page from "~/components/Layout/Page.vue";
import BlogSection from "~/components/Sections/Blog/BlogSection.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(150), animateOnScrollMixin],
  components: {
    Page,
    BlogSection,
  },
  data: () => ({
    breadcrumbsRoutes: [
      {
        name: "Главная",
        path: "/",
      },
    ],
  }),
};
</script>
