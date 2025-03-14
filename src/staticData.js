let domainIp = '',
  FrontIp = '',
  Title = '',
  Name = '',
  status = '',
  ProjectName = 'BIDBOLAND',
  link_file = ''
// logoUrl = '',
let base_url = window.location.origin
switch (ProjectName) {
  case 'RAMPCO':
    FrontIp = 'http://192.168.1.51:8083/http://idms.rampcogroup.com'
    domainIp = FrontIp + '/refrence'
    Title = 'سامانه مدیریت پروژه دارا'
    Name = 'رامپکو'
    status = 'سامانه یکپارچه تصمیم ساز مدیریت پروژه دارا'
    break
  case 'BIDBOLAND':
    // FrontIp = 'http://192.168.178.25:8080'
    // FrontIp = 'http://192.168.30.81:8083/http://192.168.178.15'
    FrontIp = 'http://185.190.39.82:8050'
    // FrontIp = '/refrence'
    domainIp = FrontIp + ''
    // logoUrl = 'http://185.105.239.21'
    Title = 'DARA IDMS'
    Name = 'بیدبلند خلیج فارس'
    status = 'سامانه مدیریت اسناد الکترونیک دارا'
    link_file = `http://192.168.178.25`
    break
  case 'Pars':
    FrontIp = 'http://185.105.239.21:8083/185.105.239.21:8080'
    domainIp = FrontIp + ''
    Title = 'DARA IDMS'
    Name = 'طرح توسعه PDH-PP پتروشیمی پارس'
    status = 'سامانه مدیریت اطلاعات پروژه دارا'
    link_file = `${base_url}/refrence`
    break
  default:
    break
}
module.exports = {
  domainIp,
  FrontIp,
  Title,
  Name,
  ProjectName,
  status,
  link_file
}
