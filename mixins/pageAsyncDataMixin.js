export const pageAsyncDataMixin = (id) => ({
  async asyncData({$axios}) {
    const page = await $axios.$get(`/wp-json/wp/v2/pages/${id}`);
    const pageContent = page.wp_content;
    return { page, pageContent }
  },
})
