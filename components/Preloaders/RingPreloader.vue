<template>
  <div class="ring-preloader">
    <div class="ring-preloader__ring"></div>
  </div>
</template>

<script>
export default {
  name: "RingPreloader",
};
</script>

<style scoped lang="scss">
.ring-preloader {
  width: min-content;
  &__ring {
    width: 42rem;
    height: 42rem;
    border-radius: 50%;
    border: 5rem solid $color_primary;
    border-top-color: $color_gray;
    animation: spin 0.75s linear infinite;
    @media screen and (max-width: $brakepoint) {
      width: 25rem;
      height: 25rem;
      border: 2.5rem solid $color_primary;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
