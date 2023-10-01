<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    breadcrumbs-page-name="Политика конфиденциальности"
  >
    <PolicySection :content="pageContent" class="sb-observe sb-observe--fade" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";
import animateOnScrollMixin from "~/mixins/animateOnScrollMixin";

import Page from "~/components/Layout/Page.vue";
import PolicySection from "~/components/Sections/Policy/PolicySection.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(140), animateOnScrollMixin],
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
