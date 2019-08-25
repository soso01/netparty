import { Component } from "react"
import Link from "next/link"
import axios from "axios"
import { Input, Row, Col, Button, Card } from "antd"

import Layout from "../components/Layout"
import "./style/make.scss"

class Make extends Component {
  state = {
    input_address: "",
    input_content: "",
    input_password: 0
  }
  updateInputValue(e, target) {
    const obj = {}
    obj[target] = e.target.value
    this.setState(obj)
  }
  submit = () => {
    if(this.state.address&&this.state.content&&this.state.password){

    
    axios
      .post("/api/maketok", {
        address: this.state.address,
        content: this.state.content,
        password: this.state.password
      })
      .then(res => {
        console.log(res.data)
        switch (res.data) {
          case "Address fail":
            alert("올바르지 않은 주소입니다.")
            break
          case "Valid fail":
            alert("존재하지 않는 채팅방입니다.")
            break
          case "overlap fail":
            alert("이미 존재하는 채팅방입니다.")
            break
          case "success":
            alert("제출되었습니다.")
            window.location.href = "/"
            break
          default:
            break
        }
      })
    }
    else {
      alert("입력하지않은 항목이 있습니다.")
    }
  }
  render() {
    return (
      <Layout>
        <Row className="form">
          <Col id="makeNotice" xs={{span:20, offset:2}} md={{ span: 12, offset: 6 }}>
            <Card title="파티 생성하기" bordered={true}>
              <p>
                - 카카오톡 오픈카톡을 생성후 주소를 기입해주세요.
              </p>
              <p>
                - 인원을 모두 구하면 카카오톡 앱에서 링크삭제를 해주세요. 사이트에서도 반영됩니다.
              </p>
            </Card>
          </Col>
          <Col xs={{span:20, offset:2}} md={{ span: 12, offset: 6 }}>
            <p>
              오픈카톡 주소
              <Input onChange={e => this.updateInputValue(e, "address")} />
            </p>
            <p>
              패스워드
              <Input onChange={e => this.updateInputValue(e, "password")} />
            </p>
            <p>
              설명
              <Input.TextArea
                rows={5}
                onChange={e => this.updateInputValue(e, "content")}
              />
            </p>
            <Button type="primary" onClick={this.submit}>제출하기</Button>
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default Make
