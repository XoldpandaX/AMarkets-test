import { PAYMENT_TYPES } from '@/constants';

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

const datePickerSizes = {
  xs: { span: 24 },
  sm: { span: 20 },
};

const tailSizes = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default {
  inputFields: [
    {
      id: 'username',
      label: 'Имя',
      placeholder: 'Ваше имя',
      formItemLayout: commonSizes,
      decorator: [
        'username',
        {
          rules: [
            { required: true, message: 'Ваше имя пожалуйста !' },
            { min: 2, message: 'Не меньше двух символов' },
          ],
        },
      ],
    },
    {
      id: 'surname',
      label: 'Фамилия',
      placeholder: 'Ваша фамилия',
      formItemLayout: commonSizes,
      decorator: [
        'surname',
        {
          rules: [
            { required: true, message: 'Ваша фамилия пожалуйста !' },
            { min: 2, message: 'Не меньше двух символов' },
          ],
        },
      ],
    },
    {
      id: 'email',
      label: 'Электронная почта',
      placeholder: 'Ваша электронная почта',
      formItemLayout: commonSizes,
      decorator: [
        'email',
        {
          rules: [
            { type: 'email', message: 'Неправильный формат почты !' },
            { required: true, message: 'Ваша электронная почта пожалуйста !' },
          ],
        },
      ],
    },
  ],
  specialFields: [
    {
      id: 'birthDate',
      type: 'date-picker',
      placeholder: 'Дата рождения',
      formItemLayout: datePickerSizes,
      dateFormat: 'DD-MM-YYYY',
      decorator: [
        'birthDate',
        {
          rules: [
            { type: 'object', required: true, message: 'Выбирите дату рождения !' },
          ],
        },
      ],
    },
    {
      id: 'paymentType',
      type: 'select',
      placeholder: 'Тип оплаты',
      decorator: [
        'paymentType',
        {
          rules: [
            { required: true, message: 'Выбирите тип оплаты !' },
          ],
        },
      ],
      selectOptions: [
        {
          id: '1a',
          value: PAYMENT_TYPES.CASH,
          description: 'Оплата наличными',
        },
        {
          id: '2a',
          value: PAYMENT_TYPES.CREDIT_CARD,
          description: 'Оплата картой',
        },
      ],
    },
  ],
  tailFields: [
    {
      id: 'agreement',
      type: 'agreement',
      formItemLayout: tailSizes,
      agreementsLink: 'https://www.termsandconditionsgenerator.com/',
      linkDescription: 'правилами',
      beforeDescription: 'С',
      afterDescription: 'ознакомлен',
      decorator: [
        'agreement',
        {
          valuePropName: 'checked',
          rules: [
            { required: true, message: 'Примите соглашение' },
          ],
        },
      ],
    },
  ],
};
