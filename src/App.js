import React from 'react';
import './App.css';
import Form         from './components/Form';
import Sort         from './components/Sort';
import Search       from './components/Search';
import List         from './components/List';
import {connect}    from 'react-redux';
import * as actions from './actions/index';
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // isDisplayForm: false,
            taskEdit: null,
            filter: {
                name: '',
                status: -1,
            }
        };
    }

    
    onToggleForm = () => {
        this.props.onToggleForm();
        // if (this.state.isDisplayForm && this.state.taskEdit !== null) {
        //     this.setState({
        //         isDisplayForm: true,
        //         taskEdit: null,
        //     });
        // }else{
        //     this.setState({
        //         isDisplayForm: !this.state.isDisplayForm,
        //         taskEdit: null,
        //     });
        // }
    }   
    
    onCloseForm = () => {   
        this.setState({
            isDisplayForm: false,
        });
    }
    showForm = () => {   
        this.setState({
            isDisplayForm: true,
        });
    }


    onChangeStatus = (id) => {
        let { tasks }   = this.state;
        let index       = this.findIndex(id);
        if(index !== -1){
            tasks[index].status = !tasks[index].status;
        }
        this.setState({
            tasks : tasks,
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    onDelete = (id) => {
        let { tasks }   = this.state;
        let index       = this.findIndex(id);
        if(index !== -1){
            tasks.splice(index, 1);
        }
        this.setState({ 
            tasks : tasks,
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onEdit = (id) => {
        let { tasks }   = this.state;
        let index       = this.findIndex(id);
        let taskEdit    = tasks[index];
        this.setState({
            taskEdit : taskEdit
        });
        this.showForm();
    }

    // onFilter = (filterName, filterStatus) => {
    //     let status = parseInt(filterStatus);
    //     this.setState({
    //         filter: {
    //             name: filterName.toLowerCase(), 
    //             status: status,
    //         }
    //     });
    // }

    findIndex = (id) => {
        let { tasks }   = this.state;
        let $result     = -1;
        tasks.forEach((task, index)=>{
            if(task.id === id){
                $result = index;
            }
        })
        return $result;
    }
    render() {
        let { tasks, taskEdit, filter }   = this.state; // task = this.state.tasks
        let {isDisplayForm} = this.props;
        let elementForm = isDisplayForm  ? 
                                        <Form 
                                            onCloseForm={ this.onCloseForm }
                                            taskEdit={taskEdit}
                                        /> : '';

        // if (filter) {
        //     if (filter.name) {
        //         tasks = tasks.filter((task) => {
        //             return task.name.toLowerCase().indexOf(filter.name) !== -1;
        //         });
        //     }
            
        //     tasks = tasks.filter((task) => {
        //         if (filter.status === -1) {
        //             return tasks;
        //         }else{
        //             return task.status === (filter.status === 1 ? true : false);
        //         }
        //     });
        // }
        return (
        <div className="container mt-50">
            <div className="text-center">
                <h1>Quản Lý Công Việc</h1>
                <hr/>
            </div>
            <div className="row">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                   { elementForm }
                </div>
                <div className={isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                    <button 
                        type="button"
                        className="btn btn-primary"
                        onClick={ this.onToggleForm }
                    >
                        <span className="fa fa-plus mr-10"></span>Thêm Công Việc
                    </button>
                    <div className="row mt-20">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <Search />
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <Sort />
                        </div>
                    </div>
                    <div className="row mt-20">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <List 
                                onChangeStatus={this.onChangeStatus}
                                onDelete={this.onDelete}
                                onEdit={this.onEdit}
                                filter={this.onFilter}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
    };
};
const mapDispatchToProps = (dispatch, action) => {
    return {
        onToggleForm :  () => {
            dispatch(actions.toggleForm());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
