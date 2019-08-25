import { Component } from "react"
import { Row, Col, Icon } from "antd"

import "antd/dist/antd.css"

class Room extends Component {
  render() {
    const splited = this.props.data.content.split("\n")
    return (
      //   <div>
      //     <p>{this.props.data.content}</p>
      //     <a href={this.props.data.address}>링크</a>
      //     <button onClick={() => {this.props.removeHandler(this.props.data)}}>삭제</button>
      //   </div>

      <Row>
        <Col
          id="makeNotice"
          xs={{ span: 20, offset: 2 }}
          md={{ span: 12, offset: 6 }}
        >
          <Row>
            <Col span={18}>
              <div>
                {splited.map((v, i) => {
                  if (i === splited.length - 1) {
                    return (
                      <span>
                        {v}
                        -
                        <Icon
                          type="close-square"
                          style={{ color: "#FF0000" }}
                        />
                        <br />
                      </span>
                    )
                  }
                  return (
                    <span>
                      {v}
                      <br />
                    </span>
                  )
                })}
              </div>
            </Col>
            <Col span={6}>
              <a href={this.props.data.address} target="_blank">
                링크
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Room
