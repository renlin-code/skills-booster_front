<template>
  <Page>
    <BlogSection extended />
  </Page>
</template>

<script>
import Page from '~/components/Layout/Page.vue';
import BlogSection from '~/components/Sections/Blog/BlogSection.vue';

export default {
  name: "IndexPage",
  components: {
    Page,
    BlogSection
}
}
</script>
