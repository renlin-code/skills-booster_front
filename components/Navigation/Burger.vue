<template>
  <button class="burger"
    :class="{'burger--open' : open}"
  >
    <hr class="burger__strip" />
    <hr class="burger__strip" />
    <hr class="burger__strip" />
  </button>
</template>

<script>
export default {
  name: "Burger",
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.burger {
  position: relative;
  width: 21rem;
  height: 16rem;
  &__strip {
    position: absolute;
    height: 2rem;
    background: $color_black;
    border-radius: 2rem;
    transition: all $transition_base;
    transition-delay: 0.6s;
    &:nth-child(1) {
      width: 11rem;
      top: 0;
      right: 3rem;
    }
    &:nth-child(2) {
      width: 18rem;
      top: 7rem;
      left: calc(50% - 9rem);
    }
    &:nth-child(3) {
      width: 11rem;
      top: 14rem;
      left: 3rem;
    }
  }
  &--open {
    .burger__strip {
      transition-delay: 0s !important;
      &:nth-child(1),
      &:nth-child(3) {
        width: 0;
      }
      &:nth-child(2) {
        transform: scaleX(0);
      }
    }
  }
}
</style>
