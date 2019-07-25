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
      
      selectedMonth: ["",""], // 当前选中的月份 ["2019-01","2019-03"]
      s_years: ["2019","2019"],
      s_months: [1,3],
      months: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
      years: ["",""],
    };
  }

  componentDidMount() {
    let { defaultValue, value } = this.props;
    let selectedMonth = value || defaultValue || [moment().subtract(1, 'years').format('YYYY-MM'),moment().format('YYYY-MM')]
    let startDate = selectedMonth[0].split('-');
    let endDate = selectedMonth[1].split('-');
    this.setState({ 
      selectedMonth,
      s_years: [Number(startDate[0]),Number(endDate[0])],
      s_months: [Number(startDate[1]),Number(endDate[1])],
      years: [Number(startDate[0]),Number(endDate[0])]
    });
    let _this = this;
    document.addEventListener(
      "click",_this.clickHandler,false
    );


  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.value && isEqual(this.props.value,nextProps.value)) {
      let startDate = nextProps.value[0].split('-');
      let endDate = nextProps.value[1].split('-');
      this.setState({ 
        selectedMonth: nextProps.value,
        s_years: [Number(startDate[0]),Number(endDate[0])],
        s_months: [Number(startDate[1]),Number(endDate[1])],
        years: [Number(startDate[0]),Number(endDate[0])]
      });
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
  // 显示日历年组件
  show = () => {
    this.setState({ 
      isShow: true
    });
  };
  // 隐藏日期年组件
  hide = () => {
    this.setState({ isShow: false });
  };
  // 向前的年份
  prev = (index) => {
    const { years } = this.state;
    if (years[index] <= 1970) {
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
    let newYear = years[index];
    if (type == "prev") {
      newYear --;
    }
    if (type == "next") {
      newYear ++;
    }
    let newYears = index == 0 ? [newYear,years[1]] : [years[0],newYear];
    this.setState({years:newYears});
  };

  // 选中某一年
  selects = (index,e) => {
    const { selectedMonth, s_months, s_years, years } = this.state;
    let val = `${years[index]}-${Number(e.target.value) > 9 ? Number(e.target.value) : '0' + e.target.value}`;
    if (!this.selfDisabledDate(val,index)) {
        this.hide();
        let NewSelectedMonth = index == 0 ? [val,selectedMonth[1]] : [selectedMonth[0],val];
        let startDate = NewSelectedMonth[0].split('-');
        let endDate = NewSelectedMonth[1].split('-');
        this.setState({ 
          selectedMonth: NewSelectedMonth,
          s_years: [Number(startDate[0]),Number(endDate[0])],
          s_months: [Number(startDate[1]),Number(endDate[1])],
        });
        this.setState({ selectedyear: NewSelectedMonth });
        if (this.props.callback) {
          this.props.callback(NewSelectedMonth);
        }
    }
  };

  selfDisabledDate = (item, index) => {
    const { selectedMonth } = this.state;
    let value = selectedMonth[index == 0 ? 1 : 0];
    let flg = index == 0 ? moment(item,'YYYY-MM') > moment(value,'YYYY-MM') : moment(item,'YYYY-MM') < moment(value,'YYYY-MM');
    return this.props.disabledDate(moment(item,'YYYY-MM')) || flg;
  }

  renderPanel = (index) => {
    const { months, selectedMonth, s_months, s_years, years } = this.state;
    return (
      <div className="calendar-container">
        <div className="calendar-head-year">
          <Icon
            type="double-left"
            className="calendar-btn prev-btn"
            title=""
            onClick={this.prev.bind(this,index)}
          />
          <span className="calendar-year-range">{years[index]}</span>
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
            {months.map((item, indexD) => (
              <li
                key={indexD}
                title={item}
                className={
                  indexD + 1 == s_months[index] && s_years[index] == years[index]
                    ? "calendar-year-li calendar-year-selected"
                    : this.selfDisabledDate(`${years[index]}-${indexD+1 > 9 ? indexD+1 : '0' + (indexD+1)}`,index) ? "calendar-year-li calendar-year-disabled" : "calendar-year-li"
                }
              >
                <button onClick={this.selects.bind(this,index)} value={indexD+1}>
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
    const { isShow, selectedMonth } = this.state;
    const { placement } = this.props;
    return (
      <div className="calendar-wrap">
        <div className="calendar-input">
          <input
            className="calendar-value"
            placeholder="请选择月份"
            onFocus={this.show}
            value={selectedMonth[0]}
            readOnly
          />
          <span style={{ cursor: 'text', color: 'rgba(0, 0, 0, 0.45)' }}>~</span>
          <input
            className="calendar-value"
            placeholder="请选择月份"
            onFocus={this.show}
            value={selectedMonth[1]}
            readOnly
          />
          <Icon type="calendar" className="calendar-icon" />
        </div>
        {isShow ? (<div className="calendar-out-box" style={placement == 'right' ? { right: 0 } : { left: 0 }}>
          <Row className="calendar-input-box">
            <Col className="calendar-input-col" span={8}>{selectedMonth[0]}</Col>
            <Col className="calendar-input-col" span={1}>~</Col>
            <Col className="calendar-input-col" span={8}>{selectedMonth[1]}</Col>
          </Row>
          <div className="calendar-data-box">
            {this.renderPanel(0)}
            {this.renderPanel(1)}
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