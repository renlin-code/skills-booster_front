<template>
  <button
    class="accordion"
    :class="{ 'accordion--open': open }"
    @click="open = !open"
  >
    <div class="accordion__header">
      {{ content.accordion_title }}
      <div class="accordion__header-icon">
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="accordion__body">
      {{ content.accordion_content }}
    </div>
  </button>
</template>

<script>
export default {
  name: "ArticleAccordion",
  props: {
    content: {
      type: Object,
    }
  },
  data: () => ({
    open: false
  })
};
</script>

<style scoped lang="scss">
.accordion {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20rem 40rem;
  background: $color_bg;
  border-radius: 20rem;
  cursor: pointer;
  transition: all $transition_base;
  @media screen and (max-width: $brakepoint) {
    padding: 12rem 16rem;
  }
  &:hover {
    background: rgba($color_bg, 0.5);
  }
  &__header {
    width: 100%;
    text-align: start;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 20rem;
    @include fontStyles($font_2, 22rem, 40rem, 500, 1.1rem);
    color: $color_dark-black;
    transition: all $transition_base;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_2, 15rem, 24rem, 500);
    }
    &-icon {
      width: 40rem;
      height: 40rem;
      background: $color_primary;
      border-radius: 50%;
      position: relative;
      transition: all $transition_base;
      @media screen and (max-width: $brakepoint) {
        width: 30rem;
        height: 30rem;
      }
      div {
        width: 16rem;
        height: 3rem;
        border-radius: 3rem;
        background: $color_white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all $transition_base;
        &:first-child {
          transform: translate(-50%, -50%) rotate(90deg);
        }
      }
    }
  }
  &__body {
    color: $color_dark-black;
    width: 100%;
    text-align: start;
    max-height: 0;
    overflow: hidden;
    border-top: 1rem solid transparent;
    @include fontStyles($font_3, 18rem, 30rem, 400, 1rem);
    transition: all $transition_base;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_3, 14rem, 21rem, 400);
    }
    em {
      display: inline;
      color: $color_primary;
    }
    a {
      display: inline;
      color: $color_primary;
      transition: all $transition_base;
      &:hover {
        opacity: 0.8;
      }
    }
    strong {
      display: inline;
      color: $color_dark-black;
      font-weight: 500;
    }
  }
  &--open {
    .accordion {
      &__header {
        padding-bottom: 10rem;
        @media screen and (max-width: $brakepoint) {
          padding-bottom: 8rem;
        }
        &-icon {
          transform: rotate(90deg);
          div {
            &:last-child {
              opacity: 0;
              transform: translate(-50%, -50%) rotate(-90deg);
            }
          }
        }
      }
      &__body {
        border-color: $color_light-gray;
        max-height: 700rem;
        padding-top: 20rem;
        @media screen and (max-width: $brakepoint) {
          padding-top: 8rem;
        }
      }
    }
  }
}
</style>
