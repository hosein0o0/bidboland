import handleCheckText from "../../handleCheckText"
class Items {
    constructor(props) {
        this.data = props
    }
    ItemForms = () => {
        const { state } = this.data
        const { project_code } = state
        return [
            { name: 'Project Code', value: 'project_code', require: true },
            { name: 'Contractor No', value: 'contractor_no', require: true },
            { name: 'Client No', value: 'client_no', require: true },
            { name: 'Transmittal No', value: 'transmittal_no', placeholder: 'CT-MT-T-xxxxx', require: true },
            { name: 'From', value: 'from_part1', require: true },
            { name: 'From Project Office', value: 'from_part2', require: true },
            { name: 'To', value: 'to_part1', require: true },
            { name: 'To Attn', value: 'to_part2', require: true },
            { name: 'Cc', value: 'cc_part1', require: true },
            { name: 'Cc Attn', value: 'cc_part2', require: true },
            {
                name: 'Discipline', value: 'discipline', require: true, list: [
                    { value: 'EL', label: 'EL' },
                    { value: 'CV', label: 'CV' },
                    { value: 'PC', label: 'PC' },
                    { value: 'ME', label: 'ME' },
                    { value: 'SA', label: 'SA' },
                    { value: 'IN', label: 'IN' },
                    { value: 'PI', label: 'PI' },
                    { value: 'HV', label: 'HV' },
                    { value: 'PM', label: 'PM' },
                    { value: 'HS', label: 'HS' },
                ], multi: true, multiselect: true, xl: 6
            },
            {
                name: 'Class', value: '_class', require: true,
                list: [
                    { value: 'A', label: 'A' },
                    { value: 'B', label: 'B' },
                    { value: 'C', label: 'C' },
                ], multi: true, multiselect: true, xl: 6
            },
            {
                name: 'Poi', value: 'poi', require: true, list: [
                    { value: 'D-Issued For Design', label: 'D-Issued For Design' },

                    { value: 'Q-Issued For Inquiry', label: 'Q-Issued For Inquiry' },

                    { value: 'P-Issued For Order Placement', label: 'P-Issued For Order Placement' },

                    { value: 'C-Issued For Construction', label: 'C-Issued For Construction' },

                    { value: 'R-Issued For Release', label: 'R-Issued For Release' },

                    { value: 'T-Issued For Tender', label: 'T-Issued For Tender' },

                    { value: 'G-Issued For General Affairs', label: 'G-Issued For General Affairs' },

                    { value: 'B-Issued For As-Built', label: 'B-Issued For As-Built' },

                    { value: 'F-Vendor Documents', label: 'F-Vendor Documents' },
                ], multi: true, multiselect: true, xl: 12
            },
            {
                name: 'CC', value: 'cc', require: true,
                list: [
                    { value: "IFA-FOR OWNER's Approval", label: "IFA-FOR OWNER's Approval" },
                    { value: "IFR-For OWNER's Review", label: "IFR-For OWNER's Review" },
                    { value: "IFI-For OWNER's Information", label: "IFI-For OWNER's Information" },
                    { value: "IFC-Issued For Construction", label: "IFC-Issued For Construction" },
                    { value: "R-Issued For Released", label: "R-Issued For Released" },
                ], multi: true, multiselect: true, xl: 12
            },
            {
                name: 'AC', value: 'ac', require: true,
                list: [
                    { value: "0-Deemed as Approved", label: "0-Deemed as Approved" },
                    { value: "1-Approved", label: "1-Approved" },
                    { value: "2-Approved as Noted", label: "2-Approved as Noted" },
                    { value: "3-Commented", label: "3-Commented" },
                    { value: "4-Under Study", label: "4-Under Study" },
                    { value: "5-No Comment", label: "5-No Comment" },
                    { value: "6-Rejected", label: "6-Rejected" },
                    { value: "7-Not Return", label: "7-Not Return" },
                ], multi: true, multiselect: true, xl: 12
            },
            {
                name: 'Status', value: 'status', require: true,
                list: [
                    { value: "POI", label: "POI" },
                    { value: "CC", label: "CC" },
                    { value: "POI + CC", label: "POI + CC" },
                ], multi: true, multiselect: false, xl: 6
            },
            {
                name: 'Comment Sheet',
                value: 'comment_sheet_code',
                require: true
            },
            {
                name: 'Reply Sheet',
                value: 'reply_sheet_code',
                require: true
            },
            {
                name: 'Contractor Logo',
                value: 'contractor_logo',
                require: true,
                upload: true,
                accept: 'image/*',
                single: true,
                disabled: !handleCheckText(project_code)
            },
            {
                name: 'Client Logo',
                value: 'client_logo',
                require: true,
                upload: true,
                accept: 'image/*',
                single: true,
                disabled: !handleCheckText(project_code)
            },
            {
                name: 'Contractor Sign',
                value: 'contractor_sign',
                require: true,
                upload: true,
                accept: 'image/*',
                single: true,
                disabled: !handleCheckText(project_code)
            },
            {
                name: 'Client Sign',
                value: 'client_sign',
                require: true,
                upload: true,
                accept: 'image/*',
                single: true,
                disabled: !handleCheckText(project_code)
            },
        ]
    }
}
export default Items