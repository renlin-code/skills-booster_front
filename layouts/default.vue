<template>
  <div>
    <HeaderDefault />
    <main>
      <OfflineView v-if="$nuxt.isOffline" />
      <Nuxt v-else />
      <UpButton class="up" />
    </main>
    <FooterDefault />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import HeaderDefault from "~/components/Headers/HeaderDefault.vue";
import FooterDefault from "~/components/Footers/FooterDefault.vue";
import OfflineView from "~/components/Others/OfflineView.vue";
import UpButton from "~/components/Buttons/UpButton.vue";

export default {
  components: {
    HeaderDefault,
    OfflineView,
    FooterDefault,
    UpButton,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters(["getScrollFixedValue"]),
  },
  watch: {
    getScrollFixedValue(value) {
      const documentEl = document.documentElement;
      if (value) {
        documentEl.style.overflowY = "hidden";
      } else {
        documentEl.style.overflowY = "unset";
      }
    },
  },
};
</script>

<style scoped lang="scss">
main {
  min-height: calc(100vh - 325rem);
  @media screen and (max-width: $brakepoint) {
    min-height: unset;
  }
}
</style>
