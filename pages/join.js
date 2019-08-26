import { Component } from "react";
import Link from "next/link";
import axios from "axios";
import Room from "../components/Room";
import { Spin, Button } from "antd";

import Layout from "../components/Layout";
import "./style/join.scss";

class Join extends Component {
  state = {
    page: 1,
    data: [],
    trueCount: 0,
    falseCount: 0,
    valid: true
  };

  async componentDidMount() {
    const data = await this.getData();
    const count = await axios.post("/api/getCount");
    this.setState({
      data: data,
      trueCount: count.data.trueCount,
      falseCount: count.data.falseCount
    });
  }

  async getData() {
    const res = await axios.post("/api/data", {
      valid: this.state.valid,
      page: this.state.page
    });
    return res.data;
  }

  async removeHandler(data) {
    const password = prompt("비밀번호를 입력해주세요.");
    const res = await axios.delete("/api/delete", {
      data: { password: password, data: data }
    });
    if (res.data === "success") {
      alert("삭제되었습니다.");
      window.location.reload();
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  }

  printData(data) {
    return (
      <div>
        <p>입장가능한 단톡방 : {this.state.trueCount}</p>
        <p>누적 단톡방 : {this.state.falseCount}</p>
        <Button
          onClick={async () => {
            await this.setState({ valid: true, page: 1 });
            const data = await this.getData();
            await this.setState({
              data: data
            });
          }}
        >
          입장가능방
        </Button>
        <Button
          onClick={async () => {
            await this.setState({ valid: false, page: 1 });
            const data = await this.getData();
            await this.setState({
              data: data
            });
          }}
        >
          종료된방
        </Button>
        {data.map(v => (
          <Room data={v} removeHandler={this.removeHandler} />
        ))}
        <Button
          onClick={async () => {
            await this.setState({
              page: this.state.page === 1 ? 1 : this.state.page - 1
            });
            const data = await this.getData();
            await this.setState({
              data: data
            });
          }}
        >
          이전페이지
        </Button>
        <Button
          onClick={async () => {
            await this.setState({
              page:
                this.state.page ===
                parseInt(
                  (this.state.valid === true
                    ? this.state.trueCount
                    : this.state.falseCount) / 4
                ) +
                  1
                  ? this.state.page
                  : this.state.page + 1
            });
            const data = await this.getData();
            await this.setState({
              data: data
            });
          }}
        >
          다음페이지
        </Button>
        <p>
          <Link href="/">메인으로</Link>
        </p>
      </div>
    );
  }

  render() {
    const data = this.state.data;
    return <Layout>{this.printData(data)}</Layout>;
  }
}

export default Join;
