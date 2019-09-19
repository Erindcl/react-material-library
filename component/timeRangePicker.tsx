import * as React from 'react';
import { useState } from 'react';
import { Row, Col, TimePicker, Input } from 'antd';
// import moment from 'moment';
import { get } from 'lodash';
import { TimePickerProps } from 'antd/es/time-picker';

interface IProps extends TimePickerProps {
  prefixCls?: string;
  value?: any;
  onChange?: any;
}

const TimePickerRange = (props: IProps) => {
  const {
    // prefixCls,
    // className,
    // style,
    onChange,
    value,
    disabled,
    // ...rest
  } = props;

  const [startTime, setStartTime] = useState(get(value,'start') || undefined);
  const [endTime, setEndTime] = useState(get(value,'end') || undefined);

  /*定义时间数组*/
  const Hours = Array.from(Array(24), (v, k) => k);
  const Minutes = Array.from(Array(60), (v, k) => k);
  const Seconds = Array.from(Array(60), (v, k) => k);

  const triggerChange = changedValue => {
    if (onChange) {
      let resultObj = Object.assign({}, { start: startTime, end: endTime }, changedValue);
      onChange(
        [
            resultObj.start ? resultObj.start.format('HH:mm:ss') : resultObj.start,
            resultObj.end ? resultObj.end.format('HH:mm:ss') : resultObj.end
        ]
      );
    }
  };

   /*结束时间控制-hour*/
  const disEndHouse = () => {
    if (startTime) {
      let h = startTime.hour();
      return Hours.slice(0, h);
    }
    return [];
  };

  /*结束时间控制-minute）*/
  const disEndMinute = h => {
    if (startTime) {
      if (h > startTime.hour()) return [];
      let m = startTime.minute();
      return Minutes.slice(0, m);
    }
    return [];
  };

  /*结束时间控制-second*/
  const disEndSeconds = (h, m) => {
    if (startTime) {
      if (h > startTime.hour()) return [];
      if (m > startTime.minute()) return [];
      let s = startTime.second();
      return Seconds.slice(0, s);
    }
    return [];
  };

  /*开始时间控制-hour*/
  const disStartHouse = () => {
    if (endTime) {
      let h = endTime.hour();
      return Hours.slice(h, Hours.length - 1);
    }
    return [];
  };

  /*开始时间控制-minute*/
  const disStartMinute = h => {
    if (endTime) {
      if (h < endTime.hour()) return [];
      let m = endTime.minute();
      return Minutes.slice(m, Minutes.length - 1);
    }
    return [];
  };

  /*开始时间控制-second*/
  const disStartSeconds = (h, m) => {
    if (endTime) {
      if (h < endTime.hour()) return [];
      if (m < endTime.minute()) return [];
      let s = endTime.second();
      return Seconds.slice(s, Seconds.length - 1);
    }
    return [];
  };

  return (
    <Row style={{ width: 320 }}>
        <Col span={10}>
            <TimePicker
                style={{ width: '100%' }}
                allowClear={false}
                disabled={disabled}
                onChange={(value) => {
                    setStartTime(value);
                    triggerChange({ start: value });
                }}
                value={startTime ? startTime : undefined}
                disabledHours={disStartHouse}
                disabledMinutes={disStartMinute}
                disabledSeconds={disStartSeconds}
            />
        </Col>
        <Col span={2} style={{ display: 'flex', justifyContent: 'center', marginLeft: 1 }}>
            <Input
                style={{
                    width: 30,
                    // borderLeft: 0,
                    // borderRight: 0,
                    pointerEvents: 'none',
                    backgroundColor: '#fff',
                }}
                placeholder="~"
                disabled
            />
        </Col>
        <Col span={10}>
            <TimePicker
                style={{ width: '100%' }}
                allowClear={false}
                disabled={disabled}
                onChange={(value) => {
                    setEndTime(value);
                    triggerChange({ end: value });
                }}
                value={endTime ? endTime : undefined}
                disabledHours={disEndHouse}
                disabledMinutes={disEndMinute}
                disabledSeconds={disEndSeconds}
            />
        </Col>
    </Row>
  );
};

export default TimePickerRange;
