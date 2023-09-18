<template>
  <div class="textarea">
    <textarea
      rows="1"
      ref="textareaEl"
      class="textarea__textarea"
      :class="{ 'textarea__textarea--error': error }"
      type="text"
      :placeholder="placeholder"
      @input="inputHandler"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "Textanput",
  props: {
    placeholder: {
      type: String,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    autoResize() {
      const textareaEl = this.$refs.textareaEl;
      textareaEl.style.height = "auto";
      textareaEl.style.height = `${textareaEl.scrollHeight}rem`;
    },
    inputHandler(event) {
      this.autoResize();
      this.$emit("input", event.target.value);
    },
  },
  mounted() {
    this.autoResize();
  },
};
</script>

<style scoped lang="scss">
.textarea {
  width: 100%;
  display: flex;
  &__textarea {
    resize: none;
    overflow: hidden;
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
