import { Component } from "react"
import { Layout, Button } from "antd"
import Link from "next/link"

import "./Layout.scss"
import "antd/dist/antd.css"
import Head from "next/head"

class layout extends Component {
  setGoogleTags() {
    return {
      __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'UA-56557944-15');
      `
    }
  }

  render() {
    return (
      <div>
        <Head>
          <title>NETFLIX PARTY - 넷파티</title>
          <meta charset="UTF-8"></meta>
          <meta
            name="keywords"
            content="넷플릭스 파티 파티원 계정공유 같이쓰기"
          ></meta>
          <meta
            name="description"
            content="넷플릭스 파티원 매칭 사이트. 넷플릭스 비용절감을 위해 계정공유를 하여 월 3000원대로 이용할 수 있도록 한다."
          ></meta>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-56557944-15"
          ></script>
          <script dangerouslySetInnerHTML={this.setGoogleTags()} />
          
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        </Head>

        <div className="body">
          <div className="Header">
            <div id="HeaderBackground" />
            <div id="HeaderTitle">
              <div id="title">
                <Link href="/">
                  <a>NETFLIX PARTY</a>
                </Link>
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
          <div className="Footer">
            <a href="https://github.com/soso01">개발자 깃헙</a>
          </div>
        </div>
      </div>
    )
  }
}

export default layout
