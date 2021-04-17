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
            tasks : [],
            isDisplayForm: true,
        };
    }
    componentWillMount(){
        if(localStorage && localStorage.getItem('tasks')){
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks,
            });
        }
    }

    gen4 = () => {
        return Math.random().toString(16).slice(-4)
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
        this.setState({
            isDisplayForm: !this.state.isDisplayForm,
        });
    }   
    
    onCloseForm = () => {
        this.setState({
            isDisplayForm: true,
        });
    }

    onSubmit = (data) => {
        let { tasks } = this.state;
        data.id = this.simpleUniqueId();
        tasks.push(data);
        this.setState({
            tasks: tasks,
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    render() {
        let { tasks, isDisplayForm }   = this.state; // task = this.state.tasks
        let elementForm = !isDisplayForm ? <Form onSubmit={this.onSubmit} onCloseForm={ this.onCloseForm }/> : '';
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
                <div className={isDisplayForm ? 'col-xs-12 col-sm-12 col-md-12 col-lg-12' : 'col-xs-8 col-sm-8 col-md-8 col-lg-8'}>
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
                            <List tasks={ tasks } />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default App;
