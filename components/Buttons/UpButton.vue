<template>
  <Transition name="fade">
    <button class="up-button mobile-hidden" @click="scrollToTop" v-if="shown">
      <div class="up-button__arrow">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 19 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 19V1M9.5 1L18 9.5M9.5 1L1 9.5"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </button>
  </Transition>
</template>

<script>
export default {
  name: "UpButton",
  data: () => ({
    shown: false,
  }),
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    scrollHandler() {
      let lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      window.addEventListener("scroll", () => {
        const currentScrollPosition =
          window.pageYOffset || document.documentElement.scrollTop;
        lastScrollPosition = currentScrollPosition;

        this.shown = lastScrollPosition > 0;
      });
    },
  },
  mounted() {
    this.scrollHandler();
  },
};
</script>

<style scoped lang="scss">
.up-button {
  position: fixed;
  bottom: 30rem;
  right: 30rem;
  display: grid;
  place-content: center;
  border-radius: 50%;
  width: 48rem;
  height: 48rem;
  background-color: $color_primary;
  transition: all $transition_base;
  &__arrow {
    width: 18rem;
    height: 18rem;
  }
  &:hover {
    background-color: #ff918c;
  }
  &:active {
    background-color: $color_black;
  }
}
</style>
