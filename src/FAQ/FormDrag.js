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
                <div className='value-definedColumns d-flex align-items-center FromDrag ml-1'>
                    <label>عنوان :</label>
                    <span className='IranSans_Bold_FA mb-0'>{value.item.title}</span>
                </div>
                <div className='value-definedColumns d-flex align-items-center FromDrag ml-1'>
                    <label>توضیحات :</label>
                    <p className='IranSans_Bold_FA mb-0'>{value.item.text}</p>
                </div>
            </td>
            <td className='action-definedColumns'>
                <span className='edit ml-1' onClick={() => value.that.props.handleEdit(value)}>
                    <EditRoundedIcon />
                </span>
                <span className='delete mr-1' onClick={() => value.that.props.handleSelectDelete(value)}>
                    <DeleteRoundedIcon />
                </span>
            </td>
        </td>
        {value.that.props.state.numberEdit === `${value.that.props.nameList}_${value.index}` ?
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
            items: [],
        };
    }
    componentDidMount() {
        this.props.getThis(this)
    }
    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps
            this.setState({
                items: this.props.state[this.props.nameList]
            })
        }
    }
    onSortEnd = async ({ oldIndex, newIndex }) => {
        await this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
        await this.props.handleState(this.props.nameList, this.state.items)
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