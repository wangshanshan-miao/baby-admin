const components = [
  {
    title: '基础字段',
    children: [
      {
        title: '单行文本',
        init: {
          eType: 'el-input',
          w: 2,
          h: 5
        }
      },
      {
        title: '整数',
        init: {
          eType: 'el-input-number',
          w: 2,
          h: 4
        }
      }
    ]
  },
  {
    title: '高级字段',
    children: [
      {
        title: '日期选择器',
        init: {
          eType: 'el-date-picker',
          w: 2,
          h: 4
        }
      }
    ]
  }
]

export default components
