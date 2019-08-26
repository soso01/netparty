import { Component } from "react";
import { Row, Col, Icon, Button } from "antd";

import "antd/dist/antd.css";
import "./Room.scss";

class Room extends Component {
  render() {
    const splited = this.props.data.content.split("\n");
    return (
      <Row>
        <Col xs={{ span: 20, offset: 2 }} md={{ span: 12, offset: 6 }}>
          <Row className="roomDiv" type="flex" justify="center" align="middle">
            <Col span={18}>
              <Row>
                <Col>
                  <div>
                    {splited.map(v => {
                      return (
                        <span>
                          {v}
                          <br />
                        </span>
                      );
                    })}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>{this.props.data.Date + "  "}</span>
                  <span
                    onClick={() => {
                      this.props.removeHandler(this.props.data);
                    }}
                  >
                    <Icon type="close-square" style={{ color: "#FF0000" }} />
                  </span>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <a href={this.props.data.address} target="_blank">
                <Button>입장하기</Button>
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Room;
