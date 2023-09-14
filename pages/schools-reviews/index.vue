<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    breadcrumbs-page-name="Отзывы о школах"
  >
    <ReviewsSection :content="pageContent" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";

import Page from "~/components/Layout/Page.vue";
import ReviewsSection from "~/components/Sections/Reviews/ReviewsSection.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(152)],
  components: {
    Page,
    ReviewsSection,
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
