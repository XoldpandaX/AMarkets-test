<template>
  <div>
    <form-input-fields :fields="fieldsOfForm.inputFields" />
    <form-special-fields :fields="fieldsOfForm.specialFields" />
    <form-tail-fields :fields="fieldsOfForm.tailFields" />
  </div>
</template>

<script>
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
  created() {
    this.form = this.$form.createForm(this, { name: 'coordinated' });
  },
  // this is solution for set default value to fields
  // mounted() {
  //   this.$nextTick(() => {
  //     this.form.setFieldsValue({ username: 'suka' });
  //   });
  // },
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
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'form-user-info.scss';
</style>
