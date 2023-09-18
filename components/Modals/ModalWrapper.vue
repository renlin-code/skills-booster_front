<template>
  <div class="modal-wrapper">
    <div class="modal-wrapper__inner">
      <div class="modal-wrapper__box">
        <button class="modal-wrapper__close" @click="$emit('close')">
          <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.884766 17.1129L17.115 0.887207M0.884766 0.887207L17.115 17.1129"
              stroke="#393939"
              stroke-width="1.2"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <div class="modal-wrapper__title">{{ title }}</div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "ModalWrapper",
  props: {
    closable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  methods: {
    ...mapMutations(["setScrollFixedValue"]),
  },
  created() {
    this.setScrollFixedValue(true);
  },
  beforeDestroy() {
    this.setScrollFixedValue(false);
  },
};
</script>

<style scoped lang="scss">
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  background: rgba($color_black, 0.7);
  display: grid;
  place-content: center;
  &__inner {
    padding: 50rem 0;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    @media screen and (max-width: $brakepoint) {
      padding: 15rem 0;
    }
  }
  &__box {
    position: relative;
    background: $color_bg;
    padding: 40rem 100rem;
    border-radius: 30rem;
    border: 1rem solid $color_gray;
    @media screen and (max-width: $brakepoint) {
      padding: 20rem 15rem;
      border-radius: 15rem;
    }
  }
  &__close {
    position: absolute;
    top: 40rem;
    right: 40rem;
    width: 40rem;
    height: 40rem;
    @media screen and (max-width: $brakepoint) {
      top: 12rem;
      right: 12rem;
      width: 14rem;
      height: 15rem;
    }
    svg {
      width: 100%;
      height: 100%;
      transition: all $transition_base;
      path {
        stroke: $color_gray;
        transition: all $transition_base;
      }
    }
    &:hover {
      svg {
        path {
          stroke: $color_black;
        }
      }
    }
  }
  &__title {
    width: 100%;
    text-align: center;
    @include fontStyles($font_2, 26rem, 41.6rem, 600);
    margin-bottom: 56rem;
    position: relative;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_2, 16rem, 25.6rem, 600);
      margin-bottom: 20rem;
    }
    &::after {
      content: "";
      width: 413rem;
      height: 27rem;
      position: absolute;
      bottom: -16rem;
      left: 50%;
      transform: translateX(-50%);
      background: url("/images/others/arrows.svg") center/contain no-repeat;
      @media screen and (max-width: $brakepoint) {
        width: 200rem;
        height: 12rem;
        bottom: -12rem;
      }
    }
  }
}
</style>
