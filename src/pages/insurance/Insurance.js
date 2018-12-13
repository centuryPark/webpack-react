import React, { Component } from 'react';
import badge1500 from './images/badge-1500.png';
import badge2000 from './images/badge-2000.png';
import badge2500 from './images/badge-2500.png';
import morning from './images/morning.png';
import evening from './images/afternoon.png';

const LOAD_STATE = {
  normal: 0, // 普通
  abort: 1, // 中止
  loading: 2, // 加载中
  success: 3, // 加载成功
  failure: 4, // 加载失败
  complete: 5, // 加载完成（无新数据）
};

function getRandomNum(min, max) {
  const Range = max - min;
  const Rand = Math.random();
  return (min + Math.round(Rand * Range));
}

function TextCell({ ...props }) {
  const { statues } = props;
  return (
    <div className="item">
      <span className="left">2018-12-12 19:12:22</span>
      <span className={statues === 'sub' ? 'right sub' : 'right'}>-¥2500</span>
    </div>
  );
}

class Insurance extends Component {
  constructor() {
    super();
    this.mounted = true;
    this.state = {
      loading: LOAD_STATE.normal,
      dataSource: [],
      showTips: false,
    };
  }

  componentDidMount() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const stage = ['开始起步', '继续加油', '保持状态', '可以兑换', '极好'];
    const radius = 140;
    const deg0 = Math.PI / 9;
    const deg1 = (Math.PI * 11) / 45;
    const start = 0;
    const perDot = 500; // 每个大刻度代表的值 2500/5 2500分为5等份，每份为500
    const endDot = 2500; // 最大刻度
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = ctx.webkitBackingStorePixelRatio || 1;
    const ratio = devicePixelRatio / backingStoreRatio;
    canvas.width = window.screen.availWidth * ratio;
    canvas.height = 260 * ratio;
    const cWidth = canvas.width;
    const cHeight = canvas.height;
    const score = canvas.attributes['data-score'].value;
    ctx.scale(ratio, ratio);

    function Dot() {
      this.x = 0;
      this.y = 0;
      this.draw = (drawCtx) => {
        drawCtx.save();
        drawCtx.beginPath();
        drawCtx.fillStyle = 'rgba(255, 255, 255, 1)';
        drawCtx.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
        drawCtx.fill();
        drawCtx.restore();
      };
    }

    // 金额
    function text(process) {
      ctx.save();
      ctx.rotate(10 * deg0);
      ctx.fillStyle = '#fff';
      ctx.font = '40px serif';
      ctx.textAlign = 'center';
      ctx.textBaseLine = 'top';
      ctx.fillText(`¥ ${process}`, 0, 30);
      ctx.restore();
    }
    // todo 分数大于2500，按2500显示
    if (score < start || score > 2500) {
      // console.log('信用分数区间：0~2500');
    } else {
      const dot = new Dot();
      const dotSpeed = 0.03;
      const textSpeed = Math.round((dotSpeed * 100) / deg1);
      let angle = 0;
      let credit = start;

      (function drawFrame() {
        ctx.save();
        ctx.clearRect(0, 0, cWidth, cHeight);
        ctx.translate(cWidth / (2 * ratio), cHeight / (1.6 * ratio));
        ctx.rotate(8 * deg0);

        dot.x = radius * Math.cos(angle);
        dot.y = radius * Math.sin(angle);

        const aim = ((score - start) * deg1) / perDot;
        if (angle < aim) {
          angle += dotSpeed;
        }
        dot.draw(ctx);

        if (credit < score - textSpeed) {
          credit += textSpeed;
        } else if (credit >= score - textSpeed && credit < score) {
          credit += 1;
        }
        text(credit);

        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
        ctx.arc(0, 0, radius, 0, angle, false);
        ctx.stroke();
        ctx.restore();

        window.requestAnimationFrame(drawFrame);

        ctx.save(); // 小刻度层
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, .2)';
        ctx.lineWidth = 10; // 小刻度层长度
        ctx.arc(0, 0, 125, 0, 11 * deg0, false);
        ctx.stroke();
        ctx.restore();

        ctx.save(); // 大刻度线
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
          ctx.moveTo(130, 0); // 刻度线长度 （140-130）
          ctx.lineTo(120, 0);
          ctx.stroke();
          ctx.rotate(deg1);
        }
        ctx.restore();

        ctx.save(); // 中细分刻度线
        for (let i = 0; i < 25; i++) {
          if (i % 5 !== 0) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
            ctx.moveTo(130, 0);
            ctx.lineTo(123, 0);
            ctx.stroke();
          }
          ctx.rotate(deg1 / 5);
        }
        ctx.restore();

        ctx.save(); // 信用分数刻度（0-2500）
        ctx.rotate(Math.PI / 2);
        for (let i = 0; i <= (endDot / perDot); i++) {
          ctx.fillStyle = 'rgba(255, 255, 255, .8)';
          ctx.font = '10px serif';
          ctx.textAlign = 'center';
          ctx.fillText(start + (perDot * i), 0, -105);
          ctx.rotate(deg1);
        }
        ctx.restore();

