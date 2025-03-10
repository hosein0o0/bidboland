class StaticList {
  static list = [
    {
      // enName: 'fixed_mechanical',
      value: 'مکانیک ثابت',
      label: 'مکانیک ثابت'
      // id: '91'
    },
    {
      // enName: 'rotating_mechanical',
      value: 'مکانیک دوار',
      label: 'مکانیک دوار'
      // id: '92'
    },
    {
      // enName: 'electrical',
      value: 'برق',
      label: 'برق'
      // id: '93'
    },
    {
      // enName: 'instrument',
      value: 'ابزاردقیق',
      label: 'ابزاردقیق'
      // id: '94'
    },
    {
      // enName: 'sensitive_equipment',
      value: 'تجهیزات حساس',
      label: 'تجهیزات حساس'
      // id: '95'
    },
    {
      // enName: 'repair_services',
      value: 'سرویس های تعمیراتی',
      label: 'سرویس های تعمیراتی'
      // id: '96'
    }
  ]
  static listTab = [
    {
      value: 'fixed_mechanical',
      label: 'مکانیک ثابت',
      id: '91',
      tab : 1
    },
    {
      value: 'rotating_mechanical',
      label: 'مکانیک دوار',
      id: '92',
      tab : 2
    },
    {
      value: 'electrical',
      label: 'برق',
      id: '93',
      tab : 3
    },
    {
      value: 'instrument',
      label: 'ابزاردقیق',
      id: '94',
      tab : 4
    },
    {
      value: 'sensitive_equipment',
      label: 'تجهیزات حساس',
      id: '95',
      tab : 5
    },
    {
      value: 'repair_services',
      label: 'سرویس های تعمیراتی',
      id: '96',
      tab : 6
    }
  ]
  static defaultState = {
    fixed_mechanical_instruction: [
      {
        group: '',
        instructionNumber: '',
        dateIssuanceInstructions: null,
        wo: '',
        wODate: null,
        startDate: null,
        endDate: null
      }
    ],
    fixed_mechanical_foreign_attachment: [
      {
        documentNumber: '',
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: '',
        AttachementName: [],
        Attachement: []
      }
    ],
    fixed_mechanical_internal_attachment: [
      {
        documentNumber: null,
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: ''
      }
    ],
    rotating_mechanical_instruction: [
      {
        group: '',
        instructionNumber: '',
        dateIssuanceInstructions: null,
        wo: '',
        wODate: null,
        startDate: null,
        endDate: null
      }
    ],
    rotating_mechanical_foreign_attachment: [
      {
        documentNumber: '',
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: '',
        AttachementName: [],
        Attachement: []
      }
    ],
    rotating_mechanical_internal_attachment: [
      {
        documentNumber: null,
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: ''
      }
    ],
    electrical_instruction: [
      {
        group: '',
        instructionNumber: '',
        dateIssuanceInstructions: null,
        wo: '',
        wODate: null,
        startDate: null,
        endDate: null
      }
    ],
    electrical_foreign_attachment: [
      {
        documentNumber: '',
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: '',
        AttachementName: [],
        Attachement: []
      }
    ],
    electrical_internal_attachment: [
      {
        documentNumber: null,
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: ''
      }
    ],
    instrument_instruction: [
      {
        group: '',
        instructionNumber: '',
        dateIssuanceInstructions: null,
        wo: '',
        wODate: null,
        startDate: null,
        endDate: null
      }
    ],
    instrument_foreign_attachment: [
      {
        documentNumber: '',
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: '',
        AttachementName: [],
        Attachement: []
      }
    ],
    instrument_internal_attachment: [
      {
        documentNumber: null,
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: ''
      }
    ],
    sensitive_equipment_instruction: [
      {
        group: '',
        instructionNumber: '',
        dateIssuanceInstructions: null,
        wo: '',
        wODate: null,
        startDate: null,
        endDate: null
      }
    ],
    sensitive_equipment_foreign_attachment: [
      {
        documentNumber: '',
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: '',
        AttachementName: [],
        Attachement: []
      }
    ],
    sensitive_equipment_internal_attachment: [
      {
        documentNumber: null,
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: ''
      }
    ],
    repair_services_instruction: [
      {
        group: '',
        instructionNumber: '',
        dateIssuanceInstructions: null,
        wo: '',
        wODate: null,
        startDate: null,
        endDate: null
      }
    ],
    repair_services_foreign_attachment: [
      {
        documentNumber: '',
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: '',
        AttachementName: [],
        Attachement: []
      }
    ],
    repair_services_internal_attachment: [
      {
        documentNumber: null,
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: ''
      }
    ]
  }
  static all_groups = [{ priority: 1, group: [] }]
}
export default StaticList
