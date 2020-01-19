<template>
  <section class="home-page">
    <container-form-wizard />
  </section>
</template>

<script>
import { ContainerFormWizard } from '../container-form-wizard';

export default {
  name: 'home-page',
  components: {
    ContainerFormWizard,
  },
};
</script>

<style scoped lang="scss">
  @import 'home-page.scss';
</style>
