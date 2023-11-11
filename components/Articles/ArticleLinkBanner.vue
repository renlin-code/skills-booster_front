<template>
  <div class="article-link-banner">
    <div class="article-link-banner__inner">
      <div v-if="!isMobile" class="article-link-banner__bg"></div>
      <div v-if="isMobile" class="article-link-banner__stars">
        <svg viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.0396 1.31099C21.3186 0.349099 22.6814 0.349096 22.9604 1.31098L24.4239 6.35645C24.6464 7.12321 25.6334 7.33301 26.1484 6.723L29.5376 2.70901C30.1837 1.94377 31.4287 2.49806 31.2924 3.49028L30.5772 8.69481C30.4685 9.48574 31.2849 10.0789 32.0035 9.73108L36.7323 7.44262C37.6338 7.00634 38.5457 8.01909 38.0176 8.87007L35.2474 13.3338C34.8264 14.0121 35.3309 14.886 36.1289 14.8606L41.3796 14.6933C42.3807 14.6615 42.8018 15.9576 41.9732 16.5201L37.6269 19.4712C36.9664 19.9197 37.0719 20.9232 37.8112 21.2245L42.6761 23.2074C43.6035 23.5855 43.4611 24.9408 42.4753 25.1177L37.3045 26.0459C36.5187 26.1869 36.2069 27.1466 36.7597 27.7226L40.3974 31.5128C41.0909 32.2353 40.4095 33.4156 39.437 33.1762L34.3357 31.921C33.5605 31.7302 32.8853 32.4801 33.1561 33.2311L34.9377 38.1732C35.2773 39.1154 34.1748 39.9165 33.3837 39.3023L29.234 36.0807C28.6034 35.5911 27.6816 36.0015 27.6235 36.7977L27.2409 42.0372C27.168 43.0361 25.835 43.3194 25.3621 42.4366L22.8815 37.8057C22.5045 37.1019 21.4955 37.1019 21.1185 37.8057L18.6379 42.4366C18.165 43.3194 16.832 43.0361 16.7591 42.0372L16.3765 36.7977C16.3184 36.0015 15.3966 35.5911 14.766 36.0807L10.6163 39.3023C9.82518 39.9165 8.72266 39.1154 9.06231 38.1733L10.8439 33.2311C11.1147 32.4801 10.4395 31.7302 9.66426 31.921L4.56299 33.1762C3.59047 33.4156 2.90907 32.2353 3.60258 31.5128L7.24032 27.7226C7.79314 27.1466 7.48133 26.1869 6.69552 26.0459L1.52471 25.1177C0.53893 24.9408 0.396476 23.5855 1.32393 23.2074L6.18877 21.2245C6.92809 20.9232 7.03356 19.9197 6.37306 19.4712L2.02679 16.5201C1.19821 15.9576 1.61933 14.6615 2.62036 14.6933L7.87114 14.8606C8.6691 14.886 9.17363 14.0121 8.75264 13.3338L5.98242 8.87007C5.4543 8.0191 6.36619 7.00634 7.2677 7.44262L11.9965 9.73108C12.7151 10.0789 13.5315 9.48575 13.4228 8.69481L12.7076 3.49028C12.5713 2.49807 13.8163 1.94376 14.4624 2.70901L17.8516 6.723C18.3666 7.33301 19.3536 7.12321 19.5761 6.35645L21.0396 1.31099Z" fill="#FF918D"/>
        </svg>
        <svg viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.0396 1.31099C21.3186 0.349099 22.6814 0.349096 22.9604 1.31098L24.4239 6.35645C24.6464 7.12321 25.6334 7.33301 26.1484 6.723L29.5376 2.70901C30.1837 1.94377 31.4287 2.49806 31.2924 3.49028L30.5772 8.69481C30.4685 9.48574 31.2849 10.0789 32.0035 9.73108L36.7323 7.44262C37.6338 7.00634 38.5457 8.01909 38.0176 8.87007L35.2474 13.3338C34.8264 14.0121 35.3309 14.886 36.1289 14.8606L41.3796 14.6933C42.3807 14.6615 42.8018 15.9576 41.9732 16.5201L37.6269 19.4712C36.9664 19.9197 37.0719 20.9232 37.8112 21.2245L42.6761 23.2074C43.6035 23.5855 43.4611 24.9408 42.4753 25.1177L37.3045 26.0459C36.5187 26.1869 36.2069 27.1466 36.7597 27.7226L40.3974 31.5128C41.0909 32.2353 40.4095 33.4156 39.437 33.1762L34.3357 31.921C33.5605 31.7302 32.8853 32.4801 33.1561 33.2311L34.9377 38.1732C35.2773 39.1154 34.1748 39.9165 33.3837 39.3023L29.234 36.0807C28.6034 35.5911 27.6816 36.0015 27.6235 36.7977L27.2409 42.0372C27.168 43.0361 25.835 43.3194 25.3621 42.4366L22.8815 37.8057C22.5045 37.1019 21.4955 37.1019 21.1185 37.8057L18.6379 42.4366C18.165 43.3194 16.832 43.0361 16.7591 42.0372L16.3765 36.7977C16.3184 36.0015 15.3966 35.5911 14.766 36.0807L10.6163 39.3023C9.82518 39.9165 8.72266 39.1154 9.06231 38.1733L10.8439 33.2311C11.1147 32.4801 10.4395 31.7302 9.66426 31.921L4.56299 33.1762C3.59047 33.4156 2.90907 32.2353 3.60258 31.5128L7.24032 27.7226C7.79314 27.1466 7.48133 26.1869 6.69552 26.0459L1.52471 25.1177C0.53893 24.9408 0.396476 23.5855 1.32393 23.2074L6.18877 21.2245C6.92809 20.9232 7.03356 19.9197 6.37306 19.4712L2.02679 16.5201C1.19821 15.9576 1.61933 14.6615 2.62036 14.6933L7.87114 14.8606C8.6691 14.886 9.17363 14.0121 8.75264 13.3338L5.98242 8.87007C5.4543 8.0191 6.36619 7.00634 7.2677 7.44262L11.9965 9.73108C12.7151 10.0789 13.5315 9.48575 13.4228 8.69481L12.7076 3.49028C12.5713 2.49807 13.8163 1.94376 14.4624 2.70901L17.8516 6.723C18.3666 7.33301 19.3536 7.12321 19.5761 6.35645L21.0396 1.31099Z" fill="#FF918D"/>
        </svg>
      </div>
      <div class="article-link-banner__content">
        <div class="article-link-banner__left">
          <div class="article-link-banner__left-title">
            {{ content.text }}
          </div>
          <NuxtLink v-if="content.link_url.slice(0, 1) === '/'" :to="content.link_url">
            <MainButton type="2">{{ content.link_text }}</MainButton>
          </NuxtLink>
          <a v-else :href="content.link_url">
            <MainButton type="2">{{ content.link_text }}</MainButton>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mediaQueryMixin from "~/mixins/mediaQueryMixin";
