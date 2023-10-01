<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    breadcrumbs-page-name="Пользовательское соглашение"
  >
    <TermsSection :content="pageContent" class="sb-observe sb-observe--fade" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";
import animateOnScrollMixin from "~/mixins/animateOnScrollMixin";

import Page from "~/components/Layout/Page.vue";
import TermsSection from "~/components/Sections/Terms/TermsSection.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(142), animateOnScrollMixin],
  components: {
    Page,
    TermsSection,
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
