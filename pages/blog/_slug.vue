<template>
  <Page>
    <ArticleContent />
  </Page>
</template>

<script>
import Page from '~/components/Layout/Page.vue';
import ArticleContent from '~/components/Sections/Blog/ArticleContent.vue';

export default {
  name: "ArticlePage",
  components: {
    Page,
    ArticleContent
}
}
</script>
