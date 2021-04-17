import React from 'react';
class Form extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            status: false
        };
    }
    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        let target  = event.target;
        let name    = target.name;
        let value   = target.value;
        if(name === 'status'){
            value = target.value === 'false' ? false : true;
        }
        this.setState({
            [name] : value,
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }
    render() {
      return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">Thêm Công Việc</h3>
                <span 
                    className="fa fa-times-circle text-right"
                    onClick={ this.onCloseForm }
                >
                </span>
            </div>
            <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input  type="text" 
                                className="form-control" 
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                        />
                    </div>
                    <label>Trạng Thái :</label>
                    <select className="form-control"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                    >
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br/>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                        <button type="button" 
                                className="btn btn-danger"
                                onClick={this.onClear}
                        >
                            Hủy Bỏ
                        </button>
                    </div>
                </form>
            </div>
        </div>
      
    );
  }
}

export default Form;
