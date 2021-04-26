import React from 'react';
import './App.css';
import Form         from './components/Form';
import Sort         from './components/Sort';
import Search       from './components/Search';
import List         from './components/List';
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isDisplayForm: false,
            taskEdit: null,
            filter: {
                name: '',
                status: -1,
            }
        };
    }
    // componentWillMount(){
    //     if(localStorage && localStorage.getItem('tasks')){
    //         let tasks = JSON.parse(localStorage.getItem('tasks'));
    //         this.setState({
    //             tasks : tasks,
    //         });
    //     }
    // }

    gen4 = () => {
        return Math.random().toString(16).slice(-4);
    }
      
    simpleUniqueId = (prefix) => {
        return (prefix || '').concat([
          this.gen4(),
          this.gen4(),
          this.gen4(),
          this.gen4(),
          this.gen4(),
          this.gen4(),
          this.gen4(),
        ].join(''))
    }
    generateData = () => {
        let tasks = [
            {
                id      : this.simpleUniqueId(),
                name    : 'Đi học',
                status  : true
            },
            {
                id      : this.simpleUniqueId(),
                name    : 'Đi chơi',
                status  : true
            },
            {
                id      : this.simpleUniqueId(),
                name    : 'Đi cà phê',
                status  : false
            }
        ];
        this.setState({
            tasks : tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    onToggleForm = () => {
        if (this.state.isDisplayForm && this.state.taskEdit !== null) {
            this.setState({
                isDisplayForm: true,
                taskEdit: null,
            });
        }else{
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEdit: null,
            });
        }
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

    onSubmit = (data) => {
        let { tasks } = this.state;
        if (data.id === '') {//ADD
            data.id = this.simpleUniqueId();
            tasks.push(data);
        }else{//EDIT
            let index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks: tasks,
            taskEdit: null,
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
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
        let { tasks, isDisplayForm, taskEdit, filter }   = this.state; // task = this.state.tasks
        let elementForm = isDisplayForm  ? 
                                        <Form 
                                            // onSubmit={this.onSubmit} 
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
                    <button type="button" 
                            onClick={ this.generateData }
                            className="btn btn-success ml-10">
                        <span className="fa fa-plus mr-10"></span>Tạo dữ liệu mẫu
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

export default App;
