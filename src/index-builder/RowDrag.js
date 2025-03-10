import React, { Component } from 'react';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import {
    sortableContainer,
    sortableElement,
    sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import EditRow from './EditRow'
const DragHandle = sortableHandle(() =>
    <td className='handle-drag' >
        <MenuRoundedIcon />
    </td>
);
const SortableItem = sortableElement(({ value }) => (
    <tr className='item-definedColumns' >
        <td className='col-12 p-0 d-flex'>
            <DragHandle />
            <td className='col row m-0 pr-1 p-1'>
                <div className='value-definedColumns ml-auto'>
                    <label>نام تگ :</label>
                    <span className='IranSans_Bold_FA'>{value.item.tagName}</span>
                </div>
                <div className='value-definedColumns ml-auto'>
                    <label>عنوان نمایشی :</label>
                    <span className='IranSans_Bold_FA'>{value.item.title}</span>
                </div>
                <div className='value-definedColumns ml-auto'>
                    <label>نوع داده :</label>
                    <span className='IranSans_Bold_FA'>{value.item.dataType}</span>
                </div>
                {/* <div className='value-definedColumns ml-auto'>
                    <label>عنوان در دیتابیس :</label>
                    <span className='IranSans_Bold_FA'>{value.item.dataBaseTitle}</span>
                </div> */}
            </td>
            <td className='action-definedColumns'>
                <span className='edit ml-1' onClick={() => value.that.props.handleEdit(value.index)}>
                    <EditRoundedIcon />
                </span>
                <span className='delete mr-1' onClick={() => value.that.props.handleSelectDelete(value)}>
                    <DeleteRoundedIcon />
                </span>
            </td>
        </td>
        {value.that.props.state.numberEdit === value.index ?
            <EditRow {...value} />
            : ''}
    </tr>
));
const SortableContainer = sortableContainer(({ children }) => {
    return <tbody>{children}</tbody>;
});
class SortableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.state.definedColumnsList,
        };
    }
    componentDidMount() {
        this.props.getThis(this)
    }
    onSortEnd = async ({ oldIndex, newIndex }) => {
        await this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
        await this.props.handleState('definedColumnsList', this.state.items)
    };
    handleUpdate = (data) => {
        this.setState({ items: data })
    }
    render() {
        return (
            <div className='main-definedColumns'>
                <table className='w-100'>
                    <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                        {this.state.items.map((value, index) => (
                            <SortableItem key={`item-${value}`} index={index}
                                value={{
                                    item: value,
                                    index: index,
                                    that: this
                                }} />
                        ))}
                    </SortableContainer>
                </table>
            </div>
        )
    }
}
export default SortableComponent