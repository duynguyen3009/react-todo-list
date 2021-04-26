import React from 'react';
import ListItem from './ListItem';
import {connect} from 'react-redux';
class List extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filterName : '',
            filterStatus: -1,
        };
    }

    onChange = (event) => {
        let target  = event.target;
        let name    = target.name;
        let value   = target.value;
        this.props.filter(
            name === 'filterName'   ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus,
        );
        this.setState({
            [name] : value,
        });
    }
    render() {
        let { tasks }                   = this.props;
        let {filterName, filterStatus}  = this.state;
        let elmTask = tasks.map((task, index) => {
            return <ListItem 
                        key={task.id} 
                        index={index} 
                        task={task}
                        onChangeStatus={this.props.onChangeStatus}
                        onDelete={this.props.onDelete}
                        onEdit={this.props.onEdit}
                    />;
        });
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                    <tr>
                        <th className="text-center col-md-4">
                            <div className="form-group">
                                <input  type="text" 
                                        className="form-control" 
                                        placeholder="Tìm" 
                                        name="filterName"
                                        value={filterName}
                                        onChange={this.onChange}
                                />
                            </div>
                        </th>
                        <th className="text-center col-md-4">
                            <div className="form-group">
                            <select className="form-control"
                                    name="filterStatus"
                                    value={filterStatus}
                                    onChange={this.onChange}
                            >
                                <option value={-1}>Tất cả</option>
                                <option value={1}>Kích hoạt</option>
                                <option value={0}>Chưa kích hoạt</option>
                            </select>
                            </div>
                        </th>
                       
                    </tr>
                  
                </thead>
                <tbody>
                    {elmTask}
                </tbody>
            </table>
        );
    }
}
const mapStateToProps = (state) => {
        return {
            tasks: state.tasks // todos chính là props, có thể gọi ở render
        }
   }
   
export default connect(mapStateToProps, null)(List)
// export default List;
