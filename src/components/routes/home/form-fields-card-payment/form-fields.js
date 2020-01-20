import { FORM_WIZARD_STEPS } from '@/constants';

const { FIELDS } = FORM_WIZARD_STEPS.CREDIT_CARD;

const commonSizes = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export default {
  inputFields: [
    {
      id: 'cardCode',
      label: 'Номер карты',
      placeholder: 'Введите номер карты',
      formItemLayout: commonSizes,
      decorator: [
        FIELDS.NUMBER,
        {
          rules: [
            { required: true, message: 'Введите номер карты !' },
            { pattern: /^[0-9]+$/, message: 'Допустимы только цифры' },
            { min: 20, message: 'Максимальное число цифр 20' },
            { max: 20, message: 'Максимальное число цифр 20' },
            { whitespace: true },
          ],
        },
      ],
    },
    {
      id: 'name',
      label: 'Имя владельца',
      placeholder: 'Введите ваше имя',
      formItemLayout: commonSizes,
      decorator: [
        FIELDS.NAME,
        {
          rules: [
            { required: true, message: 'Ваше имя пожалуйста !' },
            { min: 2, message: 'Не меньше двух символов' },
            { pattern: /[a-zA-Z]+/g, message: 'Только латиница' },
          ],
        },
      ],
    },
    {
      id: 'validThru',
      label: 'Переод действия',
      placeholder: '02/19',
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 12 },
          sm: { span: 8 },
        },
      },
      decorator: [
        FIELDS.VALID_THRU,
        {
          rules: [
            { required: true, message: 'Введите срок действия!' },
            {
              pattern: /^\d{2}\/\d{2}$/g,
              message: 'Пример 02/19',
            },
          ],
        },
      ],
    },
  ],
};
