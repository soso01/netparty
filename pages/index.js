import React from "react"
import Link from "next/link"
import Head from "next/head"
import { Button, Row, Col } from "antd"

import Layout from "../components/Layout"
import "./style/index.scss"

const DemoBox = props => (
  <p className={`height-${props.value}`}>{props.children}</p>
)

const Home = () => (
  <Layout>
    <Row>
      <Col xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 6 }}>
        <Row className="col" type="flex" justify="center" align="middle">
          <Col span={16} className="colText">
            <p>넷플릭스를 파티원과 함께 저렴하게 즐기세요!</p>
          </Col>
          <Col span={8} className="colImage">
            <img src="/static/premium.png" />
          </Col>
        </Row>
        <Row className="col" type="flex" justify="center" align="middle">
          <Col span={8} className="colImage">
            <img src="/static/kakao.png" />
          </Col>
          <Col span={16} className="colText">
            <p>카카오톡 오픈채팅을 이용한 간편한 모임!</p>
          </Col>
        </Row>
        <Row className="col" type="flex" justify="center" align="middle">
          <Col span={16} className="colText">
            <p>가입없이 지금 당장 이용하세요!</p>
          </Col>
          <Col span={8} className="colImage">
            <img src="/static/party.png" />
          </Col>
        </Row>
      </Col>
    </Row>
  </Layout>
)

export default Home
