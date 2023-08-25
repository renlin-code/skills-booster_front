<template>
  <button class="chips__chip chip"><slot /></button>
</template>

<script>
export default {
  name: "ChipButton",
};
</script>

<style scoped lang="scss">
.chip {
  padding: 10rem 20rem;
  border-radius: 30rem;
  @include fontStyles($font_3, 20rem, unset, 500);
  color: $color_black;
  border: 1rem solid $color_black;
  width: max-content;
  transition: all $transition_base;
  @media screen and (max-width: $brakepoint) {
    padding: 8rem 20rem;
    @include fontStyles($font_3, 14rem, 21rem, 500);
  }
  &:hover {
    color: $color_white;
    background: $color_black;
  }
  &:focus,
  &--selected {
    color: $color_white;
    background: $color_primary;
    border-color: $color_primary;
  }
}
</style>
