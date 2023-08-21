<template>
  <div>
    <HeaderDefault />
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderDefault from "~/components/Headers/HeaderDefault.vue";
export default {
  components: {
    HeaderDefault,
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
