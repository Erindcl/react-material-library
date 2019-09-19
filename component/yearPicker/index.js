import React, { Component } from "react";
import { Icon } from "antd";
import "./style.less";
import { isEqual } from 'lodash';
const moment = require('moment');

class YearPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      selectedyear: "",
      years: [],
    };
  }
  componentDidMount() {
    let { defaultValue, value } = this.props;
    if (value) {
      this.setState({
        selectedyear: value
      })
    } else {
      this.setState({ selectedyear: defaultValue ? defaultValue : moment().format('YYYY') });
    }
    let _this = this;
    document.addEventListener(
      "click",
      function(e) {
        const { isShow } = _this.state;
        let clsName = e.target.className;
        if (
            typeof clsName == 'string' && clsName.indexOf("calendar") === -1 &&
          e.target.tagName !== "BUTTON" &&
          isShow
        ) {
          _this.hide();
        }
      },
      false
    );
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.value && isEqual(this.props.value,nextProps.value)) {
      this.setState({ 
        selectedyear: nextProps.value
      });
    }
  }
  //初始化数据处理
  initData = (operand, defaultValue) => {
    let currVal = Number(defaultValue);
    let year = currVal - 1970;
    let curr = year % operand;
    let start = currVal - curr;
    let end = currVal + operand - 1 - curr;
    // let start = 
    this.getYearsArr(start, end);
  };
  //   获取年份范围数组
  getYearsArr = (start, end) => {
    let arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(Number(i));
    }
    this.setState({
      years: arr
    });
  };
  // 显示日历年组件
  show = () => {
    const { selectedyear } = this.state;
    let { operand } = this.props;
    operand = operand ? operand : 12;
    this.initData(operand, selectedyear);
    this.setState({ isShow: true });
  };
  // 隐藏日期年组件
  hide = () => {
    this.setState({ isShow: false });
  };
  // 向前的年份
  prev = () => {
    const { years } = this.state;
    if (years[0] <= 1970) {
      return;
    }
    this.getNewYearRangestartAndEnd("prev");
  };
  // 向后的年份
  next = () => {
    this.getNewYearRangestartAndEnd("next");
  };

  //   获取新的年份
  getNewYearRangestartAndEnd = type => {
    const { selectedyear, years } = this.state;
    let operand = Number(this.props.operand);
    operand = operand ? operand : 12;
    let start = Number(years[0]);
    let end = Number(years[years.length - 1]);
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
    this.getYearsArr(newstart, newend);
  };

  // 选中某一年
  selects = e => {
    let val = Number(e.target.value);
    if (!this.props.disabledDate(val)) {
        this.hide();
        this.setState({ selectedyear: val });
        if (this.props.callback) {
        this.props.callback(val);
        }
    }
  };

  render() {
    const { isShow, years, selectedyear } = this.state;
    return (
      <div className="calendar-wrap">
        <div className="calendar-input">
          <input
            className="calendar-value"
            placeholder="请选择年份"
            onFocus={this.show}
            value={selectedyear}
            readOnly
          />
          <Icon type="calendar" className="calendar-icon" />
        </div>
        {isShow ? (
          <List
            data={years}
            value={selectedyear}
            prev={this.prev}
            next={this.next}
            cback={this.selects}
            disabledDate={this.props.disabledDate}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
const List = props => {
  const { data, value, prev, next, cback } = props;
  return (
    <div className="calendar-container">
      <div className="calendar-head-year">
        <Icon
          type="double-left"
          className="calendar-btn prev-btn"
          title=""
          onClick={prev}
        />
        <span className="calendar-year-range">{`${data[0]}-${data[11]}`}</span>
        <Icon
          type="double-right"
          className="calendar-btn next-btn"
          title=""
          onClick={next}
          style={{ fontSize: 10 }}
        />
      </div>
      <div className="calendar-body-year">
        <ul className="calendar-year-ul">
          {data.map((item, index) => (
            <li
              key={index}
              title={item}
              className={
                item == value
                  ? "calendar-year-li calendar-year-selected"
                  : props.disabledDate && props.disabledDate(item) ? "calendar-year-li calendar-year-disabled" : "calendar-year-li"
              }
            >
              <button onClick={cback} value={item}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default YearPicker;