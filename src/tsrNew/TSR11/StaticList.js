class StaticList {
    static defaultState = {
        new_document_attachment: [
            {
                documentNumber: '',
                title: '',
                editNumber: '',
                Attachement: [],
                AttachementName: []
            }
        ],
        edited_document_attachment: [
            {
                documentNumber: '',
                title: '',
                editNumber: '',
                Attachement: [],
                AttachementName: []
            }
        ],
        documents_distribution: [
            { officeName: '', number: '' }
        ]
    }
}
export default StaticList