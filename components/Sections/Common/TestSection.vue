<template>
  <section
    class="test-section sb-noselect"
    :class="{
      'test-section--minified': minified,
      'test-section--onslider': onSlider,
    }"
  >
    <div class="test-section__inner sb-container">
      <div class="test-section__bg" v-show="!minified"></div>
      <div class="test-section__content">
        <div class="test-section__left">
          <h2 class="test-section__title">{{ content.title }}</h2>
          <div class="test-section__button-wrapper">
            <a :href="content.link_url" target="_blank">
              <MainButton type="2">{{ content.link_text }}</MainButton>
            </a>
          </div>
        </div>
        <div class="test-section__right">
          <figure class="test-section__fig">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 309 295"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <clipPath id="test-clip-shape">
                  <path
                    d="M152.161 2.56517L146.742 4.57338C144.861 5.27002 142.821 5.41377 140.862 4.98762L135.179 3.75156C133.424 3.36981 131.59 3.63064 130.011 4.48664L124.995 7.2056C123.226 8.16453 121.219 8.59496 119.212 8.44565L113.418 8.01456C111.617 7.8806 109.829 8.40061 108.381 9.47912L103.892 12.8232C102.267 14.0334 100.327 14.7478 98.3052 14.8801L92.5547 15.2565C90.7384 15.3754 89.0274 16.1507 87.7406 17.4379L83.8759 21.3035C82.4298 22.75 80.5927 23.7426 78.5902 24.1594L73.0322 25.3164C71.2316 25.6912 69.6315 26.7146 68.5361 28.1919L65.3674 32.4653C64.135 34.1274 62.439 35.3883 60.4924 36.0897L55.2618 37.9744C53.5108 38.6053 52.057 39.8648 51.1829 41.5079L48.7541 46.0735C47.77 47.9234 46.255 49.4365 44.4039 50.4182L39.6159 52.9576C37.9511 53.8406 36.6798 55.3178 36.0547 57.0955L34.3851 61.8435C33.6812 63.8451 32.3875 65.5866 30.6743 66.8384L26.4202 69.9467C24.8806 71.0716 23.8273 72.7407 23.4744 74.6146L22.5646 79.4464C22.1675 81.5556 21.1335 83.4924 19.602 84.996L15.9488 88.5827C14.5742 89.9322 13.7715 91.759 13.7073 93.6843L13.5461 98.5147C13.4738 100.68 12.7336 102.77 11.4268 104.498L8.41959 108.474C7.24863 110.023 6.72372 111.965 6.9552 113.893L7.5264 118.649C7.78641 120.813 7.36606 123.005 6.32367 124.92L3.99091 129.206C3.05859 130.919 2.83011 132.928 3.35391 134.806L4.64114 139.422C5.22845 141.529 5.14359 143.766 4.39838 145.821L2.75882 150.344C2.09354 152.179 2.16995 154.201 2.9718 155.981L4.95993 160.394C5.8573 162.385 6.11111 164.607 5.68604 166.75L4.75488 171.444C4.3761 173.353 4.75452 175.335 5.81021 176.971L8.483 181.112C9.66214 182.938 10.2451 185.086 10.1514 187.258L9.94431 192.06C9.86093 193.993 10.5276 195.883 11.8051 197.336L15.1398 201.128C16.5642 202.748 17.4551 204.767 17.6915 206.911L18.2251 211.752C18.4352 213.658 19.3669 215.41 20.829 216.65L24.7895 220.009C26.4174 221.39 27.5858 223.233 28.1392 225.295L29.4281 230.096C29.9196 231.927 31.0862 233.504 32.6934 234.51L37.2243 237.345C39.0118 238.463 40.4212 240.094 41.2689 242.025L43.3192 246.695C44.0721 248.41 45.4392 249.781 47.1518 250.538L52.174 252.761C54.078 253.603 55.6886 254.993 56.801 256.753L59.6036 261.186C60.592 262.75 62.1235 263.893 63.9037 264.396L69.3138 265.925C71.2931 266.485 73.0645 267.613 74.4082 269.17L77.932 273.254C79.1269 274.639 80.7868 275.54 82.5993 275.786L88.2715 276.558C90.2879 276.832 92.1812 277.687 93.721 279.017L97.9087 282.636C99.2798 283.821 101.034 284.469 102.846 284.461L108.637 284.435C110.655 284.426 112.634 284.999 114.335 286.085L119.101 289.129C120.618 290.098 122.433 290.488 124.215 290.23L129.973 289.394C131.96 289.106 133.988 289.393 135.816 290.222L141.051 292.595C142.685 293.335 144.53 293.466 146.251 292.963L151.821 291.334C153.745 290.772 155.79 290.772 157.713 291.334L163.283 292.963C165.005 293.466 166.85 293.335 168.484 292.595L173.718 290.222C175.547 289.393 177.575 289.106 179.562 289.394L185.32 290.23C187.101 290.488 188.916 290.098 190.433 289.129L195.2 286.085C196.901 284.999 198.879 284.426 200.897 284.435L206.689 284.461C208.501 284.469 210.255 283.821 211.626 282.636L215.814 279.017C217.353 277.687 219.247 276.832 221.263 276.558L226.935 275.786C228.748 275.54 230.408 274.639 231.603 273.254L235.126 269.17C236.47 267.613 238.242 266.485 240.221 265.925L245.631 264.396C247.411 263.893 248.943 262.75 249.931 261.186L252.734 256.753C253.846 254.993 255.457 253.603 257.361 252.761L262.383 250.538C264.095 249.781 265.463 248.41 266.215 246.695L268.266 242.025C269.113 240.094 270.523 238.463 272.31 237.345L276.841 234.51C278.448 233.504 279.615 231.927 280.107 230.096L281.395 225.295C281.949 223.233 283.117 221.39 284.745 220.009L288.706 216.65C290.168 215.41 291.1 213.658 291.31 211.752L291.843 206.911C292.08 204.767 292.97 202.748 294.395 201.128L297.73 197.336C299.007 195.883 299.674 193.993 299.59 192.06L299.383 187.258C299.29 185.086 299.872 182.938 301.052 181.112L303.724 176.971C304.78 175.335 305.159 173.353 304.78 171.444L303.849 166.75C303.424 164.607 303.677 162.385 304.575 160.394L306.563 155.981C307.365 154.201 307.441 152.179 306.776 150.344L305.136 145.821C304.391 143.766 304.306 141.529 304.893 139.422L306.181 134.806C306.705 132.928 306.476 130.919 305.544 129.206L303.211 124.92C302.169 123.005 301.748 120.813 302.008 118.649L302.579 113.893C302.811 111.965 302.286 110.023 301.115 108.474L298.108 104.498C296.801 102.77 296.061 100.68 295.989 98.5147L295.827 93.6843C295.763 91.759 294.96 89.9322 293.586 88.5826L289.933 84.996C288.401 83.4924 287.367 81.5556 286.97 79.4464L286.06 74.6146C285.707 72.7407 284.654 71.0716 283.114 69.9467L278.86 66.8384C277.147 65.5866 275.853 63.8451 275.15 61.8435L273.48 57.0955C272.855 55.3178 271.583 53.8406 269.919 52.9576L265.131 50.4182C263.28 49.4365 261.765 47.9234 260.781 46.0735L258.352 41.5079C257.478 39.8647 256.024 38.6053 254.273 37.9744L249.042 36.0897C247.096 35.3883 245.4 34.1274 244.167 32.4653L240.999 28.1919C239.903 26.7146 238.303 25.6912 236.502 25.3164L230.944 24.1594C228.942 23.7426 227.105 22.7499 225.659 21.3035L221.794 17.4379C220.507 16.1507 218.796 15.3754 216.98 15.2565L211.229 14.8801C209.208 14.7478 207.268 14.0334 205.643 12.8232L201.154 9.47912C199.706 8.40061 197.917 7.8806 196.117 8.01456L190.323 8.44565C188.316 8.59496 186.309 8.16453 184.54 7.2056L179.524 4.48664C177.945 3.63064 176.111 3.3698 174.356 3.75156L168.673 4.98762C166.714 5.41377 164.673 5.27002 162.793 4.57338L157.373 2.56517C155.692 1.94219 153.843 1.94219 152.161 2.56517Z"
                    fill="url(#pattern0_1615_7404)"
                    stroke="#CECECE"
                    stroke-width="3"
                  />
                </clipPath>
              </defs>
              <image
                clip-path="url(#test-clip-shape)"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                :xlink:href="content.image"
              />
              <g class="frame-border" fill="none">
                <path
                  d="M152.161 2.56517L146.742 4.57338C144.861 5.27002 142.821 5.41377 140.862 4.98762L135.179 3.75156C133.424 3.36981 131.59 3.63064 130.011 4.48664L124.995 7.2056C123.226 8.16453 121.219 8.59496 119.212 8.44565L113.418 8.01456C111.617 7.8806 109.829 8.40061 108.381 9.47912L103.892 12.8232C102.267 14.0334 100.327 14.7478 98.3052 14.8801L92.5547 15.2565C90.7384 15.3754 89.0274 16.1507 87.7406 17.4379L83.8759 21.3035C82.4298 22.75 80.5927 23.7426 78.5902 24.1594L73.0322 25.3164C71.2316 25.6912 69.6315 26.7146 68.5361 28.1919L65.3674 32.4653C64.135 34.1274 62.439 35.3883 60.4924 36.0897L55.2618 37.9744C53.5108 38.6053 52.057 39.8648 51.1829 41.5079L48.7541 46.0735C47.77 47.9234 46.255 49.4365 44.4039 50.4182L39.6159 52.9576C37.9511 53.8406 36.6798 55.3178 36.0547 57.0955L34.3851 61.8435C33.6812 63.8451 32.3875 65.5866 30.6743 66.8384L26.4202 69.9467C24.8806 71.0716 23.8273 72.7407 23.4744 74.6146L22.5646 79.4464C22.1675 81.5556 21.1335 83.4924 19.602 84.996L15.9488 88.5827C14.5742 89.9322 13.7715 91.759 13.7073 93.6843L13.5461 98.5147C13.4738 100.68 12.7336 102.77 11.4268 104.498L8.41959 108.474C7.24863 110.023 6.72372 111.965 6.9552 113.893L7.5264 118.649C7.78641 120.813 7.36606 123.005 6.32367 124.92L3.99091 129.206C3.05859 130.919 2.83011 132.928 3.35391 134.806L4.64114 139.422C5.22845 141.529 5.14359 143.766 4.39838 145.821L2.75882 150.344C2.09354 152.179 2.16995 154.201 2.9718 155.981L4.95993 160.394C5.8573 162.385 6.11111 164.607 5.68604 166.75L4.75488 171.444C4.3761 173.353 4.75452 175.335 5.81021 176.971L8.483 181.112C9.66214 182.938 10.2451 185.086 10.1514 187.258L9.94431 192.06C9.86093 193.993 10.5276 195.883 11.8051 197.336L15.1398 201.128C16.5642 202.748 17.4551 204.767 17.6915 206.911L18.2251 211.752C18.4352 213.658 19.3669 215.41 20.829 216.65L24.7895 220.009C26.4174 221.39 27.5858 223.233 28.1392 225.295L29.4281 230.096C29.9196 231.927 31.0862 233.504 32.6934 234.51L37.2243 237.345C39.0118 238.463 40.4212 240.094 41.2689 242.025L43.3192 246.695C44.0721 248.41 45.4392 249.781 47.1518 250.538L52.174 252.761C54.078 253.603 55.6886 254.993 56.801 256.753L59.6036 261.186C60.592 262.75 62.1235 263.893 63.9037 264.396L69.3138 265.925C71.2931 266.485 73.0645 267.613 74.4082 269.17L77.932 273.254C79.1269 274.639 80.7868 275.54 82.5993 275.786L88.2715 276.558C90.2879 276.832 92.1812 277.687 93.721 279.017L97.9087 282.636C99.2798 283.821 101.034 284.469 102.846 284.461L108.637 284.435C110.655 284.426 112.634 284.999 114.335 286.085L119.101 289.129C120.618 290.098 122.433 290.488 124.215 290.23L129.973 289.394C131.96 289.106 133.988 289.393 135.816 290.222L141.051 292.595C142.685 293.335 144.53 293.466 146.251 292.963L151.821 291.334C153.745 290.772 155.79 290.772 157.713 291.334L163.283 292.963C165.005 293.466 166.85 293.335 168.484 292.595L173.718 290.222C175.547 289.393 177.575 289.106 179.562 289.394L185.32 290.23C187.101 290.488 188.916 290.098 190.433 289.129L195.2 286.085C196.901 284.999 198.879 284.426 200.897 284.435L206.689 284.461C208.501 284.469 210.255 283.821 211.626 282.636L215.814 279.017C217.353 277.687 219.247 276.832 221.263 276.558L226.935 275.786C228.748 275.54 230.408 274.639 231.603 273.254L235.126 269.17C236.47 267.613 238.242 266.485 240.221 265.925L245.631 264.396C247.411 263.893 248.943 262.75 249.931 261.186L252.734 256.753C253.846 254.993 255.457 253.603 257.361 252.761L262.383 250.538C264.095 249.781 265.463 248.41 266.215 246.695L268.266 242.025C269.113 240.094 270.523 238.463 272.31 237.345L276.841 234.51C278.448 233.504 279.615 231.927 280.107 230.096L281.395 225.295C281.949 223.233 283.117 221.39 284.745 220.009L288.706 216.65C290.168 215.41 291.1 213.658 291.31 211.752L291.843 206.911C292.08 204.767 292.97 202.748 294.395 201.128L297.73 197.336C299.007 195.883 299.674 193.993 299.59 192.06L299.383 187.258C299.29 185.086 299.872 182.938 301.052 181.112L303.724 176.971C304.78 175.335 305.159 173.353 304.78 171.444L303.849 166.75C303.424 164.607 303.677 162.385 304.575 160.394L306.563 155.981C307.365 154.201 307.441 152.179 306.776 150.344L305.136 145.821C304.391 143.766 304.306 141.529 304.893 139.422L306.181 134.806C306.705 132.928 306.476 130.919 305.544 129.206L303.211 124.92C302.169 123.005 301.748 120.813 302.008 118.649L302.579 113.893C302.811 111.965 302.286 110.023 301.115 108.474L298.108 104.498C296.801 102.77 296.061 100.68 295.989 98.5147L295.827 93.6843C295.763 91.759 294.96 89.9322 293.586 88.5826L289.933 84.996C288.401 83.4924 287.367 81.5556 286.97 79.4464L286.06 74.6146C285.707 72.7407 284.654 71.0716 283.114 69.9467L278.86 66.8384C277.147 65.5866 275.853 63.8451 275.15 61.8435L273.48 57.0955C272.855 55.3178 271.583 53.8406 269.919 52.9576L265.131 50.4182C263.28 49.4365 261.765 47.9234 260.781 46.0735L258.352 41.5079C257.478 39.8647 256.024 38.6053 254.273 37.9744L249.042 36.0897C247.096 35.3883 245.4 34.1274 244.167 32.4653L240.999 28.1919C239.903 26.7146 238.303 25.6912 236.502 25.3164L230.944 24.1594C228.942 23.7426 227.105 22.7499 225.659 21.3035L221.794 17.4379C220.507 16.1507 218.796 15.3754 216.98 15.2565L211.229 14.8801C209.208 14.7478 207.268 14.0334 205.643 12.8232L201.154 9.47912C199.706 8.40061 197.917 7.8806 196.117 8.01456L190.323 8.44565C188.316 8.59496 186.309 8.16453 184.54 7.2056L179.524 4.48664C177.945 3.63064 176.111 3.3698 174.356 3.75156L168.673 4.98762C166.714 5.41377 164.673 5.27002 162.793 4.57338L157.373 2.56517C155.692 1.94219 153.843 1.94219 152.161 2.56517Z"
                  fill="url(#pattern0_1615_7404)"
                  stroke="#CECECE"
                  stroke-width="3"
                />
              </g>
            </svg>
          </figure>
          <ul class="test-section__words">
            <li
              v-if="content.red_word"
              class="test-section__words-word test-section__words-word--red"
            >
              {{ content.red_word }}
            </li>
            <li
              v-if="content.white_words[0].word"
              class="test-section__words-word test-section__words-word--1"
            >
              {{ content.white_words[0].word }}
            </li>
            <li
              v-if="content.white_words[1].word"
              class="test-section__words-word test-section__words-word--2"
            >
              {{ content.white_words[1].word }}
            </li>
            <li
              v-if="content.white_words[2].word"
              class="test-section__words-word test-section__words-word--3"
            >
              {{ content.white_words[2].word }}
            </li>
            <li
              v-if="content.white_words[3].word"
              class="test-section__words-word test-section__words-word--4"
            >
              {{ content.white_words[3].word }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MainButton from "~/components/Buttons/MainButton.vue";

export default {
  name: "TestSection",
  components: {
    MainButton,
  },
  props: {
    content: {
      type: Object,
    },
    minified: {
      type: Boolean,
      default: false,
    },
    onSlider: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.test-section {
  &__inner {
    border-radius: 50rem;
    padding: 8rem 50rem;
    background: $color_black;
    position: relative;
    z-index: 0;
    overflow: hidden;
    @media screen and (max-width: $brakepoint) {
      padding: 0 15rem;
      border-radius: 0;
    }
  }
  &__bg {
    width: 590rem;
    height: 497rem;
    background: url("/images/others/3d_shape.png") center/contain no-repeat;
    position: absolute;
    z-index: -1;
    top: -100rem;
    right: -200rem;
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
    @media screen and (max-width: $brakepoint) {
      top: auto;
      bottom: -194rem;
      right: -206rem;
    }
  }
  &__content {
    display: grid;
    grid-template-columns: auto 394rem;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: $brakepoint) {
      display: flex;
      flex-direction: column;
      gap: 70rem;
    }
  }
  &__title {
    color: $color_white;
    @include fontStyles($font_1, 32rem, 51rem, 400, 3.2rem);
    margin-bottom: 14rem;
    text-transform: uppercase;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_1, 18rem, 29rem, 400, 1.8rem);
      text-align: center;
      margin-bottom: 12rem;
    }
  }
  &__words {
    position: absolute;
  }
  &__fig {
    display: flex;
    width: 204rem;
    height: 204rem;
    padding: 4rem;
    position: relative;
    @media screen and (max-width: $brakepoint) {
      width: 310rem;
      height: 310rem;
      transform: translate(54rem, 54rem);
    }
    image {
      width: 100%;
      object-fit: cover;
    }
  }
  &__left {
    max-width: 900rem;
    @media screen and (max-width: $brakepoint) {
      max-width: unset;
      width: 100%;
      padding-top: 30rem;
    }
  }
  &__right {
    position: relative;
  }
  &__words {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &-word {
      @include fontStyles($font_3, 16rem, 19rem, 500);
      color: $color_black;
      padding: 8rem 20rem;
      border-radius: 20rem;
      background: $color_white;
      display: inline-block;
      position: absolute;
      width: max-content;
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_3, 13rem, 19rem, 400);
        padding: 6rem 20rem 4rem;
        top: auto !important;
      }
      &--red {
        @include fontStyles($font_1, 20rem, 32rem, 400, 2rem);
        padding: 10rem 20rem 6rem;
        background: $color_primary;
        color: $color_white;
        top: 12rem;
        right: 95rem;
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_1, 13rem, 21rem, 400, 1.3rem);
          background: $color_white;
          color: $color_black;
          bottom: 17rem;
          right: 15rem;
        }
      }
      &--1 {
        top: 49rem;
        right: auto;
        left: -143rem;
        @media screen and (max-width: $brakepoint) {
          left: auto;
          right: 17rem;
          bottom: 257rem;
        }
      }
      &--2 {
        top: 78rem;
        right: 65rem;
        @media screen and (max-width: $brakepoint) {
          left: 9rem;
          bottom: 35rem;
        }
      }
      &--4 {
        top: 140rem;
        right: 107rem;
        @media screen and (max-width: $brakepoint) {
          left: 9rem;
          bottom: 137rem;
        }
      }
      &--3 {
        top: 119rem;
        right: auto;
        left: -108rem;
        @media screen and (max-width: $brakepoint) {
          left: 46rem;
          bottom: 208rem;
        }
      }
    }
  }
  &--minified {
    .test-section {
      &__inner {
        min-height: 500rem;
        border-radius: 20rem;
        padding: 30rem 20rem;
        @media screen and (max-width: $brakepoint) {
          min-height: unset;
          height: 300rem;
          padding: 20rem;
        }
      }
      &__content {
        display: flex;
        flex-direction: column;
        gap: 30rem;
        @media screen and (max-width: $brakepoint) {
          gap: 0;
        }
      }
      &__bg {
        top: auto;
        bottom: -194rem;
        right: -206rem;
        @media screen and (max-width: $brakepoint) {
          bottom: -287rem;
        }
      }
      &__left {
        padding-top: 0;
      }
      &__title {
        color: $color_white;
        @include fontStyles($font_1, 26rem, 41.6rem, 400);
        margin-bottom: 12rem;
        text-transform: uppercase;
        text-align: center;
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_1, 13rem, 20.8rem, 400, 1.3rem);
          margin-bottom: 15rem;
        }
      }
      &__fig {
        display: flex;
        width: 310rem;
        height: 310rem;
        transform: translate(76rem, 86rem);
        padding: 4rem;
        position: relative;
        @media screen and (max-width: $brakepoint) {
          width: 180rem;
          height: 180rem;
          transform: translate(0, 8rem);
        }
        image {
          width: 100%;
          object-fit: cover;
        }
      }
      &__words {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        &-word {
          @include fontStyles($font_3, 15rem, unset, 400);
          color: $color_black;
          padding: 6rem 20rem 4rem;
          border-radius: 20rem;
          background: $color_bg;
          display: inline-block;
          position: absolute;
          width: max-content;
          top: auto !important;
          @media screen and (max-width: $brakepoint) {
            @include fontStyles($font_3, 12rem, 18rem, 400);
            padding: 6rem 12rem 4rem;
          }
          &--red {
            @include fontStyles($font_1, 13rem, 21rem, 400, 1.3rem);
            background: $color_white;
            color: $color_black;
            bottom: 0rem;
            right: 0rem;
            padding: 9rem 20rem 5rem;
            @media screen and (max-width: $brakepoint) {
              @include fontStyles($font_1, 12rem, 19.2rem, 400, 1.2rem);
              padding: 8rem 12rem 4rem;
              bottom: 15rem;
              right: -25rem;
            }
          }
          &--1 {
            left: auto;
            right: -22rem;
            bottom: 236rem;
            @media screen and (max-width: $brakepoint) {
              right: -30rem;
              bottom: 135rem;
            }
          }
          &--2 {
            left: -16rem;
            bottom: 20rem;
            @media screen and (max-width: $brakepoint) {
              left: -32rem;
              bottom: 20rem;
            }
          }
          &--4 {
            left: -15rem;
            bottom: 116rem;
            @media screen and (max-width: $brakepoint) {
              display: none;
            }
          }
          &--3 {
            left: 20rem;
            bottom: 191rem;
            @media screen and (max-width: $brakepoint) {
              left: -38rem;
              bottom: 122rem;
            }
          }
        }
      }
    }
  }
  &--onslider {
    .test-section {
      &__inner {
        @media screen and (max-width: $brakepoint) {
          width: 270rem;
        }
      }
    }
  }
}
</style>
