<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    breadcrumbs-page-name="Пользовательское соглашение"
  >
    <TermsSection :content="pageContent" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";

import Page from "~/components/Layout/Page.vue";
import TermsSection from "~/components/Sections/Terms/TermsSection.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(142)],
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
