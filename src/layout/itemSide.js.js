import StaticData from '../staticData'
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded'
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded'
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import BuildRoundedIcon from '@material-ui/icons/BuildRounded'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded'
import InsertDriveFileRoundedIcon from '@material-ui/icons/InsertDriveFileRounded'
class ItemSide {
  static defaultItem = {
    RAMPCO: [
      {
        name: 'پنل کاربری',
        path: `/Home`,
        items: [],
        nameRole: ['Home']
      },
      {
        name: 'پروژه در یک نگاه',
        path: `${StaticData.FrontIp}/lastSituation`,
        items: [],
        nameRole: ['Home']
      },
      {
        name: 'پروژه',
        nameRole: ['Home'],
        items: [
          {
            ChName: 'مدیریت مهندسی',
            nameRole: [
              'endorsment',
              'project_engineering',
              'purchase_package',
              'vpis',
              'field_engineering'
            ],
            items: [
              {
                ChName: 'صحه گذاری',
                path: '/Endorsement',
                nameRole: ['endorsment']
              },
              {
                ChName: 'مهندسی تفصیلی',
                path: '/dashboard-project-engineering',
                nameRole: ['project_engineering']
              },
              {
                ChName: 'مهندسی خرید',
                path: '/purchase-engineering',
                nameRole: ['purchase_package', 'vpis']
              },
              {
                ChName: 'مهندسی کارگاهی',
                path: '/field-engineering',
                nameRole: ['field_engineering']
              }
            ]
          },
          {
            ChName: 'مدیریت کالا',
            nameRole: [''],
            items: [
              { ChName: 'سفارش گذاری', path: '/create-mre', nameRole: [''] },
              {
                ChName: 'لیست سازندگان مورد تایید',
                path: '/avl',
                nameRole: ['']
              },
              { ChName: 'تسریع بخشی', path: '/404', nameRole: [''] },
              { ChName: 'تست و بازرسی', path: '/404', nameRole: [''] },
              { ChName: 'گمرک', path: '/404', nameRole: [''] },
              { ChName: 'حمل', path: '/404', nameRole: [''] }
            ]
          },
          {
            ChName: 'مدیریت ساخت و نصب',
            nameRole: [''],
            items: [
              { ChName: 'گزارش روزانه', path: '/daily-report', nameRole: [''] }
              // {ChName : 'سیویل' , path : '/404'},
              // {ChName : 'سازه فلزی' , path : '/404'},
              // {ChName : 'پایپینگ' , path : '/404'},
              // {ChName : 'تجهیزات دوار' , path : '/404'},
              // {ChName : 'تجهیزات ثابت' , path : '/404'},
              // {ChName : 'برق' , path : '/404'},
              // {ChName : 'ابزار دقیق' , path : '/404'},
              // {ChName : 'رنگ' , path : '/404'},
              // {ChName : 'عایق' , path : '/404'},
              // {ChName : 'انبار' , path : '/404'},
              // {ChName : 'نگهداری' , path : '/404'},
            ]
          },
          { ChName: 'مدیریت راه اندازی', path: '/404', nameRole: [''] }
        ]
      },
      {
        name: 'مدیریت پروژه',
        nameRole: [''],
        items: [
          { ChName: 'مدیریت زمان', path: '/404', nameRole: [''] },
          {
            ChName: 'مدیریت هزینه',
            nameRole: [''],
            items: [
              { ChName: 'برآورد هزینه', path: '/404', nameRole: [''] },
              { ChName: 'بودجه بندی', path: '/404', nameRole: [''] },
              { ChName: 'کنترل هزینه و بودجه', path: '/404', nameRole: [''] }
            ]
          },
          {
            ChName: 'مدیریت منابع',
            nameRole: [''],
            items: [
              { ChName: 'ماشین آلات', path: '/404', nameRole: [''] },
              { ChName: 'نیروی انسانی', path: '/404', nameRole: [''] }
            ]
          },
          {
            ChName: 'مدیریت ریسک',
            nameRole: [''],
            items: [
              { ChName: 'ساختار شکست ریسک RBS', path: '/404', nameRole: [''] },
              { ChName: 'فرم ثبت ریسک', path: '/404', nameRole: [''] },
              { ChName: 'فرم آنالیز ریسک', path: '/404', nameRole: [''] },
              { ChName: 'فرم SWOT ریسک', path: '/404', nameRole: [''] }
            ]
          },
          { ChName: 'مدیریت محدوده قراردادها', path: '/404', nameRole: [''] },
          { ChName: 'مدیریت کیفیت', path: '/404', nameRole: [''] },
          { ChName: 'مدیریت ذی نفعان', path: '/404', nameRole: [''] },
          { ChName: 'مدیریت دانش', path: '/404', nameRole: [''] },
          {
            ChName: 'مدیریت ایمنی ، بهداشت و محیط زیست',
            path: '/404',
            nameRole: ['']
          }
        ]
      },
      {
        name: 'دارا BI',
        nameRole: [''],
        items: [
          { ChName: 'داشبورد پروژه', path: '/404', nameRole: [''] },
          { ChName: 'داشبورد مهندسی', path: '/404', nameRole: [''] },
          { ChName: 'داشبورد کالا', path: '/404', nameRole: [''] },
          { ChName: 'داشبورد ساختمان و نصب', path: '/404', nameRole: [''] },
          { ChName: 'داشبورد راه اندازی', path: '/404', nameRole: [''] },
          { ChName: 'داشبورد هزینه', path: '/404', nameRole: [''] },
          { ChName: 'داشبورد زمان و محدوده', path: '/404', nameRole: [''] },
          { ChName: 'داشبورد منابع', path: '/404', nameRole: [''] },
          { ChName: 'داشبورد ریسک', path: '/404', nameRole: [''] },
          { ChName: 'داشبورد کیفیت', path: '/404', nameRole: [''] },
          { ChName: 'داشبورد ذی نفعان', path: '/404', nameRole: [''] },
          {
            ChName: 'داشبورد ایمنی ، بهداشت و محیط زیست',
            path: '/404',
            nameRole: ['']
          }
        ]
      },
      {
        name: 'زیر ساخت',
        nameRole: [''],
        items: [
          { ChName: 'پروفایل ساز', path: '/404', nameRole: [''] },
          { ChName: 'ساختار شکست کار', path: '/404', nameRole: [''] },
          // { ChName: 'ساختار شکست اطلاعات', path: '/404', nameRole: [''] },
          {
            ChName: 'دارا راهبر',
            nameRole: [''],
            items: [
              { ChName: 'مدیریت برچسب', path: '/404', nameRole: [''] },
              {
                ChName: 'مدیریت سیستم',
                path: '/system-management',
                nameRole: ['']
              },
              { ChName: 'تقویم', path: '/calendar', nameRole: [''] },
              // { ChName: 'گزارش ساز', path: '/404', nameRole: [''] },
              // { ChName: 'فرم ساز', path: '/404', nameRole: [''] },
              // { ChName: 'گردش کار', path: '/404', nameRole: [''] },
              // { ChName: 'کدینگ', path: '/404', nameRole: [''] },
              { ChName: 'مدیریت کاربران', path: '/list-user', nameRole: [''] },
              {
                ChName: 'مدیریت گروه‌های کاربری',
                path: '/index-user-group',
                nameRole: ['']
              },
              { ChName: 'تیکتینگ', path: '/404', nameRole: [''] },
              {
                ChName: 'هشدار و اعلان',
                path: '/index-notification',
                nameRole: ['']
              }
            ]
          }
        ]
      },
      {
        name: 'ابزار',
        nameRole: ['email_management', 'correspondence', 'gallery', 'standard_bank'],
        items: [
          {
            ChName: 'پست الکترونیک',
            path: '/404',
            nameRole: ['email_management']
          },
          {
            ChName: 'مدیریت مکاتبات',
            path: '/correspondence',
            nameRole: ['correspondence']
          },
          { ChName: 'مدیریت جلسات', path: '/create-meeting', nameRole: [''] },
          { ChName: 'مدیریت وظایف', path: '/404', nameRole: [''] },
          // { ChName: 'تابلو اعلانات', path: '/404', nameRole: [''] },
          // { ChName: 'آخرین وضعیت', path: '/404', nameRole: [''] },
          { ChName: 'ویدیو کنفرانس', path: '/404', nameRole: [''] },
          // { ChName: 'تماس Voip', path: '/404', nameRole: [''] },
          { ChName: 'گالری تصاویر', path: '/gallery', nameRole: ['gallery'] },
          { ChName: 'گفتگوی سازمانی', path: '/chat', nameRole: [''] },
          {
            ChName: 'کتابخانه‌ی دارا',
            path: '/dashboard_library',
            nameRole: ['standard_bank']
          }
        ]
      }
    ],
    BIDBOLAND: [
      {
        name: 'پنل کاربری',
        path: '/Home',
        nameRole: ['Home'],
        icon: () => <DashboardRoundedIcon />
      },
      {
        name: 'مرکز اسناد (DCC)',
        nameUrl: 'project_engineering',
        nameRole: [
          'project_engineering',
          'purchase_package',
          'vpis',
          'tsr_show',
          'basic_engineering',
          'detail_engineering',
          'builders_engineering',
          'pfd',
          'p&id',
          'line_list',
          'isometric',
          'instrument',
          '3d_model',
          'engineering_final_data_book',
          'equipment_final_data_book',
          'construction_final_data_book',
          'arp_show'
        ],
        icon: () => <DescriptionRoundedIcon />,
        items: [
          {
            ChName: 'اسناد پروژه',
            nameRole: ['project_engineering'],
            items: [
              {
                ChName: 'مدیریت مهندسی',
                path: '/dashboard-project-engineering',
                nameRole: ['project_engineering']
              },
              // {
              //   ChName: 'مهندسی خرید',
              //   path: '/purchase-engineering',
              //   nameRole: ['purchase_package', 'vpis']
              // }
            ]
          },
          {
            ChName: 'اسناد فرآیندی',
            nameRole: ['arp_show', 'tsr_show'],
            items: [
              {
                ChName: 'گزارش فنی حوادث (ARP)',
                path: '/index-ARP',
                nameRole: ['arp_show']
              },
              {
                ChName: 'درخواست خدمات فنی (TSR)',
                path: '/new-index-TSR',
                nameRole: ['tsr_show'],
              }
            ]
          },
          {
            ChName: 'آرشیو اسناد',
            // path: '/technical-document',
            nameRole: [
              'basic_engineering',
              'detail_engineering',
              'builders_engineering',
              'pfd',
              'p&id',
              'line_list',
              'isometric',
              'instrument',
              '3d_model',
              'engineering_final_data_book',
              'equipment_final_data_book',
              'construction_final_data_book',
              'tsr_show',
              'arp_show'
            ],
            items: [
              {
                ChName: 'اسناد مهندسی',
                path: '/engineering-document',
                nameRole: [
                  'basic_engineering',
                  'detail_engineering',
                  'builders_engineering'
                ]
              },
              {
                ChName: 'اسناد فنی',
                path: '/technical-document',
                nameRole: [
                  'pfd',
                  'p&id',
                  'line_list',
                  'isometric',
                  'instrument',
                  '3d_model'
                ]
              },
              {
                ChName: 'کتابچه‌های نهایی',
                path: '/final-data-book',
                nameRole: [
                  'engineering_final_data_book',
                  'equipment_final_data_book',
                  'construction_final_data_book'
                ]
              },
              // {
              //   ChName: 'شناسنامه تجهیزات',
              //   path: '/equipment-identify',
              //   nameRole: ['transmitter_and_gauge']
              // },
              {
                ChName: 'برگ نظرات راه اندازی (CCS)',
                path: '/launch-comments-sheet',
                nameRole: ['comment_sheet' , 'comment_sheet']
              },
            ]
          },
          // {
          //   ChName: 'سیستم جامع مدیریت',
          //   path: '/404',
          //   nameRole: ['']
          // }
        ]
      },
      {
        name: 'مدیریت سیستم',
        nameRole: [
          // 'contact',
          // 'userGroup',
          // 'panelNotification',
          // 'listUser',
          'IndexFAQ',
          'calendar',
          'work_structure'
        ],
        icon: () => <SettingsApplicationsIcon />,
        items: [
          // { ChName: 'پروفایل ساز', path: '/home', nameRole: [''] },
          { ChName: 'ساختار شکست کار', path: '/WBS', nameRole: ['work_structure', 'equipment_list', 'engineering_document_list', 'purchase_package', 'purchase_attachment_package', 'virtual_reality'] },
          { ChName: 'مدیریت مخاطبین', path: '/contact', nameRole: [''] },
          { ChName: 'مدیریت کاربران', path: '/list-user', nameRole: [''] },
          { ChName: 'مدیریت سطوح دسترسی', path: '/index-user-group', nameRole: [''] },
          // {
          //   ChName: 'دارا راهبر',
          //   nameRole: [
          //     ''
          //     // 'contact',
          //     // 'listUser',
          //     // 'userGroup',
          //     // 'panelNotification',
          //   ],
          //   items: [
          //     {
          //       ChName: 'مدیریت مخاطبین',
          //       path: '/contact',
          //       // nameRole: ['contact']
          //       nameRole: ['']
          //     },
          //     {
          //       ChName: 'مدیریت کاربران',
          //       path: '/list-user',
          //       // nameRole: ['']
          //       nameRole: ['listUser']
          //     },
          //     {
          //       ChName: 'مدیریت سطوح دسترسی',
          //       path: '/index-user-group',
          //       // nameRole: ['userGroup']
          //       nameRole: ['']
          //     },
          //   ]
          // }
        ]
      },
      // {
      //   name: 'ابزار',
      //   nameRole: ['gallery', 'standard_bank'],
      //   icon: () => <BuildRoundedIcon />,
      //   items: [
      //     { ChName: 'گالری تصاویر', path: '/gallery', nameRole: ['gallery'] },
      //     {
      //       ChName: 'بانک استاندارد',
      //       path: '/indexLibrary-standard',
      //       nameRole: ['standard_bank']
      //     }
      //   ]
      // }
    ],
    PPC: [
      {
        name: 'پنل کاربری',
        path: '/Home',
        nameRole: [''],
        icon: () => <DashboardRoundedIcon />
      },
      {
        name: 'برنامه‌ریزی تولید',
        nameRole: [''],
        items: [],
        icon: () => <SettingsRoundedIcon />
      },
      {
        name: 'دارا BI',
        nameRole: [''],
        items: [
          {
            ChName: 'محاسبه تولید',
            path: '/production-calculation',
            nameRole: ['']
          }
        ],
        icon: () => <AssessmentRoundedIcon />
      },
      {
        name: 'زیرساخت',
        nameRole: [''],
        icon: () => <InsertDriveFileRoundedIcon />,
        items: [
          { ChName: 'پروفایل ساز', path: '/home', nameRole: [''] },
          { ChName: 'ساختار شکست کار', path: '/WBS', nameRole: [''] },
          {
            ChName: 'دارا راهبر',
            nameRole: [''],
            items: [
              { ChName: 'مدیریت مخاطبین', path: '/contact', nameRole: [''] },
              { ChName: 'مدیریت کاربران', path: '/list-user', nameRole: [''] },
              {
                ChName: 'مدیریت سطوح دسترسی',
                path: '/list-user',
                nameRole: ['']
              },
              {
                ChName: 'مدیریت گروه‌های کاربری',
                path: '/index-user-group',
                nameRole: ['']
              },
              { ChName: 'تقویم', path: '/calendar', nameRole: [''] },
              { ChName: 'کدینگ', path: '/404', nameRole: [''] },
              { ChName: 'فرم ساز', path: '/list-indexes', nameRole: [''] },
              // { ChName: 'مدیریت برچسب', path: '/404', nameRole: [''] },
              { ChName: 'تیکتینگ', path: '/404', nameRole: [''] },
              {
                ChName: 'هشدار و اعلان',
                path: '/index-notification',
                nameRole: ['']
              }
            ]
          }
        ]
      },
      {
        name: 'ابزار',
        nameRole: [''],
        icon: () => <BuildRoundedIcon />,
        items: [
          {
            ChName: 'دفترچه تلفن',
            path: '/internal-phonebook',
            nameRole: ['internal_tell']
          },
          {
            ChName: 'پست الکترونیک',
            path: '/404',
            nameRole: ['email_management']
          },
          { ChName: 'مدیریت مکاتبات', path: '/404', nameRole: [''] },
          { ChName: 'مدیریت جلسات', path: '/create-meeting', nameRole: [''] },
          { ChName: 'مدیریت وظایف', path: '/404', nameRole: [''] },
          { ChName: 'ویدیو کنفرانس', path: '/404', nameRole: [''] },
          { ChName: 'تماس Voip', path: '/404', nameRole: [''] },
          { ChName: 'گالری تصاویر', path: '/gallery', nameRole: [''] },
          { ChName: 'گفتگوی سازمانی', path: '/chat', nameRole: [''] },
          { ChName: 'مدیریت فایل', path: '/404', nameRole: [''] },
          { ChName: 'دفترچه یادداشت', path: '/404', nameRole: [''] }
        ]
      }
    ],
    Pars: [
      {
        name: 'پنل کاربری',
        path: '/Home',
        nameRole: ['Home'],
        icon: () => <DashboardRoundedIcon />
      },
      {
        name: 'اطلاعات مدیریت پروژه',
        nameUrl: 'project_engineering',
        nameRole: [
          'project_engineering',
          'purchase_package',
          'vpis',
          'tsr_show',
          'basic_engineering',
          'detail_engineering',
          'builders_engineering',
          'pfd',
          'p&id',
          'line_list',
          'isometric',
          'instrument',
          '3d_model',
          'engineering_final_data_book',
          'equipment_final_data_book',
          'construction_final_data_book',
          'arp_show'
        ],
        icon: () => <DescriptionRoundedIcon />,
        items: []
        // items: [
        //   {
        //     ChName: 'اسناد پروژه',
        //     nameRole: ['project_engineering', 'purchase_package', 'vpis'],
        //     items: [
        //       {
        //         ChName: 'مهندسی پروژه',
        //         path: '/dashboard-project-engineering',
        //         nameRole: ['project_engineering']
        //       },
        //       {
        //         ChName: 'مهندسی خرید',
        //         path: '/purchase-engineering',
        //         nameRole: ['purchase_package', 'vpis']
        //       }
        //     ]
        //   },
        //   {
        //     ChName: 'آرشیو اسناد',
        //     // path: '/technical-document',
        //     nameRole: [
        //       'basic_engineering',
        //       'detail_engineering',
        //       'builders_engineering',
        //       'pfd',
        //       'p&id',
        //       'line_list',
        //       'isometric',
        //       'instrument',
        //       '3d_model',
        //       'engineering_final_data_book',
        //       'equipment_final_data_book',
        //       'construction_final_data_book',
        //       'tsr_show',
        //       'arp_show'
        //     ],
        //     items: [
        //       {
        //         ChName: 'اسناد مهندسی',
        //         path: '/engineering-document',
        //         nameRole: [
        //           'basic_engineering',
        //           'detail_engineering',
        //           'builders_engineering'
        //         ]
        //       },
        //       {
        //         ChName: 'اسناد فنی',
        //         path: '/technical-document',
        //         nameRole: [
        //           'pfd',
        //           'p&id',
        //           'line_list',
        //           'isometric',
        //           'instrument',
        //           '3d_model'
        //         ]
        //       },
        //       {
        //         ChName: 'کتابچه‌های نهایی',
        //         path: '/final-data-book',
        //         nameRole: [
        //           'engineering_final_data_book',
        //           'equipment_final_data_book',
        //           'construction_final_data_book'
        //         ]
        //       },
        //       {
        //         ChName: 'شناسنامه تجهیزات',
        //         path: '/equipment-identify',
        //         nameRole: ['transmitter_and_gauge']
        //       },
        //       {
        //         ChName: 'برگ نظرات راه اندازی (CCS)',
        //         path: '/launch-comments-sheet',
        //         nameRole: ['comment_sheet']
        //       },
        //       {
        //         ChName: 'درخواست خدمات فنی (TSR)',
        //         path: '/index-TSR',
        //         nameRole: ['tsr_show']
        //       },
        //       {
        //         ChName: 'گزارش فنی حوادث (ARP)',
        //         path: '/index-ARP',
        //         nameRole: ['arp_show']
        //       },
        //       {
        //         ChName: 'درخواست خدمات فنی (TSR)',
        //         path: '/new-index-TSR',
        //         nameRole: ['tsr_show'],
        //         _new: true
        //       }
        //     ]
        //   },
        //   {
        //     ChName: 'سیستم جامع مدیریت',
        //     path: '/404',
        //     nameRole: ['']
        //   }
        // ]
      },
      {
        name: 'مدیریت سیستم',
        nameRole: [
          // 'contact',
          // 'listUser',
          // 'userGroup',
          // 'panelNotification',
          'IndexFAQ',
          'calendar',
          'work_structure'
        ],
        icon: () => <SettingsApplicationsIcon />,
        items: [
          // { ChName: 'پروفایل ساز', path: '/home', nameRole: [''] },
          { ChName: 'ساختار شکست کار', path: '/WBS', nameRole: ['work_structure'] },
          {
            ChName: 'دارا راهبر',
            nameRole: [
              // 'contact',
              // 'listUser',
              // 'userGroup',
              // 'panelNotification',
              'IndexFAQ',
              'calendar'
            ],
            items: [
              {
                ChName: 'مدیریت مخاطبین',
                path: '/contact',
                // nameRole: ['contact']
                nameRole: ['']
              },
              {
                ChName: 'مدیریت کاربران',
                path: '/list-user',
                // nameRole: ['']
                nameRole: ['listUser']
              },
              {
                ChName: 'مدیریت سطوح دسترسی',
                path: '/index-user-group',
                // nameRole: ['userGroup']
                nameRole: ['']
              },
              // { ChName: 'مدیریت سطوح دسترسی', path: '/list-user', nameRole: [''] },
              {
                ChName: 'مدیریت اعلانات',
                path: '/panel-notification',
                // nameRole: ['panelNotification']
                nameRole: ['']
              },
              {
                ChName: 'سوالات متداول',
                path: '/index-FAQ',
                nameRole: ['IndexFAQ']
              },
              // { ChName: 'مدیریت داینامیک', path: '#', nameRole: [''] },
              // { ChName: 'مدیریت برچسب', path: '/404', nameRole: [''] },
              { ChName: 'تقویم', path: '/calendar', nameRole: ['calendar'] },
              { ChName: 'تیکتینگ', path: '/404', nameRole: [''], crsip: true },
              { ChName: 'فرم ساز', path: '/list-indexes', nameRole: [''] }
            ]
          }
        ]
      },
      {
        name: 'ابزار',
        nameRole: [
          'internal_tell',
          'email_management',
          'gallery',
          'standard_bank',
          'Home'
        ],
        icon: () => <BuildRoundedIcon />,
        items: [
          {
            ChName: 'مدیریت جلسات',
            path: '/index-metting',
            nameRole: ['Home']
          },
          {
            ChName: 'مدیریت مکاتبات',
            path: '/correspondence',
            nameRole: ['Home']
          },
          {
            ChName: 'دفترچه تلفن',
            path: '/internal-phonebook',
            nameRole: ['internal_tell']
          },
          {
            ChName: 'پست الکترونیک',
            path: '/Management-Email',
            nameRole: ['email_management'],
            disabled: false
          },
          {
            ChName: 'مدیریت وظایف',
            path: '/task-management',
            nameRole: [''],
            disabled: false
          },
          {
            ChName: 'مدیریت دانش',
            path: '/knowledge-management',
            nameRole: ['']
          },
          {
            ChName: 'تابلو اعلانات',
            path: '/index-notification',
            nameRole: ['']
          },
          { ChName: 'گالری تصاویر', path: '/gallery', nameRole: ['gallery'] },
          {
            ChName: 'گفتگوی سازمانی',
            path: '/chat',
            nameRole: [''],
            disabled: false
          },
          {
            ChName: 'بانک استاندارد',
            path: '/indexLibrary-standard',
            nameRole: ['standard_bank']
          }
        ]
      }
    ]
  }
  static VendorItem = [
    {
      name: 'ساخت ترنسمیتال',
      path: '/vendor-transmittal',
      items: []
    },
    {
      name: 'مهندسی خرید',
      path: '/purchase-engineering',
      items: []
    }
  ]
}
export default ItemSide
