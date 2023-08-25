<template>
  <button class="text-arrow">
    <slot />
    <div class="text-arrow__arrow">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 33 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.4399 13.8667H21.4933" stroke="white" stroke-linecap="round" />
        <path
          d="M20.0266 9.70667L20.6256 10.2827C22.7308 12.3069 22.6604 15.6968 20.473 17.6318L20.0266 18.0267"
          stroke="white"
          stroke-linecap="round"
        />
      </svg>
    </div>
  </button>
</template>

<script>
export default {
  name: "TextArrowButton",
};
</script>

<style scoped lang="scss">
.text-arrow {
  display: flex;
  align-items: center;
  gap: 8rem;
  @include fontStyles($font_3, 20rem, unset, 500);
  padding-right: 9rem;
  transition: all $transition_base;
  &__arrow {
    width: 33rem;
    height: 27rem;
    background: $color_primary;
    border-radius: 20rem;
    transition: all $transition_base;
  }
  &:hover {
    padding-right: 0;
    .text-arrow {
      &__arrow {
        background: $color_black;
        width: 42rem;
      }
    }
  }
}
</style>
