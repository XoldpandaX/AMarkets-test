<template>
  <div class="form-wizard__info">
    <transition-group name="slide-fade">
      <template v-if="isShow">
        <h2 key="f">{{ infoByStep.title }}</h2>
        <hr key="m">
        <p
          key="g"
          class="form-wizard__info-description"
        >
          {{ infoByStep.description }}
        </p>
      </template>
    </transition-group>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import { waitFor } from '@/utils';
import { FORM_WIZARD_STEPS } from '@/constants';

export default {
  name: 'form-wizard-info',
  props: {
    currentStepName: VueTypes.string.isRequired,
  },
  data() {
    return {
      isShow: true,
    };
  },
  watch: {
    async currentStepName() {
      this.isShow = false;
      await waitFor(350);
      this.isShow = true;
    },
  },
  computed: {
    infoByStep() {
      const infoByStep = {
        [FORM_WIZARD_STEPS.SCHEDULE.NAME]: {
          title: `
          Выберите спектакль
          `,
          description: `
          Выберите спектакль и время в которое вы хотите на него пойти
          `,
        },
        [FORM_WIZARD_STEPS.USER_INFO.NAME]: {
          title: 'Введите свои данные',
          description: `
          Оставьте нам свои контактные данные, чтобы мы могли начать выпуск вашего билета.
          Помните, что все поля обязательны к заполнению
          `,
        },
        [FORM_WIZARD_STEPS.CREDIT_CARD.NAME]: {
          title: 'Введите данные банковской карты',
          description: `
          Так как вы выбрали оплату картой, то нужно заполнить все поля,
          что-бы купить билет
          `,
        },
      };

      return infoByStep[this.currentStepName];
    },
  },
};
</script>

<style lang="scss">
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
