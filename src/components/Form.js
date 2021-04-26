import React from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';
class Form extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        };
    }
    componentWillMount(){
        if(this.props.taskEdit){
            this.setState({
                id: this.props.taskEdit.id,
                name: this.props.taskEdit.name,
                status: this.props.taskEdit.status,
            });
        }
    }
    componentWillReceiveProps(nextProp){
        if (nextProp.taskEdit && nextProp) {
            this.setState({
                id: nextProp.taskEdit.id,
                name: nextProp.taskEdit.name,
                status: nextProp.taskEdit.status,
            });  
        }else if(nextProp && nextProp.taskEdit === null){
            this.setState({
                id: '',
                name: '',
                status: false
            });  
        }
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
        this.props.onAddTask(this.state);
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
                <h3 className="panel-title">{this.props.taskEdit !== null ? 'Cập Nhật Công Việc' : 'Thêm Công Việc' }</h3>
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
                        <button type="submit" className="btn btn-warning">Lưu</button>&nbsp;
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
const mapStateToProps = state => {
    return { 

    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        onAddTask : (task) => {
            dispatch(actions.addTask(task));
        }
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Form);
