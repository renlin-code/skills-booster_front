<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    breadcrumbs-page-name="Акции школ"
  >
    <SchoolsSalesSection class="sb-observe sb-observe--fade" extended :injected-title="pageContent.title" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";
import animateOnScrollMixin from "~/mixins/animateOnScrollMixin";

import Page from "~/components/Layout/Page.vue";
import SchoolsSalesSection from "~/components/Sections/Common/SchoolsSalesSection.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(155), animateOnScrollMixin],
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
