<template>
  <label class="checkbox">
    <input type="checkbox" v-model="checked" class="checkbox__checkbox">
    <span class="checkbox__text"><slot /></span>
  </label>
</template>

<script>
export default {
  name: "Checkbox",
  data: () => ({
    checked: false
  }),
  watch: {
    checked(value) {
      this.$emit('changeChecked', value);
    }
  }
}
</script>

<style scoped lang="scss">
.checkbox {
  display: inline-flex;
  gap: 10rem;
  cursor: pointer;
  @media screen and (max-width: $brakepoint) {
    gap: 3rem;
  }
  &__checkbox {
    cursor: pointer;
    min-width: 26rem;
    min-height: 26rem;
    width: 26rem;
    height: 26rem;
    border: 1rem solid $color_primary;
    border-radius: 5rem;
    position: relative;
    margin: 0;
    margin-top: 4rem;
    transition: all $transition_base;
    @media screen and (max-width: $brakepoint) {
      min-width: 12rem;
      min-height: 12rem;
      width: 12rem;
      height: 12rem;
      border-radius: 3rem;
      margin-top: 2rem;
    }
    &:hover {
      opacity: 0.8;
    }
    &::after {
      content: "";
      position: absolute;
      top: 7rem;
      left: 5rem;
      width: 12rem;
      height: 9rem;
      opacity: 0;
      background: url("/images/icons/ok.svg") center/contain no-repeat;
      transition: all $transition_base;
      @media screen and (max-width: $brakepoint) {
        width: 8rem;
        height: 6rem;
        left: 1rem;
        top: 2rem;
      }
    }
    &:checked {
      background: $color_primary;
      &::after {
        opacity: 1;
      }
    }
  }
  &__text {
    @include fontStyles($font_3, 16rem, 24rem, 400);
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_3, 11rem, 16.5rem, 400);
    }
  }
}
</style>