        ctx.save(); // 分数段文字
        ctx.rotate((Math.PI / 2) + deg0);
        for (let i = 0; i < 5; i++) {
          ctx.fillStyle = 'rgba(255, 255, 255, .9)';
          ctx.font = '10px serif';
          ctx.textAlign = 'center';
          ctx.fillText(stage[i], 5, -105);
          ctx.rotate(deg1);
        }
        ctx.restore();

        ctx.save(); // 中间文字
        ctx.rotate(10 * deg0);
        ctx.fillStyle = '#fff';
        ctx.font = '20px serif';
        ctx.textAlign = 'center';
        /* if (score < 500) {
          ctx.fillText(stage[0], 0, 40);
        } else if (score < 1000 && score >= 500) {
          ctx.fillText(stage[1], 0, 40);
        } else if (score < 1500 && score >= 1000) {
          ctx.fillText(stage[2], 0, 40);
        } else if (score < 2000 && score >= 1500) {
          ctx.fillText(stage[3], 0, 40);
        } else if (score <= 2500 && score >= 2000) {
          ctx.fillText(stage[4], 0, 40);
        } */

        ctx.fillStyle = '#fff';
        ctx.font = '14px serif';
        ctx.fillText('上一次获得时间：2016.11.06', 0, 80);

        ctx.fillStyle = '#fff';
        ctx.font = '14px serif';
        ctx.fillText('奖励金额度', 0, -30);
        ctx.restore();


        // ctx.save(); //最外层轨道
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(256, 256, 256, .7)';
        ctx.lineWidth = 2;
        ctx.arc(0, 0, radius, 0, 11 * deg0, false);
        ctx.stroke();
        ctx.restore();
      }());
    }
    this.appendData(5);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  toggle = (key) => {
    const value = this.state[key];
    this.setState({
      [key]: !value,
    });
  };

  appendData(length, dataSource) {
    dataSource = dataSource || this.state.dataSource;
    const startIndex = dataSource.length;
    for (let i = startIndex; i < startIndex + length; i++) {
      dataSource.push(<TextCell key={i} />);
    }
    this.setState({
      dataSource,
    });
  }

  // 模拟加载更多数据
  loadData() {
    this.setState({ loading: LOAD_STATE.loading });
    setTimeout(() => {
      if (!this.mounted) return;

      const randomNum = getRandomNum(0, 5);
      // todo const { dataSource } = this.state;
      let loading = LOAD_STATE.success;

      if (randomNum === 0) {
        loading = LOAD_STATE.failure;
      } else if (randomNum === 1) {
        loading = LOAD_STATE.complete;
      } else {
        this.appendData(5);
      }

      this.setState({
        loading,
      });
    }, 2000);
  }

  render() {
    const { showTips } = this.state;
    return (
      <div className="page-redemption-insurance">
        <header className="header">
          <h4>龋齿医疗保险保障金金额</h4>
          <p>奖励金可兑换对应额度保额</p>
          <div className="canvas">
            <canvas id="canvas" data-score="324" style={{ height: '260px', width: '100%' }} />
          </div>
          <div className="desc">
            <span>每日打开APP刷牙，可免费提升奖励金</span>
            <i
              className="bitmap"
              onClick={() => this.toggle('showTips')}
            >
              <div className="tip-group" style={{ display: showTips ? 'block' : 'none' }}>
                <div className="float-tip">
                  当天对照APP刷牙覆盖率达到80%可获得奖励金，每天可获得两次奖励
                </div>
              </div>
            </i>
          </div>
        </header>
        <div className="top">
          <h3>
            兑换保险
          </h3>
          <div className="badge-group">
            <div className="item">
              <div className="img">
                <img src={badge1500} alt="" />
                <span className="tip red">可兑换</span>
              </div>
              <span className="text">1500保障</span>
            </div>
            <div className="item">
              <div className="img">
                <img src={badge2000} alt="" />
                <span className="tip">未达标</span>
              </div>
              <span className="text">2000保障</span>
            </div>
            <div className="item">
              <div className="img">
                <img src={badge2500} alt="" />
                <span className="tip">未达标</span>
              </div>
              <span className="text">2500保障</span>
            </div>
          </div>
          <p>
            <span>查看保障详情</span>
            <i className="arrow-right" />
          </p>
        </div>
        <div className="middle">
          <h3 className="title">
            提升奖励金任务
          </h3>
          <div className="row">
            <div className="left">
              <img className="icon" src={morning} alt="" />
              <div className="desc">
                <h4>早晨刷牙</h4>
                <p>覆盖率已经达到80%以上</p>
              </div>
            </div>
            <div className="right">
              <button disabled={false} className="btn"><span>已完成</span></button>
            </div>
          </div>
          <div className="row">
            <div className="left">
              <img className="icon" src={evening} alt="" />
              <div className="desc">
                <h4>晚上刷牙</h4>
                <p>覆盖率已经达到80%以上</p>
              </div>
            </div>
            <div className="right">
              <button className="btn"><span>去刷牙</span></button>
            </div>
          </div>
        </div>
        <div className="dot-list-content">
          <h3 className="title">奖励金记录</h3>
          <div className="dot-list">
            <TextCell />
            <TextCell />
            <TextCell />
            <TextCell />
            <TextCell />
          </div>
        </div>
      </div>
    );
  }
}

export default Insurance;
