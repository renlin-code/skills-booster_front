<template>
  <Page v-if="page" :page="page">
    <HomeHeroSection class="sb-observe sb-observe--fade" :content="pageContent.main_banner" />
    <BlogSection class="sb-observe sb-observe--fade-up" :injected-title="pageContent.blog_section.title" />
    <TestSection class="sb-observe sb-observe--fade-up" :content="pageContent.test_section" />
    <SchoolsSalesSection class="sb-observe sb-observe--fade-up" :injected-title="pageContent.schools_sales_section.title" />
  </Page>
</template>

<script>
import { pageAsyncDataMixin } from "~/mixins/pageAsyncDataMixin";
import animateOnScrollMixin from "~/mixins/animateOnScrollMixin";

import Page from "~/components/Layout/Page.vue";
import HomeHeroSection from "~/components/Sections/Home/HomeHeroSection.vue";
import BlogSection from "~/components/Sections/Blog/BlogSection.vue";
import TestSection from "~/components/Sections/Common/TestSection.vue";
import SchoolsSalesSection from "~/components/Sections/Common/SchoolsSalesSection.vue";

export default {
  name: "IndexPage",
  mixins: [pageAsyncDataMixin(14), animateOnScrollMixin],
  components: {
    Page,
    HomeHeroSection,
    BlogSection,
    TestSection,
    SchoolsSalesSection,
  },
};
</script>
