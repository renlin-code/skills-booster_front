<template>
  <header class="header-default sb-noselect">
    <div
      class="header-default__header"
      :class="{
        'header-default__header--up': headerUp,
      }"
    >
      <div class="header-default__inner sb-container">
        <NuxtLink to="/" class="sb-internal-link header-default__logo"></NuxtLink>
        <NavMenu />
      </div>
    </div>
    <div class="header-default__spaceholder"></div>
  </header>
</template>

<script>
import NavMenu from "~/components/Navigation/NavMenu.vue";

export default {
  name: "HeaderDefault",
  components: {
    NavMenu,
  },
  data: () => ({
    headerUp: false,
  }),
  methods: {
    headerScrollHandler() {
      let lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      window.addEventListener("scroll", () => {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        this.headerUp = currentScrollPosition > lastScrollPosition;
        lastScrollPosition = currentScrollPosition;

        // this.headerColored = lastScrollPosition > 0;
      });
    },
  },
  mounted() {
    this.headerScrollHandler();
  },
};
</script>
<style scoped lang="scss">
.header-default {
  &__header {
    width: 100%;
    border-bottom: 1px solid rgba($color_light-gray, 0.5);
    position: fixed;
    background: $color_white;
    z-index: 2;
    transition: all $transition_base;
    transition-delay: 0.2s;
    &--up {
      transform: translateY(-100%);
    }
  }
  &__inner {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10rem;
    padding-bottom: 10rem;
    @media screen and (max-width: $brakepoint) {
      padding-top: 6rem;
      padding-bottom: 0;
    }
  }
  &__logo {
    width: 255rem;
    height: 56rem;
    background: url("/images/logos/SkillsBooster_logo_black.svg") center/contain no-repeat;
    @media screen and (max-width: $brakepoint) {
      width: 136rem;
      height: 28rem;
    }
  }
  &__spaceholder {
    width: 100%;
    height: 78rem;
    @media screen and (max-width: $brakepoint) {
      height: 42rem;
    }
  }
}
</style>
