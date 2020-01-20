import { FORM_WIZARD_STEPS } from '@/constants';

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
        FORM_WIZARD_STEPS.SCHEDULE.FIELDS.PERFORMANCE,
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
        FORM_WIZARD_STEPS.SCHEDULE.FIELDS.SCHEDULE,
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
