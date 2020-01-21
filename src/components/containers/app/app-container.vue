<template>
  <div>
    <app :is-app-available="!isInitDataLoading" />
    <button @click="a">notify</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { App } from '@/components/app';

export default {
  name: 'app-container',
  components: {
    App,
  },
  async created() {
    await this.init({ isErrorExist: false });
  },
  computed: {
    ...mapGetters('schedule', ['isInitDataLoading']),
  },
  methods: {
    ...mapActions('schedule', ['init']),
    ...mapActions('common', ['addNotification']),

    async a() {
      await this.addNotification({
        type: 'warning',
        text: `
        you have a lot of errors
        1 - to short name
        2 - expired card date
        3 - not your name
        4 - email exist
        5 - you should check your password
        `,
      });
    },
  },
};
</script>
