<template>
  <Page v-if="page" :page="page">
    <HomeHeroSection :content="pageContent.main_banner" />
    <BlogSection :injected-title="pageContent.blog_section.title" />
    <TestSection :content="pageContent.test_section" />
    <SchoolsSalesSection :injected-title="pageContent.schools_sales_section.title" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";

import Page from "~/components/Layout/Page.vue";
import HomeHeroSection from "~/components/Sections/Home/HomeHeroSection.vue";
import BlogSection from "~/components/Sections/Blog/BlogSection.vue";
import TestSection from "~/components/Sections/Common/TestSection.vue";
import SchoolsSalesSection from "~/components/Sections/Common/SchoolsSalesSection.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(14)],
  components: {
    Page,
    HomeHeroSection,
    BlogSection,
    TestSection,
    SchoolsSalesSection,
  },
};
</script>
