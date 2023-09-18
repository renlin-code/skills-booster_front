<template>
  <div class="form-field__field rate-select">
    <div class="rate-select__stars">
      <button
        type="button"
        class="rate-select__star"
        :class="{ 'rate-select__star--selected': star <= value }"
        v-for="star in 5"
        @click="selectStar(star)"
      >
        <svg viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 0L18.3677 10.3647H29.2658L20.4491 16.7705L23.8168 27.1353L15 20.7295L6.18322 27.1353L9.55093 16.7705L0.734152 10.3647H11.6323L15 0Z"
            fill="#FFA23B"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RateSelect",
  data: () => ({
    value: null,
  }),
  methods: {
    selectStar(star) {
      this.value = star;
      this.$emit("selectStar", this.value);
    },
  },
};
</script>

<style scoped lang="scss">
.rate-select {
  &__stars {
    display: flex;
    align-items: center;
    @media screen and (max-width: $brakepoint) {
      gap: 4rem;
    }
  }
  &__star {
    width: 30rem;
    height: 30rem;
    @media screen and (max-width: $brakepoint) {
      width: 20rem;
      height: 20rem;
    }
    svg {
      width: 100%;
      height: 100%;
      path {
        fill: $color_gray;
        transition: all $transition_base;
      }
    }
    &--selected {
      svg {
        path {
          fill: #ffa23b;
        }
      }
    }
  }
}
</style>
