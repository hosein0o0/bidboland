class ListSign {
  static ListMandatory = {
    arp1: [
      {
        name: 'سرپرست واحد',
        value: 'unit_supervisor',
        mandatory: false,
        permission: 'arp1_unit_supervisor',
        state: 'unit_supervisor_verify',
        url: 'arp1Sign/unit_supervisor',
      },
      {
        name: 'رئیس واحد',
        value: 'unit_boss',
        mandatory: false,
        permission: 'arp1_unit_boss',
        state: 'unit_boss_verify',
        url: 'arp1Sign/unit_boss',
        hold: 'unit_supervisor_verify',
        listUser: 'unit_boss_id'
      },
      {
        name: 'رئیس اداره',
        value: 'office_boss',
        mandatory: false,
        permission: 'arp1_office_boss',
        state: 'office_boss_verify',
        url: 'arp1Sign/office_boss',
        hold: 'unit_boss_verify',
        listUser : 'office_boss_id'
      },
    ],
    arp2: [
      {
        name: 'نماینده خدمات فنی',
        value: 'technical_service_head',
        mandatory: true,
        // itemReject: [
        //     { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 },
        // ],
        permission: 'arp2_technical_service_head',
        state: 'technical_service_head_verify',
        url: 'arp2Sign/technical_service_head',
        notCanAccept: false
      },
      {
        name: 'نماینده تعمیرات',
        value: 'repairs_head',
        mandatory: false,
        // itemReject: [
        //     { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 },
        // ],
        permission: 'arp2_repairs_head',
        state: 'repairs_head_verify',
        url: 'arp2Sign/repairs_head',
        notCanAccept: false
      },
      {
        name: 'نماینده HSE',
        value: 'hse_boss',
        mandatory: false,
        // itemReject: [
        //     { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 },
        // ],
        permission: 'arp2_hse_boss',
        state: 'hse_boss_verify',
        url: 'arp2Sign/hse_boss',
        notCanAccept: false
      },
      {
        name: 'نماینده اداره متولی جلسه',
        value: 'meeting_boss',
        mandatory: false,
        // itemReject: [
        //     { name: 'ادیت صفحه', value: 'edit_this_step', accept: 0 },
        // ],
        permission: 'arp2_meeting_boss',
        state: 'meeting_boss_verify',
        url: 'arp2Sign/meeting_boss',
        notCanAccept: false
      }
    ],
    arp3: [
      {
        name: 'نماینده خدمات فنی',
        value: 'technical_agent_arp3',
        mandatory: true,

        permission: 'arp3_technical_service',
        state: 'technical_agent_arp3_verify',
        url: 'arp3Sign/technical_agent',
        notCanAccept: false,
        // listUser: 'technical_meeting_users'
      },
      {
        name: 'نماینده بهره برداری',
        value: 'operation_agent_arp3',
        mandatory: true,

        permission: 'arp3_operation_service',
        state: 'operation_agent_arp3_verify',
        url: 'arp3Sign/operation_agent',
        notCanAccept: false,
        // listUser: 'operation_meeting_users'
        // hold: 'technical_agent_arp3_verify'
      },
      {
        name: 'نماینده تعمیرات',
        value: 'repair_agent_arp3',
        mandatory: true,

        permission: 'arp3_repair_service',
        state: 'repair_agent_arp3_verify',
        url: 'arp3Sign/repair_agent',
        notCanAccept: false,
        // listUser: 'repair_meeting_users'
        // hold: 'operation_agent_arp3_verify'
      },
      {
        name: 'نماینده HSE',
        value: 'hse_agent_arp3',
        mandatory: true,

        permission: 'arp3_hse_service',
        state: 'hse_agent_arp3_verify',
        url: 'arp3Sign/hse_agent',
        notCanAccept: false,
        // listUser: 'hse_meeting_users'
        // hold: 'repair_agent_arp3_verify'
      }
    ],
    arp4: [
      {
        name: 'نماینده خدمات فنی',
        value: 'technical_agent_arp4',
        mandatory: true,
        permission: 'arp4_technical_service',
        state: 'technical_agent_arp4_verify',
        url: 'arp4Sign/technical_agent',
        notCanAccept: false,
        listUser: 'technical_agent_arp3',
        check: 'technical_agent_arp3_verify'
      },
      {
        name: 'نماینده بهره برداری',
        value: 'operation_agent_arp4',
        mandatory: true,
        check: 'operation_agent_arp3_verify',
        permission: 'arp4_operation_service',
        state: 'operation_agent_arp4_verify',
        url: 'arp4Sign/operation_agent',
        notCanAccept: false,
        listUser: 'operation_agent_arp3'
        // hold: 'technical_agent_arp4_verify'
      },
      {
        name: 'نماینده تعمیرات',
        value: 'repair_agent_arp4',
        mandatory: true,
        check: 'repair_agent_arp3_verify',
        permission: 'arp4_repair_service',
        state: 'repair_agent_arp4_verify',
        url: 'arp4Sign/repair_agent',
        notCanAccept: false,
        listUser: 'repair_agent_arp3'
        // hold: 'operation_agent_arp4_verify'
      },
      {
        name: 'نماینده HSE',
        value: 'hse_agent_arp4',
        mandatory: true,
        check: 'hse_agent_arp3_verify',
        permission: 'arp4_hse_service',
        state: 'hse_agent_arp4_verify',
        url: 'arp4Sign/hse_agent',
        notCanAccept: false,
        listUser: 'hse_agent_arp3'
        // hold: 'repair_agent_arp4_verify'
      }
    ]
  }
}
export default ListSign
