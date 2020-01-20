<template>
  <div class="form-wizard__info">
    <h2>{{ infoByStep.title }}</h2>
    <hr>
    <p class="form-wizard__info-description">{{ infoByStep.description }}</p>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

import { FORM_WIZARD_STEPS } from '@/constants';

export default {
  name: 'form-wizard-info',
  props: {
    currentStepName: VueTypes.string.isRequired,
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
