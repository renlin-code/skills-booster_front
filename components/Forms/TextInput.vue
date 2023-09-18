<template>
  <div class="text-input">
    <input
      class="text-input__input"
      :class="{'text-input__input--error' : error }"
      type="text"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    placeholder: {
      type: String,
    },
    error: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style scoped lang="scss">
.text-input {
  width: 100%;
  display: flex;
  &__input {
    width: 100%;
    height: auto;
    border: none;
    border-bottom: 1rem solid $color_gray;
    outline: none;
    background: transparent;
    padding: 0;
    padding-bottom: 10rem;
    color: $color_black;
    @include fontStyles($font_3, 18rem, 27rem, 400, 0.9rem);
    transition: $transition_base;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_3, 13rem, 19rem, 400);
      padding-bottom: 2rem;
    }
    &::placeholder {
      color: $color_gray;
      transition: $transition_base;
    }
    &:hover {
      border-bottom-color: $color_black;
    }
    &:focus {
      border-bottom-color: $color_black;
      &::placeholder {
        color: $color_black;
      }
    }
    &--error {
      border-bottom-color: $color_primary !important;
    }
  }
}
</style>
