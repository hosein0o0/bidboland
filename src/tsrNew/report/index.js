import { Component } from "react"
import Sidebar from "../../layout/sidebar";
import Menu from "../../layout/menu";
import { ContentReport } from "./content";
export default class ReportTsr extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { _close } = this.state
        return (
            <div className='main'>
                <div className='col-12 p-0'>
                    <div className='row m-0'>
                        <Sidebar
                            handleState={(name, value) => this.setState({ [name]: value })}
                        />
                        <div
                            className={`${_close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'
                                } dashboard`}
                        >
                            <Menu
                                nameRole=''
                                nameUrl={this.props.nameUrl}
                                previous={{ name: 'درخواست خدمات فنی', url: 'index-TSR' }}
                            />
                            <div className='w-100 row m-0 main-box-dashboard'>
                                <div className='boxes-dashboard row m-0 px-0 py-3'>
                                    <div className="w-100 h-100">
                                        <ContentReport />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}