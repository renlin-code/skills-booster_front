<template>
  <div class="autor-card sb-noselect" :class="{ 'autor-card--many': autors.length > 1 }">
    <div class="autor-card__inner">
      <span class="autor-card__title">{{ title }}</span>
      <div class="autor-card__figures">
        <figure class="autor-card__figure">
          <img :src="autors[0].image" alt="" />
        </figure>
        <figure class="autor-card__figure" v-if="autors[1]">
          <img :src="autors[1].image" alt="" />
        </figure>
      </div>
      <div class="autor-card__names">
        <span>{{ autors[0].name }}</span>
        <span v-if="autors[1]">& {{ autors[1].name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AutorCard",
  props: {
    title: {
      type: String,
    },
    autors: {
      type: Array,
    },
  },
};
</script>

<style scoped lang="scss">
.autor-card {
  &__inner {
    border-radius: 20rem;
    background: $color_black;
    padding: 40rem;
    min-height: 500rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 26rem;
    @media screen and (max-width: $brakepoint) {
      padding: 20rem;
      gap: 15rem;
      min-height: unset;
      margin: 0 15rem;
    }
  }
  &__title {
    color: $color_white;
    @include fontStyles($font_1, 28rem, 44.8rem, 400);
    text-align: center;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_1, 18rem, 28.8rem, 400, 1.8rem);
    }
  }
  &__figure {
    display: flex;
    width: 243rem;
    height: 243rem;
    padding: 10rem;
    position: relative;
    @media screen and (max-width: $brakepoint) {
      width: 87rem;
      height: 87rem;
      padding: 4rem;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("/images/others/img_border2.svg") center/contain no-repeat;
      @media screen and (max-width: $brakepoint) {
      }
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  &__names {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      color: $color_white;
      @include fontStyles($font_2, 26rem, 41.6rem, 600);
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_2, 16rem, 24rem, 700, 0.8rem);
      }
    }
  }
  &--many {
    .autor-card {
      &__figures {
        height: 200rem;
        position: relative;
        width: 100%;
        @media screen and (max-width: $brakepoint) {
          height: 97rem;
        }
      }
      &__inner {
        @media screen and (max-width: $brakepoint) {
          margin: 0;
        }
      }
      &__figure {
        width: 160rem;
        height: 160rem;
        padding: 7rem;
        position: absolute;
        @media screen and (max-width: $brakepoint) {
          width: 87rem;
          height: 87rem;
          padding: 4rem;
        }
        &:nth-child(1) {
          left: 20rem;
          top: 0;
          @media screen and (max-width: $brakepoint) {
            left: 49rem;
            top: auto;
            bottom: 0;
          }
        }
        &:nth-child(2) {
          right: 20rem;
          bottom: 0;
          @media screen and (max-width: $brakepoint) {
            right: 49rem;
            bottom: auto;
            top: 0;
          }
        }
      }
    }
  }
}
</style>
