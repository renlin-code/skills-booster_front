<template>
  <Page
    v-if="page"
    :page="page"
    :breadcrumbs-routes="breadcrumbsRoutes"
    breadcrumbs-page-name="Контакты"
  >
    <ContactsSection :content="pageContent" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";

import Page from "~/components/Layout/Page.vue";
import ContactsSection from "~/components/Sections/Contacts/ContactsSection.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(138)],
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
