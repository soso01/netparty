import { Component } from "react"
import Link from "next/link"
import axios from "axios"
import Room from "../components/Room"
import { Spin } from "antd"

import Layout from "../components/Layout"
import "./style/join.scss"

class Join extends Component {
  state = {
    page: 1,
    data: [],
    count: 0
  }

  async componentDidMount() {
    const data = await this.getData()
    const count = await axios.post("/api/getCount")
    this.setState({
      data: data,
      allCount: count.data.allCount,
      validCount: count.data.validCount
    })
  }

  async getData() {
    const res = await axios.post("/api/data/" + this.state.page)
    return res.data
  }

  async removeHandler(data) {
    const password = prompt("비밀번호를 입력해주세요.")
    const res = await axios.delete("/api/delete", {
      data: { password: password, data: data }
    })
    if (res.data === "success") {
      alert("삭제되었습니다.")
      window.location.reload()
    } else {
      alert("비밀번호가 일치하지 않습니다.")
    }
  }

  printData(data) {
    return (
      <div>
        <p>누적 단톡방 : {this.state.allCount}</p>
        <p>입장가능한 단톡방 : {this.state.validCount}</p>
        {data.map(v => (
          <Room data={v} removeHandler={this.removeHandler} />
        ))}
        <button
          onClick={async () => {
            await this.setState({
              page: this.state.page === 1 ? 1 : this.state.page - 1
            })
            const res = await axios.post("/api/data/" + this.state.page)
            await this.setState({
              data: res.data
            })
          }}
        >
          이전페이지
        </button>
        <button
          onClick={async () => {
            await this.setState({
              page:
                this.state.page === parseInt(this.state.allCount / 4) + 1
                  ? this.state.page
                  : this.state.page + 1
            })
            const res = await axios.post("/api/data/" + this.state.page)
            await this.setState({
              data: res.data
            })
          }}
        >
          다음페이지
        </button>
        <p>
          <Link href="/">메인으로</Link>
        </p>
      </div>
    )
  }

  render() {
    const data = this.state.data
    return <Layout>{data.length === 0 ? <Spin size="large" id="spin"/> : this.printData(data)}</Layout>
  }
}

export default Join
