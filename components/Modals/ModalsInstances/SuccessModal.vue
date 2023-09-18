<template>
  <ModalWrapper closable @close="$emit('close')">
    <div class="success-modal">
      <div class="success-modal__inner">
        <p class="success-modal__text"><slot /></p>
        <MainButton type="1" @click.native="$emit('close')">Ок</MainButton>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import MainButton from "~/components/Buttons/MainButton.vue";
import ModalWrapper from "../ModalWrapper.vue";

export default {
  name: "SuccessModal",
  components: { ModalWrapper, MainButton },
};
</script>

<style scoped lang="scss">
.success-modal {
  width: 600rem;
  @media screen and (max-width: $brakepoint) {
    width: 260rem;
  }
  &__text {
    @include fontStyles($font_2, 26rem, 41.6rem, 600);
    margin-bottom: 20rem;
    text-align: center;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_2, 15rem, 24rem, 700);
      margin-bottom: 12rem;
    }
  }
}
</style>
