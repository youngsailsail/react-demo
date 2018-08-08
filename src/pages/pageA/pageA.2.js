import React, { Component } from 'react';
import PageA from './pageA.1'
let pageIndex1 = 0;
let pageIndex2 = 0;
let numbers = 10;
const rowEle = (props) => (
  <div key={props.rowID} style={{ height: '150px', 'lineHeight': '50px' }}>
    {props.rowData}
  </div>
)
class pageA2 extends Component {
  constructor(props) {
    super(props);
    this.datas = {
      useBodyScroll: true,
      hasMore1: true,
      hasMore2: true,
      listData: [],
    }
  }
  componentWillMount() {
    this.genData()
  }
  //需要的数据
  genData = (pIndex = 0, type) => {
    for (let i = 0; i < 10; i++) {
      if (type === 1) {
        if ((pIndex * numbers) + i > 22) {
          this.datas.hasMore1 = false;
        } else {
          this.datas.listData.unshift('刷新的内容' + pIndex * numbers + i);
        }
      } else {
        if ((pIndex * numbers) + i > 32) {
          this.datas.hasMore2 = false;
        } else {
          this.datas.listData.push(`新增的内容 ${(pIndex * numbers) + i}`);
        }
      }
    }
    this.datas.listData = [...this.datas.listData]
    console.log(this.datas.listData,'ssss')
  }

  refresh = () => {
    this.genData(pageIndex1++, 1)
  }
  endReached = () => {
    this.genData(pageIndex2++, 2)
  }
  render() {
    return (
      <div>
        <p>我是头部内容啊啊</p>
        <PageA {...this.datas} refresh={this.refresh} endReached={this.endReached} rowEle={rowEle}></PageA>
      </div>
    )
  }
}
export default pageA2;
