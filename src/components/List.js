import React from 'react';
import ListItem from './ListItem';
class List extends React.Component {
 
    render() {
        let { tasks } = this.props;
        let elmTask = tasks.map((task, index) => {
            return <ListItem key={task.id} index={index} name={task.name} status={task.status}/>;
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
                </thead>
                <tbody>
                    {elmTask}
                </tbody>
            </table>
        );
    }
}

export default List;
