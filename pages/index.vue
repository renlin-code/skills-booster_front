<template>
  <Page>
    <HomeHeroSection />
    <BlogShortSection />
    <TestSection />
    <SchoolsSalesShortSection />
  </Page>
</template>

<script>
import Page from "~/components/Layout/Page.vue";
import HomeHeroSection from "~/components/Sections/Home/HomeHeroSection.vue";
import BlogShortSection from "~/components/Sections/Common/BlogShortSection.vue";
import TestSection from "~/components/Sections/Common/TestSection.vue";
import SchoolsSalesShortSection from "~/components/Sections/Common/SchoolsSalesShortSection.vue";

export default {
  name: "IndexPage",
  components: {
    Page,
    HomeHeroSection,
    BlogShortSection,
    TestSection,
    SchoolsSalesShortSection
},
};
</script>
