// import React, { Component } from 'react';
// import Cookies from 'js-cookie'
// // import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
// import {Link} from 'react-router-dom'

// export default class Dashboard extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             token : Cookies.get('token'),
//         }
//     }
//     render(){
//         return(
//             <div className='table w-100'>
//                 <table>
//                     <tbody>
//                         <tr className='header'>
//                             {this.props.header.map((data , key)=>
//                                 <th key={key}>{data.name}</th>
//                             )}
//                         </tr>
//                         {this.props.row.map((data , key)=>
//                             <tr key={key}>
//                                <td>{data.id}</td>
//                                <td>{data.unit}</td>
//                                <td>{data.date}</td>
//                                <td>{data.disc}</td>
//                                <td>{data.orginator}</td>
//                                <td>{data.issueby.first_name + " " + data.issueby.last_name}</td>
//                                <td>{data.description}</td>
//                                <td>{''}</td>
//                                <td>{''}</td>
//                                <td>{''}</td>
//                                <td>{''}</td>
//                                <td>{''}</td>
//                                <td>{''}</td>
//                                <td>{''}</td>
//                                <td>{''}</td>
//                                <td>{''}</td>
//                                <td>{''}</td>
//                                <td>{''}</td>
//                                <td>{''}</td>
//                                <td>{''}</td>
//                                <td className='action position-relative'>
//                                     {/* <Link to='#'><span className='delete'><DeleteIcon /></span></Link> */}
//                                     <Link to={`/${this.props.url}-${data.id}`}><span className='edit'><EditIcon /></span></Link>
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }
