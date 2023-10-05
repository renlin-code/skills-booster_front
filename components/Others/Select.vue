<template>
  <button class="select no-select"
    @blur="open = false"
  >
    <div
      class="select__header"
      :class="{ 'select__header--open': open }"
      @click="open = !open"
    >
      {{ items[selectedIndex] }}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 10L12 15L17 10"
          stroke="#848484"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <Transition name="fade">
      <ul class="select__list" v-if="open">
        <li class="select__list-item"
          v-for="(item, index) in items"
          @click="selectItem(index)"
        >
          {{ item }}
        </li>
      </ul>
    </Transition>
  </button>
</template>

<script>
export default {
  name: "Select",
  props: {
    items: {
      type: Array
    }
  },
  data: () => ({
    open: false,
    selectedIndex: 0
  }),
  methods: {
    selectItem(index) {
      this.selectedIndex = index;
      this.$emit("select-item", this.selectedIndex);
      this.open = false;
    }
  },
};
</script>

<style scoped lang="scss">
.select {
  width: 100%;
  position: relative;
  &__header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    @include fontStyles($font_3, 20rem, 32rem, 500);
    padding: 13rem 15rem;
    border: 1rem solid $color_gray;
    border-radius: 10rem;
    transition: all $transition_base;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_3, 14rem, 21rem, 500);
      padding: 11rem 15rem;
    }
    svg {
      width: 24rem;
      height: 24rem;
      transition: all $transition_base;
      path {
        transition: all $transition_base;
      }
    }
    &:hover {
      border-color: $color_black;
      border-width: 1.5rem;
      svg {
        path {
          stroke: $color_black;
        }
      }
      @media screen and (max-width: $brakepoint) {
        border-width: 1rem;
      }
    }
    &--open {
      svg {
        transform: rotate(-180deg);
      }
    }
  }
  &__list {
    width: 100%;
    position: absolute;
    z-index: 1;
    top: calc(100% + 10rem);
    display: flex;
    flex-direction: column;
    border-radius: 10rem;
    overflow: hidden;
    border: 1rem solid $color_gray;
    background: $color_white;
    li {
      padding: 13rem 15rem;
      text-align: start;
      @include fontStyles($font_3, 20rem, 32rem, 500);
      transition: all $transition_base;
      @media screen and (max-width: $brakepoint) {
        padding: 11rem 15rem;
        @include fontStyles($font_3, 14rem, 21rem, 500);
      }
      &:hover {
        background: rgba($color_primary, 0.3);
      }
    }
  }
}
</style>
