<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    breadcrumbs-page-name="Пользовательское соглашение"
  >
    <TermsContent :content="pageContent" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";

import Page from "~/components/Layout/Page.vue";
import TermsContent from "~/components/Sections/Terms/TermsContent.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(142)],
  components: {
    Page,
    TermsContent,
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
