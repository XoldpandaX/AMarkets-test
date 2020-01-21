<template>
  <app :is-app-available="!isInitDataLoading" />
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
  },
};
</script>
