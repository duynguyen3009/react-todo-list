import React from 'react';
class ListItem extends React.Component {
 
  render() {
      let {index, name, status}   = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td className="text-center">
                    <span className={status === true ? 'label label-success status' : 'label label-danger status'}
                          onClick={this.onChangeStatus}
                    >
                       {status === true ? 'Kích hoạt' : 'Chưa kích hoạt'}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning">
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
  }
}

export default ListItem;
