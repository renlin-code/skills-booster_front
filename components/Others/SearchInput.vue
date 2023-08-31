<template>
  <div class="search-input">
    <input type="text" class="search-input__input" :placeholder="placeholder" />
    <button class="search-input__button">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.3848 12.4463C10.037 13.5232 8.32796 14.0432 6.60873 13.8994C4.8895 13.7556 3.29059 12.9589 2.14039 11.673C0.990193 10.3872 0.376015 8.70967 0.424001 6.98511C0.471987 5.26054 1.17849 3.61981 2.39842 2.39988C3.61834 1.17996 5.25908 0.473452 6.98364 0.425466C8.70821 0.37748 10.3857 0.991657 11.6716 2.14186C12.9574 3.29206 13.7541 4.89097 13.8979 6.6102C14.0417 8.32943 13.5218 10.0385 12.4448 11.3863L17.6008 16.5413C17.6745 16.61 17.7336 16.6928 17.7746 16.7848C17.8156 16.8768 17.8377 16.9761 17.8394 17.0768C17.8412 17.1775 17.8227 17.2775 17.785 17.3709C17.7472 17.4643 17.6911 17.5491 17.6199 17.6203C17.5487 17.6916 17.4638 17.7477 17.3704 17.7854C17.2771 17.8232 17.177 17.8417 17.0763 17.8399C16.9756 17.8381 16.8763 17.8161 16.7843 17.7751C16.6923 17.7341 16.6095 17.675 16.5408 17.6013L11.3848 12.4463ZM3.45884 10.8843C2.72488 10.1503 2.225 9.21514 2.02236 8.19708C1.81972 7.17902 1.92342 6.12374 2.32036 5.16461C2.71729 4.20547 3.38965 3.38553 4.25246 2.80841C5.11526 2.23129 6.12979 1.92289 7.16781 1.92219C8.20584 1.92149 9.22078 2.22853 10.0844 2.80449C10.9479 3.38045 11.6214 4.19948 12.0196 5.15808C12.4179 6.11668 12.523 7.17182 12.3217 8.19015C12.1204 9.20848 11.6218 10.1443 10.8888 10.8793L10.8838 10.8843L10.8788 10.8883C9.89394 11.8709 8.55927 12.4224 7.16801 12.4217C5.77676 12.4209 4.44269 11.868 3.45884 10.8843Z"
          fill="none"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    placeholder: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.search-input {
  position: relative;
  width: 100%;
  &__input {
    width: 100%;
    height: 100%;
    background: transparent;
    border-radius: 20rem;
    border: 1rem solid $color_gray;
    padding: 14rem 50rem 14rem 20rem;
    @include fontStyles($font_3, 16rem, 19.5rem, 500);
    outline: none;
    color: $color_black;
    transition: all $transition_base;
    @media screen and (max-width: $brakepoint) {
      padding: 10rem 30rem 10rem 10rem;
      @include fontStyles($font_3, 13rem, 19.5rem, 400);
    }
    &::placeholder {
      color: $color_gray;
    }
    &:focus {
      border-color: $color_primary !important;
    }
  }
  &__button {
    position: absolute;
    width: 18rem;
    height: 18rem;
    right: 20rem;
    top: 16rem;
    @media screen and (max-width: $brakepoint) {
      width: 14rem;
      height: 14rem;
      top: 12rem;
      right: 10rem;
    }
    svg {
      path {
        fill: $color_gray;
        transition: all $transition_base;
      }
    }
  }
  &:hover {
    .search-input {
      &__input {
        border-color: $color_black;
      }
      &__button {
        svg {
          path {
            fill: $color_black;
          }
        }
      }
    }
  }
}
</style>
