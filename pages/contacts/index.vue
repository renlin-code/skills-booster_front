<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    breadcrumbs-page-name="Контакты"
  >
    <ContactsSection :content="pageContent" class="sb-observe sb-observe--fade" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";
import animateOnScrollMixin from "~/mixins/animateOnScrollMixin";

import Page from "~/components/Layout/Page.vue";
import ContactsSection from "~/components/Sections/Contacts/ContactsSection.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(138), animateOnScrollMixin],
  components: {
    Page,
    ContactsSection,
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
