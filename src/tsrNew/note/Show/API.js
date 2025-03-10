import moment from "moment-jalaali";
class API {
    convertDate = date => {
        let dataMoment = moment(date, 'YYYY-MM-DD hh:mm')
        const result = dataMoment.locale('fa').format('HH:MM - jYYYY/jMM/jDD')
        return result
    }
}
export default API