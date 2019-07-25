import React, { Component } from "react";
import { Icon, Row, Col } from "antd";
import "./style.less";
import { isEqual } from 'lodash';
const moment = require('moment');

class YearPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      selectedyear: ["",""],
      years: [[],[]],
    };
  }

  componentDidMount() {
    let { defaultValue, value } = this.props;
    if (value && value.length == 2) {
      this.setState({
        selectedyear: value
      })
    } else {
      this.setState({ selectedyear: defaultValue ? defaultValue : [moment().format('YYYY') - 1,moment().format('YYYY')] });
    }
    let _this = this;
    document.addEventListener(
      "click",_this.clickHandler,false
    );
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.value && isEqual(this.props.value,nextProps.value)) {
      this.setState({
        selectedyear: nextProps.value
      })
    }
  }
  componentWillUnmount() {
    let _this = this;
    document.removeEventListener(
      "click",_this.clickHandler,false
    );
  }
  clickHandler = (e) => {
    const { isShow } = this.state;
    let clsName = e.target.className;
    if (
        typeof clsName == 'string' && clsName.indexOf("calendar") === -1 &&
      e.target.tagName !== "BUTTON" &&
      isShow
    ) {
      this.hide();
    }
  }
  //初始化数据处理
  initData = (operand, defaultValue) => {
    let currVal = Number(defaultValue);
    let year = currVal - 1970;
    let curr = year % operand;
    let start = currVal - curr;
    let end = currVal + operand - 1 - curr;
    return [start, end];
  };
  //   获取年份范围数组
  getYearsArr = (start, end) => {
    let arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(Number(i));
    }
    return arr;
  };
  // 显示日历年组件
  show = () => {
    const { selectedyear } = this.state;
    let { operand } = this.props;
    operand = operand ? operand : 12;
    let seArr_0 = this.initData(operand, selectedyear[0]);
    let seArr_1 = this.initData(operand, selectedyear[1]);
    let years = [
        this.getYearsArr(...seArr_0),
        this.getYearsArr(...seArr_1)
      ];
    this.setState({ 
      isShow: true,
      years
    });
  };
  // 隐藏日期年组件
  hide = () => {
    this.setState({ isShow: false });
  };
  // 向前的年份
  prev = (index) => {
    const { years } = this.state;
    if (years[index][0] <= 1970) {
      return;
    }
    this.getNewYearRangestartAndEnd("prev",index);
  };
  // 向后的年份
  next = (index) => {
    this.getNewYearRangestartAndEnd("next",index);
  };

  //   获取新的年份
  getNewYearRangestartAndEnd = (type,index) => {
    const { years } = this.state;
    let operand = Number(this.props.operand);
    operand = operand ? operand : 12;
    let start = Number(years[index][0]);
    let end = Number(years[index][years[index].length - 1]);
    let newstart;
    let newend;
    if (type == "prev") {
      newstart = parseInt(start - operand);
      newend = parseInt(end - operand);
    }
    if (type == "next") {
      newstart = parseInt(start + operand);
      newend = parseInt(end + operand);
    }
    let newYears = index == 0 ? [this.getYearsArr(newstart,newend),years[1]] : [years[0],this.getYearsArr(newstart,newend)];
    this.setState({years:newYears});
  };

  // 选中某一年
  selects = (index,e) => {
    const { selectedyear } = this.state;
    let val = Number(e.target.value);
    if (!this.selfDisabledDate(val,index)) {
        this.hide();
        let NewSelectedyear = index == 0 ? [val,selectedyear[1]] : [selectedyear[0],val];
        this.setState({ selectedyear: NewSelectedyear });
        if (this.props.callback) {
          this.props.callback(NewSelectedyear);
        }
    }
  };

  selfDisabledDate = (item, index) => {
    const { selectedyear } = this.state;
    let value = selectedyear[index == 0 ? 1 : 0];
    let flg = index == 0 ? moment(item,'YYYY') > moment(value,'YYYY') : moment(item,'YYYY') < moment(value,'YYYY');
    return this.props.disabledDate(moment(item,'YYYY')) || flg;
  }

  renderYearPanel = (index) => {
    const { years, selectedyear } = this.state;
    return (
      <div className="calendar-container">
        <div className="calendar-head-year">
          <Icon
            type="double-left"
            className="calendar-btn prev-btn"
            title=""
            onClick={this.prev.bind(this,index)}
          />
          <span className="calendar-year-range">{`${years[index][0]}-${years[index][11]}`}</span>
          <Icon
            type="double-right"
            className="calendar-btn next-btn"
            title=""
            onClick={this.next.bind(this,index)}
            style={{ fontSize: 10 }}
          />
        </div>
        <div className="calendar-body-year">
          <ul className="calendar-year-ul">
            {years[index].map((item, indexD) => (
              <li
                key={indexD}
                title={item}
                className={
                  item == selectedyear[index]
                    ? "calendar-year-li calendar-year-selected"
                    : this.selfDisabledDate(item,index) ? "calendar-year-li calendar-year-disabled" : "calendar-year-li"
                }
              >
                <button onClick={this.selects.bind(this,index)} value={item}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const { isShow, years, selectedyear } = this.state;
    const { placement } = this.props;
    return (
      <div className="calendar-wrap">
        <div className="calendar-input">
          <input
            className="calendar-value"
            placeholder="请选择年份"
            onFocus={this.show}
            value={selectedyear[0]}
            readOnly
          />
          <span style={{ cursor: 'text', color: 'rgba(0, 0, 0, 0.45)' }}>~</span>
          <input
            className="calendar-value"
            placeholder="请选择年份"
            onFocus={this.show}
            value={selectedyear[1]}
            readOnly
          />
          <Icon type="calendar" className="calendar-icon" />
        </div>
        {isShow ? (<div className="calendar-out-box" style={placement == 'right' ? { right: 0 } : { left: 0 }}>
          <Row className="calendar-input-box">
            <Col className="calendar-input-col" span={8}>{selectedyear[0]}</Col>
            <Col className="calendar-input-col" span={1}>~</Col>
            <Col className="calendar-input-col" span={8}>{selectedyear[1]}</Col>
          </Row>
          <div className="calendar-data-box">
            {this.renderYearPanel(0)}
            {this.renderYearPanel(1)}
          </div>
        </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default YearPicker;