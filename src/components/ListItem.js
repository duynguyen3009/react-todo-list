import React from 'react';
class ListItem extends React.Component {
    onChangeStatus = ()  => {
        this.props.onChangeStatus(this.props.task.id);
    };
    onDelete = ()  => {
        this.props.onDelete(this.props.task.id);
    };
    onEdit = ()  => {
        this.props.onEdit(this.props.task.id);
    };
    render() {
        let {name, status}   = this.props.task;
            return (
                <tr>
                    <td>{ (this.props.index) + 1}</td>
                    <td>{name}</td>
                    <td className="text-center">
                        <span className={status === true ? 'label label-success status' : 'label label-danger status'}
                            onClick={this.onChangeStatus}
                        >
                        {status === true ? 'Kích hoạt' : 'Chưa kích hoạt'}
                        </span>
                    </td>
                    <td className="text-center">
                        <button type="button" 
                                className="btn btn-warning"
                                onClick={this.onEdit}
                        >
                            <span className="fa fa-pencil mr-5"></span>Sửa
                        </button>
                        &nbsp;
                        <button type="button"
                                 className="btn btn-danger"
                                 onClick={ this.onDelete }
                        >
                            <span className="fa fa-trash mr-5"></span>Xóa
                        </button>
                    </td>
                </tr>
            );
    }
}

export default ListItem;
