<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    breadcrumbs-page-name="О проекте"
  >
    <AboutSection :content="pageContent" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";

import Page from "~/components/Layout/Page.vue";
import AboutSection from "~/components/Sections/About/AboutSection.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(132)],
  components: {
    Page,
    AboutSection,
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
