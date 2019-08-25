import { Component } from "react"
import { Layout, Button } from "antd"
import Link from "next/link"

import "./Layout.scss"
import "antd/dist/antd.css"

const { Header, Content, Footer } = Layout

class layout extends Component {
  render() {
    return (
      <div className="body">
        <div className="Header">
          <div id="HeaderBackground" />
          <div id="HeaderTitle">
            <div id="title">
              <Link href="/"><a>NETFLIX PARTY</a></Link>
            </div>
            <div id="ButtonDiv">
              <Button type="primary">
                <Link href="make">파티만들기</Link>
              </Button>
              <Button>
                <Link href="join">참여하기</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="Content">{this.props.children}</div>
        <div className="Footer">푸터</div>
      </div>
    )
  }
}

export default layout