import MainButton from "../Buttons/MainButton.vue";

export default {
  name: "ArticleLinkBanner",
  mixins: [mediaQueryMixin],
  props: {
    content: {
      type: Object,
    },
  },
  components: { MainButton },
  mounted() {
    this.mediaQueryHook();
  },
};
</script>

<style scoped lang="scss">
.article-link-banner {
  @media screen and (max-width: $brakepoint) {
    padding: 0 15rem;
  }
  &__inner {
    background: $color_black;
    padding: 36rem 60rem;
    border-radius: 50rem;
    position: relative;
    overflow: hidden;
    z-index: 0;
    @media screen and (max-width: $brakepoint) {
      padding: 25rem 20rem;
      border-radius: 20rem;
    }
  }
  &__content {
    display: grid;
    grid-template-columns: 638rem 1fr;
    @media screen and (max-width: $brakepoint) {
      display: block;
    }
  }
  &__left {
    &-title {
      @include fontStyles($font_1, 20rem, 32rem, 400, 2rem);
      color: $color_white;
      margin-bottom: 14rem;
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_1, 13rem, 20.8rem, 400, 1.3rem);
        text-align: center;
        margin-bottom: 20rem;
      }
    }
  }
  &__bg {
    width: 400rem;
    height: 400rem;
    background: url("/images/others/3d_shape.png") center/contain no-repeat;
    position: absolute;
    z-index: -1;
    top: -83rem;
    right: 23rem;
    animation: bg 20s ease-in-out infinite;
    @keyframes bg {
      0%,
      100% {
        transform: translate(0rem, 0rem) rotate(2deg) scale(1) skew(10deg, 2deg);
      }
      5% {
        transform: rotate(4deg) scale(1.2) skew(13deg, 12deg);
      }
      20% {
        transform: translate(1rem, 2rem) rotate(6deg) scale(1.2) skew(-2deg, 3deg);
      }
      24% {
        transform: translate(3rem, 4rem) rotate(8deg) scale(1.3) skew(-14deg, 1deg);
      }
      40% {
        transform: translate(0rem, 0rem) rotate(6deg) scale(1.1) skew(15deg, -2deg);
      }
      52% {
        transform: rotate(4deg) scale(1.2) skew(13deg, 12deg);
      }
      57% {
        transform: translate(1rem, 2rem) rotate(2deg) scale(1.2) skew(-2deg, 3deg);
      }
      63% {
        transform: translate(0rem, 0rem) rotate(4deg) scale(1) skew(10deg, 2deg);
      }
      68% {
        transform: translate(0rem, 0rem) rotate(-2deg) scale(1.1) skew(-15deg, -2deg);
      }
      92% {
        transform: translate(3rem, 4rem) rotate(-7deg) scale(1.3) skew(-14deg, 1deg);
      }
    }
  }
  &__stars {
    svg {
      position: absolute;
      &:first-child {
        width: 44rem;
        height: 44rem;
        left: -13rem;
        top: -13rem;
      }
      &:last-child {
        width: 42rem;
        height: 42rem;
        right: -10rem;
        bottom: -13rem;
      }
    }
  }
}
</style>
