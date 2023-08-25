<template>
  <Page>
    <HomeHeroSection />
    <BlogShortSection />
  </Page>
</template>

<script>
import Page from "~/components/Layout/Page.vue";
import HomeHeroSection from "~/components/Sections/Home/HomeHeroSection.vue";
import BlogShortSection from "~/components/Sections/Common/BlogShortSection.vue";

export default {
  name: "IndexPage",
  components: {
    Page,
    HomeHeroSection,
    BlogShortSection
  },
};
</script>
