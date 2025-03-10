class LoadData {
  constructor () {
    this.content = null
    this.listData = [
      { value: 'arp1_arp_no' },
      { value: 'arp1_created_at' },
      { value: 'arp1_area' },
      { value: 'arp1_unit' },
      { value: 'arp1_accident_type' },
      { value: 'arp1_tag_number' },
      { value: 'arp1_accident_date' },
      { value: 'arp1_accident_hour' },
      { value: 'arp1_unit_conditions' },
      { value: 'arp1_description' },
      { value: 'arp1_cause_of_accident' },
      { value: 'arp2_created_at' },
      { value: 'arp3_accident_reasons' },
      { value: 'arp3_event_description' },
      { value: 'arp3_before_occurrence' },
      { value: 'arp4_corrective_actions' }
    ]
  }
  fetchData = async () => {
    // let url = 'http://94.182.34.2:2223/refrence/arp/print/135'
    let url = window.location.href
    let array = url.split('/')
    if (url) {
      const id = array[array.length - 1]
      if (id) {
        const address = await `http://94.182.34.2:2223/refrence/arp/getForPrint/${id}`
        const cookie = await document.cookie
        const arrayCookie = await cookie.split(';')
        const numberElm = document.querySelectorAll('#number')
        if (numberElm) {
          numberElm.forEach(_number => (_number.innerHTML = id))
        }
        if (arrayCookie) {
          const filter = await arrayCookie.filter(name =>
            name.includes('token=')
          )
          if (filter) {
            let token = await filter[0]
            token = await token.replace('token=', '')
            token = token.trim()
            if (token) {
              fetch(address, {
                method: 'GET',
                headers: new Headers({
                  Authorization: `Bearer ${token}`
                })
              })
                .then(response => {
                  return response.json()
                })
                .then(async responseData => {
                  this.content = await responseData.content
                  await this.handlleData()
                })
            }
          }
        }
      }
    }
  }
  For (elm, data) {
    const name = elm.getAttribute('name')
    let obj = data[name]
    if (obj) {
      const list = Object.keys(obj).map(_ => {
        return obj[_]
      })
      const html = (itemObj, key) => {
        return `<tr class="hss"><td class="tealc">${key +
          1}</td><td class='text-center'>${
          itemObj.action
        }</td><td class='text-center'>${
          itemObj.responsible
        }</td><td class='text-center'>${
          itemObj.status
        }</td><td class='text-center'>${itemObj.description}</td></tr>`
      }
      list.forEach((itemObj, key) => {
        elm.innerHTML = elm.innerHTML + html(itemObj, key)
      })
    }
  }
  SelectMulti = (elm, data) => {
    let tikboxList = elm.querySelectorAll('.tikbox')
    const name = elm.getAttribute('name')
    let array = data[name]
    if (array) {
      array = array.split(',')
      tikboxList.forEach(tikbox => {
        const nameTik = tikbox.getAttribute('name')
        const checkTik = array.includes(nameTik)
        if (checkTik) {
          tikbox.classList.add('_checked')
        }
      })
    }
  }
  Select = (elm, data) => {
    const child = elm.childNodes
    child.forEach(_ch => {
      if (_ch.nodeName === 'SPAN') {
        const name = _ch.getAttribute('name')
        const nameParent = elm.getAttribute('name')
        const check = data[nameParent] === name
        if (check) {
          const tikbox = _ch.querySelectorAll('.tikbox')[0]
          tikbox.classList.add('_checked')
        }
      }
    })
  }
  Default = (elm, data, attr) => {
    const _value = this.listData.filter(item => item.value === elm.id)[0]
    if (_value) {
      let text = attr
        ? `${data[_value.value] ? data[_value.value] : ''} - ${
            data[attr] ? data[attr] : ''
          }`
        : data[_value.value]
        ? data[_value.value]
        : ''
      if (text) {
        elm.innerHTML = text
      }
    }
  }
  handlePage = status => {
    if (status) {
      this.page = status.page
      this.page = parseInt(this.page.replace('arp', ''))
      let i = this.page ? this.page + 1 : 0
      while (i <= 4) {
        const eleman = document.getElementById(`arp_${i}`)
        if (eleman) {
          eleman.remove()
        }
        i++
      }
    }
  }
  handleSign = data => {
    const listSign = document.querySelectorAll('.sign')
    let html = (objSign, dateSign) => {
      return `
      ${objSign.first_name &&
        objSign.last_name &&
        `<span class='d-block sign-text' style="margin-bottom : 1mm;margin-top : 1mm"> نام و نام خانوادگی : ${`${objSign.first_name} ${objSign.last_name}`}</span>`}
      ${
        dateSign && objSign.last_name && objSign.first_name
          ? `<span class='d-block sign-text' style='margin-bottom : 1mm;margin-top : 1mm'>
            تاریخ : ${data[dateSign]}
          </span>`
          : ''
      }
      ${
        objSign.sign
          ? `<img alt=${`${objSign.first_name}_${objSign.last_name}`} src=${
              objSign.sign
            } style="width : 30mm;height : 20mm;display : flex;padding : 1mm"/>`
          : ''
      }
      `
    }
    listSign.forEach(elmSign => {
      let nameSign = elmSign.getAttribute('name')
      let dateSign = elmSign.getAttribute('date')
      let objSign = data[nameSign]
      if (objSign) {
        elmSign.innerHTML = elmSign.innerHTML + html(objSign, dateSign)
      }
    })
  }
  handlleData = () => {
    const { data, status } = this.content
    this.handlePage(status)
    this.handleSign(data)
    const listValue = document.querySelectorAll('.value')
    listValue.forEach(elm => {
      const attr = elm.getAttribute('secondData')
      if (elm.id === 'for') {
        this.For(elm, data)
      } else if (elm.id === 'selectMulti') {
        this.SelectMulti(elm, data)
      } else if (elm.id === 'select') {
        this.Select(elm, data)
      } else if (elm.id === 'peyvast') {
        const peyvastList = document.querySelectorAll('#peyvast')
        peyvastList.forEach(peyvast => {
          const check =
            data.arp1_has_log_sheets === '1' ||
            data.arp1_has_trend_attachment === '1'
          peyvast.innerHTML = check ? 'دارد' : 'ندارد'
        })
      } else {
        this.Default(elm, data, attr)
      }
    })
  }
}
window.addEventListener(
  'load',
  () => {
    const load = new LoadData()
    load.fetchData()
  },
  true
)
