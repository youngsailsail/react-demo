import React from 'react'/* eslint no-dupe-keys: 0 *//* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView } from 'antd-mobile';
import ReactDOM from 'react-dom'
let dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});
class NewPage extends React.Component {
  constructor(props) {
    super(props);
    this.isLoading = true;
    this.refreshing = true;
    this.height = document.documentElement.clientHeight;
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
        alert(346654)
    if (nextProps.listData !== this.props.listData) {
      this.refresh(nextProps.listData);
    }
  }

  componentWillMount() {
    if (this.props.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      //非body容器时候listView的高度
      this.height -= ReactDOM.findDOMNode(this.lv).offsetTop;
    }
    this.refresh(this.props.listData);
  }
  //设置dataSource更新并取消加载状态
  refresh = (listData) => {
    dataSource=dataSource.cloneWithRows(listData),
      this.isLoading = false;
    this.refreshing = false;
    console.log(dataSource, listData,'改变后的dataSource')
  }
  onRefresh = () => {
    if (this.isLoading && !this.props.hasMore2) {
      return;
    }
    this.isLoading = true;
    this.refreshing = true;
    this.props.refresh();
  };

  onEndReached = () => {
    alert(11)
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.isLoading && !this.props.hasMore) {
      return;
    }
    this.isLoading = true;
    this.refreshing = true;
    this.props.endReached();
  };

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    const RowEle = this.props.rowEle;
    const row = (rowData, sectionID, rowID) => {
      console.log(rowData, 1111);
      return (
        <RowEle rowID={rowID} rowData={rowData} />
      );
    };
    console.log(11123)
    return (<div>
      <ListView
        key={this.props.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        dataSource={dataSource}
        renderHeader={() => <span>{
          this.isLoading ? 'Loading...' : 'Loaded'
        }</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        useBodyScroll={this.props.useBodyScroll}
        style={this.props.useBodyScroll ? {} : {
          height: this.height,
          border: '1px solid #ddd',
          margin: '5px 0',
        }}
        pullToRefresh={<PullToRefresh
          refreshing={this.refreshing}
          onRefresh={this.onRefresh}
        />}
        onEndReached={this.onEndReached}
        pageSize={5}
      />
    </div>);
  }
}

export default NewPage