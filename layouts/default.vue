<template>
  <div>
    <HeaderDefault />
    <main>
      <Nuxt />
    </main>
    <FooterDefault />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderDefault from "~/components/Headers/HeaderDefault.vue";
import FooterDefault from "~/components/Footers/FooterDefault.vue";

export default {
  components: {
    HeaderDefault,
    FooterDefault
  },
  computed: {
    ...mapGetters(["getScrollFixedValue"]),
  },

  watch: {
    getScrollFixedValue(value) {
      const documentEl = document.documentElement;
      if (value) {
        documentEl.style.overflowY = "hidden";
      } else {
        documentEl.style.overflowY = "scroll";
      }
    },
  },
};
</script>

<style scoped lang="scss">
main {
  min-height: calc(100vh - 340rem);
}
</style>
