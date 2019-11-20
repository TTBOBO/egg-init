class Chart {
  constructor(el) {
    this.version = '0.0.1';
    this.d3Container = null;
    this.svg = null;
    this.title = null;
    this.grid = null;
    this.xAxis = null;
    this.container = {}
    this.init(el)
  }

  init(el) {
    if (!el)
      throw (new Error('Dom cannot be empty'));
    this.createSvgContainer(el);
  }

  setOption({
    title,
    grid,
    xAxis
  }) {
    this.setTitle(title);
    this.setGrid(grid);
    this.setXAxis(xAxis);
  }

  setXAxis(xAxis = {}) {
    this.xAxis = xAxis instanceof Array ? xAxis : [xAxis];
    this.creatXaxis(); //创建x轴
  }

  creatXaxis() {
    this.xAxis.forEach((item, index) => {

    })
  }

  setGrid(grid) {
    this.grid = grid ? grid instanceof Array ? grid : [grid] : [{
      left: '10%',
      right: '10%',
      top: 30,
      bottom: '30'
    }]
  }

  setTitle({
    id,
    text,
    left,
    right,
    top,
    bottom,
    textStyle: {
      color = '#333',
      fontSize = '16'
    }
  } = {}) {
    if (!text) return;
    this.title = this.svg.append('g').append('text');
    this.title
      .attr('x', this.container.width / 2)
      .attr('y', 20).attr('id', id)
      .attr('text-anchor', 'middle')
      .attr('fill', color);
    this.setStyle(this.title, {
      bottom,
      left,
      right,
      top,
      'font-size': fontSize
    });
    this.title.text(text)
  }

  createSvgContainer(el) {
    let box = d3.select(el);
    this.setStyle(box, {
      width: "100%",
      'user-select': "none",
      position: "relative"
    })
    const {
      _groups: [
        [{
          clientWidth,
          clientHeight
        }]
      ]
    } = box;
    this.container.width = clientWidth;
    this.container.height = clientHeight;
    this.d3Container = box.append('div');
    this.setStyle(this.d3Container, {
      width: clientWidth + 'px',
      height: clientHeight + 'px',
      position: "relative"
    });
    this.svg = this.d3Container.append('svg');
    this.setStyle(this.svg, {
      position: 'absolute',
      left: 0,
      top: 0,
      width: clientWidth,
      height: clientHeight,
      'user-select': 'none',
      padding: 0,
      margin: '',
      background: "#ccc"
    })
  }

  setStyle(node, option) {
    for (var i in option) {
      node.style(i, option[i])
    }
  }
}
export default Chart;
