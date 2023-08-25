<template>
  <button
    class="main-button"
    :class="{
      'main-button--type1': type === '1',
      'main-button--type2': type === '2',
      'main-button--type3': type === '3',
      'main-button--type4': type === '4',
    }"
  >
    <slot />
    <div class="main-button__arrow" v-if="arrow">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 19.5L19 6.5M19 6.5V18.98M19 6.5H6.52"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </button>
</template>

<script>
export default {
  name: "MainButton",
  props: {
    arrow: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "1",
    },
  },
};
</script>

<style scoped lang="scss">
.main-button {
  width: 100%;
  padding: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6rem;
  text-align: center;
  border-radius: 30rem;
  border: 1rem solid transparent;
  @include fontStyles($font_3, 22rem, 26rem, 500);
  transition: all $transition_base;
  @media screen and (max-width: $brakepoint) {
    padding: 16.5rem;
    @include fontStyles($font_3, 16rem, 19rem, 500);
  }
  &__arrow {
    display: grid;
    width: 24rem;
    height: 24rem;
    transform-origin: left bottom;
    transition: all $transition_base;
    @media screen and (max-width: $brakepoint) {
      width: 12rem;
      height: 12rem;
    }
    svg {
      path {
        transition: all $transition_base;
      }
    }
  }
  &:hover {
    .main-button {
      &__arrow {
        // transform: translate(4rem, -4rem);
      }
    }
  }
  &--type1 {
    color: $color_white;
    background: $color_primary;
    border-color: $color_primary;
    &:hover {
      background: $color_black;
      border-color: $color_black;
    }
    &:focus {
      color: $color_black;
      background: transparent;
      border-color: $color_black;
      svg {
        path {
          stroke: $color_black;
        }
      }
      @media screen and (max-width: $brakepoint) {
        color: $color_white;
        background: $color_black;
        border-color: $color_black;
        svg {
          path {
            stroke: $color_white;
          }
        }
      }
    }
  }
  &--type2 {
    color: $color_white;
    background: $color_primary;
    border-color: $color_primary;
    &:hover {
      background: $color_white;
      border-color: $color_white;
      color: $color_black;
      svg {
        path {
          stroke: $color_black;
        }
      }
    }
    &:focus {
      color: $color_black;
      background: $color_bg;
      border-color: $color_primary;
      svg {
        path {
          stroke: $color_black;
        }
      }
      @media screen and (max-width: $brakepoint) {
        color: $color_black;
        background: $color_white;
        border-color: $color_white;
        svg {
          path {
            stroke: $color_black;
          }
        }
      }
    }
  }
  &--type3 {
    color: $color_white;
    background: $color_black;
    border-color: $color_black;
    &:hover {
      background: transparent;
      border-color: $color_primary;
      color: $color_black;
      svg {
        path {
          stroke: $color_black;
        }
      }
    }
    &:focus {
      color: $color_white;
      background: $color_primary;
      border-color: $color_primary;
      svg {
        path {
          stroke: $color_white;
        }
      }
      @media screen and (max-width: $brakepoint) {
        color: $color_white;
        background: $color_primary;
        border-color: $color_primary;
        svg {
          path {
            stroke: $color_white;
          }
        }
      }
    }
  }
}
</style>
