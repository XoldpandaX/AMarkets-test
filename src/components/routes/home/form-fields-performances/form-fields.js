import { FORM_WIZARD_STEPS } from '@/constants';

const { FIELDS } = FORM_WIZARD_STEPS.SCHEDULE;

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
  commonLayoutStyles: commonSizes,
  fields: [
    {
      id: '1a',
      type: 'performance',
      label: 'Спектакль',
      placeholder: 'Выбирите спектакль',
      decorator: [
        FIELDS.PERFORMANCE,
        {
          rules: [
            {
              required: true,
              message: 'Чтобы продолжить выбирите спектакль',
            },
          ],
        },
      ],
    },
    {
      id: '2b',
      type: 'schedule',
      label: 'Расписание',
      placeholder: 'Выбирите расписание',
      decorator: [
        FIELDS.SCHEDULE,
        {
          rules: [
            {
              required: true,
              message: 'Чтобы продолжить выбирите спектакль и его расписание',
            },
          ],
        },
      ],
    },
  ],
};
