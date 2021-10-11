import React, { Component } from 'react'
import './App.css';
import { APIgetSamples } from './utils/api';

const initState = () => ({
    loading: true,
    error: false, // 如果加载错误
    campaigns: [],
})

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          ...initState()
      }
  }
  componentDidMount() {
      this.getData();
  }

  getData = async () => {
      this.setState({
          ...initState()
      });
      const res = await APIgetSamples() || {};
      // console.log(res)
      // setTimeout(() => {
      const random = Math.random();
      if(random > 0.7) {
          this.setState({
              campaigns: res.campaigns || [],
              loading: false,
              error: false,
          })
      } else { // 请求失败
          this.setState({
              error: true,
              loading: false,
              campaigns: []
          })
      }
      // }, 777);
  }

  render() {
      const { campaigns = [], loading, error } = this.state;
      return (
          <div className="app-page">
              {
                  !error ? (
                      !loading ? (
                          campaigns.length ?
                          <div className="campaign-list">
                              {
                                  campaigns.map((campItem) => {
                                      return <div className="campaign-item" key={campItem.id}>
                                          <div className="campaign-head">
                                              <div className="campaign-name">{campItem.campaign_name}</div>
                                          </div> 
                                      </div>
                                  })
                              }
                          </div> :
                          <div className="campaign-empty">暂无内容</div>
                      ):
                      <div className="loading">Loading...</div>
                  ) :
                  <div className="loading">
                      系统错误
                      <button onClick={this.getData}>重新加载</button>
                  </div>
              }
          </div>
      )
  }
}

export default App;
