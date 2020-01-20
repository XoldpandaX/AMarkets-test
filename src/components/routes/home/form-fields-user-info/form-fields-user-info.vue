<template>
  <div>
    <form-input-fields :fields="fieldsOfForm.inputFields" />
    <form-special-fields
      :fields="fieldsOfForm.specialFields"
      @payment-change="handlePaymentChange"
    />
    <form-tail-fields :fields="fieldsOfForm.tailFields" />
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import formFields from './form-fields';

import FormInputFields from './form-input-fields.vue';
import FormSpecialFields from './form-special-fields.vue';
import FormTailFields from './form-tail-fields.vue';

export default {
  name: 'form-user-info',
  components: {
    FormSpecialFields,
    FormInputFields,
    FormTailFields,
  },
  props: {
    initValues: VueTypes.object.def({}),
  },
  data() {
    return {
      formLayout: 'horizontal',
      form: null,
    };
  },
  computed: {
    fieldsOfForm() {
      return formFields;
    },
  },
  methods: {
    handlePaymentChange(paymentType) {
      this.$emit('payment-change', paymentType);
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'form-user-info.scss';
</style>
