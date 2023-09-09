<template>
  <div class="ad-card">
    <div class="ad-card__inner">
      <img :src="ad.banner_image" alt="" />
      <a :href="ad.banner_link" target="_blank">
        <MainButton>Подробнее</MainButton>
      </a>
    </div>
  </div>
</template>

<script>
import MainButton from "../Buttons/MainButton.vue";

export default {
  name: "AdCard",
  components: { MainButton },
  props: {
    ad: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
.ad-card {
  &__inner {
    width: 100%;
    height: 500rem;
    border-radius: 20rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 38rem 93rem;
    position: relative;
    background: rgba($color_black, 0.3);
    @media screen and (max-width: $brakepoint) {
      height: 300rem;
      padding: 20rem;
      width: 270rem;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }
}
</style>
