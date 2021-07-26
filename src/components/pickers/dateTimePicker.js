import React from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

let startDate = new Date();

class dateTimePicker extends React.Component {

    constructor(props) {

        super(props);
        this.state = {color: new Date()};
    }


    getValue() {
        return {[this.props.column.key]: moment(startDate).format("DD/MM/YYYY, h:mm")};
    }

    getInputNode() {
        return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
    }

    onSelect = date => {

        return this.setState({color: date}, () => this.props.onCommit());
    };
    // onChange = date => {
    //     return this.setState({ color: date }, () => this.props.onCommit());
    // };
    onChange = date => {
        startDate = date;
        this.forceUpdate()
    };


    render() {
        return <DatePicker selected={startDate} onChange={this.onChange} showTimeSelect timeIntervals={1}
                           dateFormat="dd/MM/yyyy h:mm"/>;
    }
}

export default dateTimePicker;