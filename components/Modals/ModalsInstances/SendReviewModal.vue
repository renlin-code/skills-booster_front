<template>
  <ModalWrapper closable @close="$emit('close')" title="Ваш отзыв о школе">
    <div class="send-review">
      <div class="send-review__inner">
        <form class="send-review__inner-form" @submit.prevent="submitForm">
          <div class="send-review__inner-form-fields">
            <FormField
              label-text="Ваша оценка"
              :vuelidate-data="$v.form.rate"
              :error-messages="errorMessages.rate"
            >
              <RateSelector @selectStar="selectStarHandler" />
            </FormField>
            <FormField
              label-text="Ваше имя"
              :vuelidate-data="$v.form.name"
              :error-messages="errorMessages.name"
            >
              <TextInput
                placeholder="Как вас зовут?"
                v-model="form.name"
                :error="$v.form.name.$error"
              />
            </FormField>
            <FormField
              label-text="Email"
              :vuelidate-data="$v.form.email"
              :error-messages="errorMessages.email"
            >
              <TextInput
                placeholder="info@info.com"
                v-model="form.email"
                :error="$v.form.email.$error"
              />
            </FormField>
            <FormField
              label-text="Напишите ваш отзыв"
              :vuelidate-data="$v.form.review"
              :error-messages="errorMessages.review"
            >
              <Textarea
                placeholder="Какие особенности, преимущества или недостатки вы обнаружили?"
                v-model="form.review"
                :error="$v.form.review.$error"
              />
            </FormField>
          </div>
          <Checkbox
            class="send-review__inner-form-checkbox"
            @changeChecked="checkboxHandler"
            >Даю своё согласие на обработку персональных данных в соответсвие с Политикой
            обработки данных и принимаю условия Пользовательского соглашения</Checkbox
          >
          <div class="send-review__submit">
            <MainButton type="1" :disabled="$v.$invalid && firstClick" v-if="!pending">
              Отправить
            </MainButton>
            <RingPreloader class="send-review__submit-loader" v-if="pending" />
          </div>
        </form>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import { required, email, maxLength } from "vuelidate/lib/validators";
import ModalWrapper from "~/components/Modals/ModalWrapper.vue";
import FormField from "~/components/Forms/FormField.vue";
import RateSelector from "~/components/Forms/RateSelector.vue";
import TextInput from "~/components/Forms/TextInput.vue";
import Textarea from "~/components/Forms/Textarea.vue";
import MainButton from "~/components/Buttons/MainButton.vue";
import Checkbox from "~/components/Forms/Checkbox.vue";
import RingPreloader from "~/components/Preloaders/RingPreloader.vue";

export default {
  name: "SendReviewModal",
  components: {
    ModalWrapper,
    FormField,
    RateSelector,
    TextInput,
    Textarea,
    MainButton,
    Checkbox,
    RingPreloader,
  },
  props: {
    schoolId: {
      type: Number,
    },
  },
  data: () => ({
    pending: false,
    firstClick: false,
    form: {
      rate: null,
      name: "",
      email: "",
      review: "",
      agree: null,
    },
    errorMessages: {
      rate: {
        required: "Поставьте вашу оценку",
      },
      name: {
        required: "Напишите ваше имя",
      },
      email: {
        required: "Напишите вашу почту",
        email: "Неверный формат почты",
      },
      review: {
        required: "Напишите ваш отзыв",
        maxLength: "Отзыв не может превышать 100 символов",
      },
    },
  }),
  validations: {
    form: {
      rate: {
        required,
      },
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      review: {
        required,
        maxLength: maxLength(100),
      },
      agree: {
        required,
      },
    },
  },
  methods: {
    selectStarHandler(value) {
      this.form.rate = value;
      this.$v.form.rate.$touch();
    },
    checkboxHandler(value) {
      this.form.agree = value ? value : null;
    },
    async submitForm() {
      this.firstClick = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const { slug } = this.$route.params;

        this.pending = true;
        await this.$axios.$post(
          `/wp-json/post/send_review/${this.schoolId}?name=${this.form.name}&email=${this.form.email}&rate=${this.form.rate}&text=${this.form.review}`
        );
        this.pending = false;
        this.$emit("close");
        this.$emit("success");
      }
    },
    enterKeyListen() {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.submitForm();
      });
    },
  },
  mounted() {
    this.enterKeyListen();
  },
};
</script>

<style scoped lang="scss">
.send-review {
  width: 750rem;
  @media screen and (max-width: $brakepoint) {
    width: 260rem;
  }
  &__inner {
    &-form {
      &-fields {
        display: flex;
        flex-direction: column;
        gap: 20rem;
        margin-bottom: 40rem;
        @media screen and (max-width: $brakepoint) {
          gap: 16rem;
          margin-bottom: 12rem;
        }
      }
      &-checkbox {
        margin-bottom: 40rem;
        @media screen and (max-width: $brakepoint) {
          margin-bottom: 12rem;
        }
      }
    }
  }
  &__submit {
    position: relative;
    height: 69rem;
    @media screen and (max-width: $brakepoint) {
      height: 49rem;
    }
    &-loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
