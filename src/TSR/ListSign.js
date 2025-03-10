class ListSign {
  static ListMandatory = {
    tsr1: [
      {
        name: 'رئیس واحد',
        value: 'unit_boss',
        itemReject: [
          { name: 'رد', value: 'verify', accept: 0 },
          { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }
        ],
        permission: 'tsr1_unit_boss_verify',
        state: 'unit_boss_verify',
        // secondState: ['office_boss_verifyssss'],
        url: 'tsr1Sign/unit_boss'
      },
      {
        name: 'رئیس اداره/امور',
        value: 'office_boss',
        mandatory: false,
        itemReject: [
          { name: 'رد', value: 'verify', accept: 0 },
          { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }
        ],
        permission: 'tsr1_office_boss_verify',
        state: 'office_boss_verify',
        url: 'tsr1Sign/office_boss',
        hold: 'unit_boss_verify'
      }
    ],
    tsr2: [
      {
        name: 'رئیس مهندسی عمومی',
        value: 'general_boss',
        mandatory: false,
        itemReject: [
          { name: 'رد', value: 'verify', accept: 0 },
          { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 },
          { name: 'ادیت صفحه قبل', value: 'edit_last_step', accept: 0 }
        ],
        permission: 'tsr2_general_boss_verify',
        state: 'general_boss_verify',
        url: 'tsr2Sign/general_boss'
      },
      {
        name: 'رئیس مهندسی فرآیند',
        value: 'process_eng',
        mandatory: false,
        itemReject: [
          { name: 'رد', value: 'verify', accept: 0 },
          { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }
        ],
        permission: 'tsr2_process_eng_verify',
        state: 'process_eng_verify',
        url: 'tsr2Sign/process_eng'
      },
      {
        name: 'رئیس بازرسی فنی',
        value: 'inspection_boss',
        mandatory: false,
        itemReject: [
          { name: 'رد', value: 'verify', accept: 0 },
          { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }
        ],
        permission: 'tsr2_inspection_boss_verify',
        state: 'inspection_boss_verify',
        url: 'tsr2Sign/inspection_boss'
      }
    ],
    tsr3: [
      {
        name: 'سرپرست',
        value: 'supervisor',
        itemReject: [
          { name: 'رد', value: 'verify', accept: 0 },
          { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }
        ],
        permission: 'tsr3_supervisor_verify',
        state: 'supervisor_verify',
        url: 'tsr3Sign/supervisor'
      },
      {
        name: 'مدیریت انرژی',
        value: 'energy_manager',
        itemReject: [
          { name: 'رد', value: 'verify', accept: 0 },
          { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }
        ],
        permission: 'tsr3_energy_manager_verify',
        state: 'energy_manager_verify',
        url: 'tsr3Sign/energy_manager',
        mandatory: true,
        hold: 'supervisor_verify'
        // notCanAccept : true
      },
      {
        name: 'رئیس مهندسی فرآیند',
        value: 'process_eng_boss',
        mandatory: false,
        itemReject: [
          { name: 'رد', value: 'verify', accept: 0 },
          { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }
        ],
        permission: 'tsr3_process_eng_boss_verify',
        state: 'process_eng_boss_verify',
        url: 'tsr3Sign/process_eng_boss',
        hold: 'supervisor_verify'
      }
    ],
    tsr4: [
      {
        name: 'رئیس ایمنی و آتش نشانی',
        value: 'hse_unit_supervisor',
        itemReject: [
          { name: 'رد', value: 'verify', accept: 0 },
          { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }
        ],
        permission: 'tsr4_hse_unit_supervisor_verify',
        state: 'hse_unit_supervisor_verify',
        url: 'tsr4Sign/hse_unit_supervisor'
      },
      {
        name: 'کارشناس HSE',
        value: 'hse_technician',
        mandatory: false,
        itemReject: [
          { name: 'رد', value: 'verify', accept: 0 },
          { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }
        ],
        permission: 'tsr4_hse_technician_verify',
        state: 'hse_technician_verify',
        url: 'tsr4Sign/hse_technician',
        hold: 'hse_unit_supervisor_verify'
        // notCanAccept : true
      },
      {
        name: 'رئیس امور HSE',
        value: 'hse_boss',
        mandatory: false,
        itemReject: [
          { name: 'رد', value: 'verify', accept: 0 },
          { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }
        ],
        permission: 'tsr4_hse_boss_verify',
        state: 'hse_boss_verify',
        url: 'tsr4Sign/hse_boss',
        hold: 'hse_technician_verify'
      }
    ],
    tsr5: [
      {
        name: 'سرپرست',
        value: 'supervisor',
        itemReject: [
          { name: 'رد', value: 'verify', accept: 0 },
          { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }
        ],
        permission: 'tsr5_supervisor_verify',
        state: 'supervisor_verify',
        url: 'tsr5Sign/supervisor'
      },
      {
        name: 'رئیس مهندسی عمومی',
        value: 'general_eng',
        mandatory: false,
        itemReject: [
          { name: 'رد', value: 'verify', accept: 0 },
          { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 },
          { name: 'ادیت صفحه قبل', value: 'edit_last_step', accept: 0 }
        ],
        permission: 'tsr5_general_eng_verify',
        state: 'general_eng_verify',
        url: 'tsr5Sign/general_eng',
        hold: 'supervisor_verify'
      }
    ],
    tsr6: [
      {
        name: 'رئیس مهندسی فرآیند',
        value: 'process_eng_boss',
        // itemReject: [
        // ],
        permission: 'tsr6_process_eng_boss',
        state: 'process_eng_boss_verify',
        url: 'tsr6Sign/process_eng_boss'
      },
      {
        name: 'رئیس مهندسی عمومی',
        value: 'general_eng_boss',
        mandatory: false,
        itemReject: [
          { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 },
          { name: 'ادیت صفحه قبل', value: 'edit_last_step', accept: 0 }
        ],
        permission: 'tsr6_general_eng_boss',
        state: 'general_eng_boss_verify',
        url: 'tsr6Sign/general_eng_boss'
      },
      {
        name: 'رئیس بازرسی فنی',
        value: 'technical_inspector_boss',
        // itemReject: [
        // ],
        permission: 'tsr6_technical_inspector_boss',
        state: 'technical_inspector_boss_verify',
        url: 'tsr6Sign/technical_inspector_boss'
      },
      {
        name: 'رئیس خدمات فنی',
        value: 'technical_service_boss',
        mandatory: false,
        itemReject: [
          { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 },
          { name: 'ادیت صفحه قبل', value: 'edit_last_step', accept: 0 }
        ],
        permission: 'tsr6_technical_service_boss',
        state: 'technical_service_boss_verify',
        url: 'tsr6Sign/technical_service_boss'
      }
    ],
    tsr7: [
      // {
      //     name: 'مهندسی مسئول',
      //     value: 'leader',
      //     itemReject: [
      //         { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 },
      //     ],
      //     permission: 'tsr7_leader',
      //     state: 'leader_verify',
      //     url: 'tsr7Sign/leader',
      //     notCanAccept: true
      // },
      {
        name: 'سرپرست گروه',
        value: 'leader',
        mandatory: false,
        itemReject: [{ name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }],
        permission: 'tsr7_leader',
        state: 'leader_verify',
        url: 'tsr7Sign/leader'
      },
      {
        name: 'رئیس مهندسی عمومی',
        value: 'general_eng_head',
        mandatory: false,
        itemReject: [{ name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }],
        permission: 'tsr7_general_eng_head',
        state: 'general_eng_head_verify',
        url: 'tsr7Sign/general_eng_head',
        hold: 'leader_verify'
      },
      {
        name: 'رئیس خدمات فنی',
        value: 'technical_service_head',
        mandatory: false,
        itemReject: [{ name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }],
        permission: 'tsr7_technical_service_head',
        state: 'technical_service_head_verify',
        url: 'tsr7Sign/technical_service_head',
        hold: 'general_eng_head_verify'
      }
    ],
    tsr8: [
      {
        name: 'سرپرست گروه',
        value: 'supervisor',
        itemReject: [{ name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }],
        permission: 'tsr8_supervisor',
        state: 'supervisor_verify',
        url: 'tsr8Sign/supervisor'
      },
      {
        name: 'رئیس اداره بازرسی',
        value: 'inspection',
        mandatory: false,
        itemReject: [{ name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }],
        permission: 'tsr8_inspection',
        state: 'inspection_verify',
        url: 'tsr8Sign/inspection',
        hold: 'supervisor_verify'
      }
    ],
    tsr9: [
      {
        name: 'مسئول اجرا',
        value: 'execution_responsible',
        itemReject: [{ name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }],
        permission: 'tsr9_execution_responsible',
        state: 'execution_responsible_verify',
        url: 'tsr9Sign/execution_responsible'
      },
      {
        name: 'رئیس واحد',
        value: 'unit_boss',
        itemReject: [{ name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }],
        permission: 'tsr9_unit_boss_verify',
        state: 'unit_boss_verify',
        url: 'tsr9Sign/unit_boss_verify',
        hold: 'execution_responsible_verify'
      },
      {
        name: 'برنامه ریزی تعمیرات',
        value: 'repair_planning',
        mandatory: false,
        itemReject: [{ name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }],
        permission: 'tsr9_repair_planning',
        state: 'repair_planning_verify',
        url: 'tsr9Sign/repair_planning',
        hold: 'unit_boss_verify'
      }
    ],
    tsr10: [
      {
        name: 'بهره‌برداری',
        value: 'use',
        permission: 'tsr10_use',
        state: 'use_verify',
        url: 'tsr10Sign/use',
        mandatory: false
      },
      {
        name: 'ایمنی و آتش نشانی',
        value: 'hse',
        permission: 'tsr10_hse',
        state: 'hse_verify',
        url: 'tsr10Sign/hse',
        mandatory: false
      },
      {
        name: 'مهندسی فرآیند',
        value: 'process_eng',
        permission: 'tsr10_process_eng',
        state: 'process_eng_verify',
        url: 'tsr10Sign/process_eng',
        mandatory: false
      },
      {
        name: 'بازرسی فنی',
        value: 'technical_inspection',
        permission: 'tsr10_technical_inspection',
        state: 'technical_inspection_verify',
        url: 'tsr10Sign/technical_inspection',
        mandatory: false
      },
      {
        name: 'مهندسی عمومی',
        value: 'general_eng_boss',
        mandatory: false,
        itemReject: [{ name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }],
        permission: 'tsr10_general_eng_boss',
        state: 'general_eng_boss_verify',
        url: 'tsr10Sign/general_eng_boss'
      }
    ],
    tsr11: [
      {
        name: 'سرپرست گروه',
        value: 'supervisor',
        itemReject: [{ name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }],
        permission: 'tsr11_supervisor',
        state: 'supervisor_verify',
        url: 'tsr11Sign/supervisor'
      },
      {
        name: 'رئیس مهندسی عمومی',
        value: 'general_eng_boss',
        mandatory: false,
        itemReject: [{ name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }],
        permission: 'tsr11_general_eng_boss',
        state: 'general_eng_boss_verify',
        url: 'tsr11Sign/general_eng_boss',
        hold: 'supervisor_verify'
      }
    ],
    tsr12: [
      {
        name: 'رئیس واحد',
        value: 'unit_boss',
        permission: 'tsr12_unit_boss',
        state: 'unit_boss_verify',
        url: 'tsr12Sign/unit_boss'
      },
      {
        name: 'رئیس اداره/امور',
        value: 'office_boss',
        itemReject: [{ name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 }],
        permission: 'tsr12_office_boss',
        state: 'office_boss_verify',
        url: 'tsr12Sign/office_boss',
        mandatory: false,
        hold: 'unit_boss_verify'
      }
    ]
  }
}
export default ListSign
