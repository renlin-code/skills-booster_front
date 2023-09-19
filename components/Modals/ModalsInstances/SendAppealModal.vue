<template>
  <ModalWrapper closable @close="$emit('close')" title="Напишите ваш вопрос">
    <div class="send-appeal">
      <div class="send-appeal__inner">
        <form class="send-appeal__inner-form" @submit.prevent="submitForm">
          <div class="send-appeal__inner-form-fields">
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
              label-text="Напишите ваш вопрос"
              :vuelidate-data="$v.form.question"
              :error-messages="errorMessages.question"
            >
              <Textarea
                placeholder="Какой у вас вопрос?"
                v-model="form.question"
                :error="$v.form.question.$error"
              />
            </FormField>
          </div>
          <Checkbox
            class="send-appeal__inner-form-checkbox"
            @changeChecked="checkboxHandler"
            >Даю своё согласие на обработку персональных данных в соответсвие с Политикой
            обработки данных и принимаю условия Пользовательского соглашения</Checkbox
          >
          <div class="send-appeal__submit">
            <MainButton type="1" :disabled="$v.$invalid && firstClick" v-if="!pending">
              Отправить
            </MainButton>
            <RingPreloader class="send-appeal__submit-loader" v-if="pending" />
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
import TextInput from "~/components/Forms/TextInput.vue";
import Textarea from "~/components/Forms/Textarea.vue";
import MainButton from "~/components/Buttons/MainButton.vue";
import Checkbox from "~/components/Forms/Checkbox.vue";
import RingPreloader from "~/components/Preloaders/RingPreloader.vue";

export default {
  name: "SendAppealModal",
  components: {
    ModalWrapper,
    FormField,
    TextInput,
    Textarea,
    MainButton,
    Checkbox,
    RingPreloader,
  },
  data: () => ({
    pending: false,
    firstClick: false,
    form: {
      name: "",
      email: "",
      question: "",
      agree: null,
    },
    errorMessages: {
      name: {
        required: "Напишите ваше имя",
      },
      email: {
        required: "Напишите вашу почту",
        email: "Неверный формат почты",
      },
      question: {
        required: "Напишите ваш вопрос",
        maxLength: "Вопрос не может превышать 100 символов",
      },
    },
  }),
  validations: {
    form: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      question: {
        required,
        maxLength: maxLength(100),
      },
      agree: {
        required,
      },
    },
  },
  methods: {
    checkboxHandler(value) {
      this.form.agree = value ? value : null;
    },
    async submitForm() {
      this.firstClick = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.pending = true;

        await this.$internalApi.post(`/mailer?name=${this.form.name}&email=${this.form.email}&message=${this.form.question}`);
        this.pending = false;
        this.$emit("close");
        this.$emit("success");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.send-appeal {
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
