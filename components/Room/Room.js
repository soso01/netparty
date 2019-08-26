import { Component } from "react";
import { Row, Col, Icon, Button } from "antd";

import "antd/dist/antd.css";
import "./Room.scss";

class Room extends Component {
  render() {
    const splited = this.props.data.content.split("\n");
    return (
      <Row>
        <Col xs={{ span: 22, offset: 1 }} md={{ span: 12, offset: 6 }}>
          <Row className="roomDiv" type="flex" justify="center" align="middle">
            <Col span={18} className="textCol">
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
                  <br />
                  <span>{this.props.data.DateFormat}</span>
                </Col>
              </Row>
            </Col>
            <Col span={6} className="buttonCol">
              <a href={this.props.data.address} target="_blank">
                <Button type="primary">입장</Button>
              </a>
              <br></br>
              <Button
                onClick={() => {
                  this.props.removeHandler(this.props.data);
                }}
                type="danger"
                style={{ marginTop: 10 }}
              >
                삭제
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Room;
