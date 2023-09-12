<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    breadcrumbs-page-name="Акции школ"
  >
    <SchoolsSalesSection extended :injected-title="pageContent.title" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";

import Page from "~/components/Layout/Page.vue";
import SchoolsSalesSection from "~/components/Sections/Common/SchoolsSalesSection.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(155)],
  components: {
    Page,
    SchoolsSalesSection,
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
