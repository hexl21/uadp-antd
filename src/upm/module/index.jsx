/**
 * Created by wangjz on 2016/5/24.
 */
import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom';
import {Layout} from 'uadp-react';
import {Icon, Tooltip, Button, Table, Checkbox, Input} from 'antd';
import {Panel} from 'uadp-react'
import * as action from './action/ModuleAction'
import '../../themes/index.less'
import './style/index.less'
import ModuleTree from './component/ModuleTree'
import ModuleModal from './component/ModuleModal'
const Box = Layout.Box;
const Search = Input.Search;

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loading: false
    };
    this.cascade = false;
}

componentDidMount() {
  action.queryModule.bind(this)(0);
}

onChange(e) {
  this.cascade = e.target.checked;
  action.queryModule.bind(this)(0);
}

  render() {
    const {dataSource} = this.state;
    const columns = [
      {title: '模块名称[ID]', dataIndex: 'name', key: 'name', width: 250, render:function(text, record, index) {
        if(record.isLeaf) {
          return <span><Icon type="file" style={{marginRight:3}} />{text}[{record.id}]</span>
        }
        return <span><Icon type="folder-open" style={{marginRight:3}} />{text}</span>;}
      },
      {title: '请求路径', dataIndex: 'url', key: 'url', width: 350},
      {title: '图标', dataIndex: 'icon', key: 'icon', width: 200},
      {title: '模块描述', dataIndex: 'remark', key: 'remark', width: 350},
      {title: '操作', width: 100, render:function (text, record, index) {

        let disabled = record.isFixed ? 'disabled': null;
        return (<span>
            <Button title='修改' onClick={action.editModule.bind(this, record)} size={'small'} type="ghost" shape="circle" icon="edit" disabled={disabled}/>
          &nbsp;&nbsp;
            <Button title='删除' onClick={action.delModule.bind(this, record)} size={'small'} type="ghost" shape="circle" icon="close" disabled={disabled}/>
          </span>);
      }.bind(this)}];

    let top = (<div>
      <Button type='primary' icon="plus" onClick={action.addModule.bind(this)}>新增</Button>

      <div style={{float: 'right', paddingBottom: 3}}>
        <Search
          placeholder="功能模块名称"
          style={{ width: 200 }}
          onSearch={value => action.queryModuleByName.bind(this)(value)}
        />
      </div>
    </div>);

    let extra = (<Checkbox onChange={this.onChange.bind(this)}>级联显示</Checkbox>);
    return (
      <Layout>
        <Box region="west" style={{width: 300}}>
          <Panel fit={true} border={true} title="功能模块树" extra={extra}>
            <ModuleTree ref={(ref)=>this.tree=ref} onSelect={action.onSelect.bind(this)}></ModuleTree>
          </Panel>
        </Box>
        <Box region="center" style={{overflow: 'hidden'}}>
          <Panel fit={true} title={top} ref={(ref)=>this.ref = ref}>
          <Table rowKey="id" size={'middle'} bordered={true} dataSource={dataSource} columns={columns} pagination={false}></Table>
          <ModuleModal width={500} loading={this.state.loading} onOk={action.saveModule.bind(this)}/>
        </Panel>
        </Box>
      </Layout>
    )
  }
}

render(<Root/>, document.getElementById('root'))