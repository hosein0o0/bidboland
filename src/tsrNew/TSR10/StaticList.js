class StaticList {
  static listTab = [
    {
      value: 'repair',
      label: 'تعمیرات'
    },
    {
      value: 'operation',
      label: 'بهره‌برداری'
    },
    {
      value: 'fire',
      label: 'ایمنی و آتش نشانی'
    },
    {
      value: 'process',
      label: 'مهندسی فرآیند'
    },
    {
      value: 'inspection',
      label: 'بازرسی فنی'
    },
    {
      value: 'general',
      label: 'مهندسی عمومی'
    }
  ]
  static defaultState = {
    repair_executed_problems: [
      {
        description: '',
        followUp: '',
        actionDate: null,
        confirmation: 'false'
      }
    ],
    operation_executed_problems: [
      {
        description: '',
        followUp: '',
        actionDate: null,
        confirmation: 'false'
      }
    ],
    fire_executed_problems: [
      {
        description: '',
        followUp: '',
        actionDate: null,
        confirmation: 'false'
      }
    ],
    process_executed_problems: [
      {
        description: '',
        followUp: '',
        actionDate: null,
        confirmation: 'false'
      }
    ],
    inspection_executed_problems: [
      {
        description: '',
        followUp: '',
        actionDate: null,
        confirmation: 'false'
      }
    ],
    general_executed_problems: [
      {
        description: '',
        followUp: '',
        actionDate: null,
        confirmation: 'false'
      }
    ]
  }
}
export default StaticList
