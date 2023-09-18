<template>
  <div class="form-field">
    <label class="form-field__label"
      >{{ labelText
      }}<span class="form-field__label-max" v-if="vuelidateData.$params.maxLength">{{
        ` (максимум ${vuelidateData.$params.maxLength.max} символов)`
      }}</span
      ><span class="form-field__label-required" v-if="vuelidateData.$params.required"
        >*</span
      ></label
    >
    <div class="form-field__field">
      <slot />
      <span
        class="form-field__error"
        v-show="vuelidateData.$error"
        :class="{ 'form-field__error--shake': vuelidateData.$error }"
        >{{ errorText }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "FormField",
  props: {
    labelText: {
      type: String,
      default: "",
    },
    vuelidateData: {
      type: Object,
    },
    errorMessages: {
      type: Object,
    },
  },
  computed: {
    errorText() {
      let result;
      Object.keys(this.vuelidateData).forEach((key) => {
        if (!key.includes("$") && !this.vuelidateData[key] && this.errorMessages[key]) {
          result = this.errorMessages[key];
          return;
        }
      });
      return result;
    },
  },
};
</script>

<style scoped lang="scss">
.form-field {
  &__label {
    display: inline-block;
    margin-bottom: 21rem;
    @include fontStyles($font_3, 20rem, 30rem, 400, 1rem);
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_3, 14rem, 17rem, 400);
      margin-bottom: 12rem;
    }
    &-max {
      color: $color_gray;
    }
    &-required {
      color: $color_primary;
    }
  }
  &__field {
    display: flex;
    flex-direction: column;
    gap: 10rem;
    @media screen and (max-width: $brakepoint) {
      gap: 4rem;
    }
  }
  &__error {
    color: $color_primary;
    @include fontStyles($font_3, 15rem, 22.5rem, 600, 0.75rem);
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_3, 13rem, 19.5rem, 400);
    }
    &--shake {
      animation: shake 0.7s 1;
      @keyframes shake {
        30% {
          transform: translateX(8rem);
        }
        60% {
          transform: translateX(-7rem);
        }
        75% {
          transform: translateX(6rem);
        }
        90% {
          transform: translateX(-5rem);
        }
        100% {
          transform: translateX(0);
        }
      }
    }
  }
}
</style>
