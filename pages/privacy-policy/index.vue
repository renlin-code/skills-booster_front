<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    breadcrumbs-page-name="Политика конфиденциальности"
  >
    <PolicySection :content="pageContent" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";

import Page from "~/components/Layout/Page.vue";
import PolicySection from "~/components/Sections/Policy/PolicySection.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(140)],
  components: {
    Page,
    PolicySection,
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
