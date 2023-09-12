<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    breadcrumbs-page-name="Политика конфиденциальности"
  >
    <PolicyContent :content="pageContent" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";

import Page from "~/components/Layout/Page.vue";
import PolicyContent from "~/components/Sections/Policy/PolicyContent.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(140)],
  components: {
    Page,
    PolicyContent,
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
