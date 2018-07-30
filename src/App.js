import React, {Component} from 'react';
import logo from './logo.svg';
import './App.less';
import {observable, computed} from 'mobx'
import {Button} from 'antd-mobile'

class Test {
    @observable time = 12321;

    @computed get getToal() {
        return this.time * 2
    }
}

const test = new Test();

class App extends Component {
    render() {
        return (
            <div className="App">
                <p>{test.time}</p>
                <Button type="primary">primary</Button>
            </div>
        );
    }
}

export default App;
