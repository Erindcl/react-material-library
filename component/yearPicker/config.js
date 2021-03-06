export default {
  name: 'YearPicker',  // 组件名
  nameChina: '年份选择框', // 中文名
  describe: '年份选择控件',  // 描述
  dependencies: ['antd','lodash','moment'],  // 依赖包
  api: [{
    param: 'value',
    instruction: '选择年份',
    type: 'string',
    defalutValue: '-',
    example: '2019',
    requireable: '否',
  },{
    param: 'defaultValue',
    instruction: '默认选择年份',
    type: 'string',
    defalutValue: '当前年份',
    example: '2019',
    requireable: '否',
  },{
    param: 'operand',
    instruction: '一页展示年份数量',
    type: 'number',
    defalutValue: '12',
    example: '12',
    requireable: '否',
  },{
    param: 'callback',
    instruction: '年份选择改变的回调',
    type: 'function(year: string)',
    defalutValue: '-',
    example: '(year) => { console.log(year); }',
    requireable: '否',
  },{
    param: 'disabledDate',
    instruction: '不可选择的日期',
    type: '(currentDate: moment) => boolean',
    defalutValue: '-',
    example: '(current) => { return current > moment(); }',
    requireable: '否',
  }]
}