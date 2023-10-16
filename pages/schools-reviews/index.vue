<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    breadcrumbs-page-name="Отзывы о школах"
  >
    <ReviewsSection class="sb-observe sb-observe--fade" :content="pageContent" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";
import animateOnScrollMixin from "~/mixins/animateOnScrollMixin";

import Page from "~/components/Layout/Page.vue";
import ReviewsSection from "~/components/Sections/Reviews/ReviewsSection.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(152), animateOnScrollMixin],
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
