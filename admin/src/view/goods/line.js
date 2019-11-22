class Chart {
  constructor(el) {
    this.version = '0.0.1';
    this.d3Container = null;
    this.svg = null;
    this.title = null;
    this.gridsConfig = null; //视图配置
    this.grids = {}; //视组图
    this.line = {}; //线储存
    this.area = {};
    this.xAxisConfig = null;
    this.yAxisConfig = null;
    this.xAxis = {}; //存储 xAxis坐标轴对象
    this.xScale = {}; //存储横坐标数据
    this.yAxis = {}; //存储yAxis坐标轴对象
    this.yScale = {}; //存储纵坐标数据
    this.series = []; //存储体表数据
    this.seriesData = []; // 储存真实提供给可视化图的数据
    this.container = {}
    this.init(el)
    this.axisType = {
      line: 'scaleLinear',
      time: 'scaleTime',
      log: 'scaleLog',
      pow: 'scalePow',
      category: 'scaleOrdinal',
      band: 'scaleBand'
    }
    this.lineAlign = {
      left: 'axisLeft',
      bottom: 'axisBottom',
      right: 'axisRight',
      top: 'axisTop'
    }
    this.lineStyle = {
      'stroke-width': 1,
      type: 'solid',
      "stroke-opacity": 1,
      stroke: '#058cff'
    }

    this.areaStyle = {
      color: "#333",
      opacity: 1
    }

  }

  init(el) {
    if (!el)
      throw (new Error('Dom cannot be empty'));
    this.createSvgContainer(el);
  }

  setOption({
    title,
    grid,
    xAxis,
    yAxis,
    series
  }) {
    this.series = series;
    this.setGrid(grid);
    this.setTitle(title);
    this.setXAxis(xAxis);
    this.setYAxis(yAxis);
    this.setSeries(series);
    this.createSeries();
  }


  setSeries(series) {
    this.seriesData = series.map(item => {
      return item.data.map((_item, _index) => {
        return {
          xData: this.xAxisConfig[0].data[_index], // 暂时取第0个xAxis数据
          yData: _item,
          xType: this.xAxisConfig[0].type
        }
      })
    })
  }

  createSeries() {
    this.series.forEach((item, index) => {
      const {
        id,
        name,
        symbol = 'emptyCircle',
        symbolSize,
        lineStyle,
        areaStyle,
        data
      } = item;
      this.createClipPath();
      this.createLine({
        lineStyle: Object.assign(this.lineStyle, lineStyle || {})
      }, index);
      if (areaStyle) {
        this.createArea({
          areaStyle: Object.assign(this.areaStyle, areaStyle || {})
        }, index);
      }
    })
  }

  createArea(option = {}, index) {
    let {
      areaStyle
    } = option;
    this.area[`grid_${index}_area`] = d3.area()
      .curve(d3.curveMonotoneX)
      .x(d => this.xScale['xScale_' + index](d.xType === 'time' ? new Date(d.xData) : d.xData))
      .y0(this.yScale['yScale_' + index](0))
      .y1(d => this.yScale['yScale_' + index](d.yData));
    let area = this.grids['grid_' + index].append('g')
      .append('path')
      .datum(this.seriesData[index])
      .attr('d', this.area[`grid_${index}_area`])
    this.setNodeAttr(area, {
      ...areaStyle,
      class: `grid_${index}_area`,
      stroke: 'none',
      'clip-path': 'url(#grid_' + index + '_clip)'
    })
    if (areaStyle.fill) {
      if (typeof areaStyle.fill === 'object') {
        //生成渐变
        let id = this.createLineGradient(areaStyle.fill, index);
        area.style('fill', "url(#" + id + ")")
      } else {
        area.attr('fill', areaStyle.fill)
      }
    }
  }

  createLine(option = {}, index) {
    let {
      lineStyle
    } = option;
    this.line[`grid_${index}_line`] = d3
      .line()
      .x(d => this.xScale['xScale_' + index](d.xType === 'time' ? new Date(d.xData) : d.xData))
      .y(d => this.yScale['yScale_' + index](d.yData))
      .curve(d3.curveMonotoneX)
    let line = this.grids['grid_' + index]
      .append("path")
      .datum(this.seriesData[index])
      .attr("d", this.line[`grid_${index}_line`])
    const {
      transition,
      ...style
    } = lineStyle;
    this.setNodeAttr(line, {
      ...style,
      class: `grid_${index}_line`,
      fill: 'none',
      'clip-path': 'url(#grid_' + index + '_clip)'
    })
    if (transition) {
      const {
        fun,
        duration
      } = transition
      var len = line.node().getTotalLength();
      if (fun) {
        fun(line);
        return;
      }
      line
        .attr("stroke-dasharray", len + " " + len)
        .attr("stroke-dashoffset", len)
        .transition()
        .duration(duration || 2500)
        .attr("stroke-dashoffset", 0);
    }
  }

  setYAxis(yAxis = {}) {
    this.yAxisConfig = yAxis instanceof Array ? yAxis : [yAxis];
    this.creatYaxis(); //创建y轴
  }

  setXAxis(xAxis = {}) {
    this.xAxisConfig = xAxis instanceof Array ? xAxis : [xAxis];
    this.creatXaxis(); //创建x轴
  }

  creatYaxis() {
    this.yAxisConfig.forEach((item, index) => {
      let {
        type = 'line', show = true, getDomain, format, align = 'bottom', resover = true, axisLabel
      } = item;
      let {
        data = []
      } = this.series[index] || {};
      let {
        left,
      } = this.gridsConfig[index];

      this.yScale['yScale_' + index] = d3[`${this.axisType[type]}`]()
        .domain((this.isFun(getDomain) ? getDomain({
          type,
          resover
        }, data) : this.getDomain({
          type,
          resover
        }, data)))
        .range(this.getRange(align, index))
      this.yAxis['yAxis' + index] = d3[this.lineAlign[align]]().scale(this.yScale['yScale_' + index])
      if (format) {
        format(this.yAxis['yAxis' + index])
      }
      if (show) {
        let axis = this.grids['grid_' + index].append('g')
          .attr("class", "axis y-axis_" + index)
          .attr("transform", "translate(" + left + ",0 )")
          .call(this.yAxis['yAxis' + index]);
        this.grids['grid_' + index]
          .append("text")
          .text("price(￥)")
          // .attr("transform", "rotate(-90)") //text旋转-90°
          // .attr("text-anchor", "end") //字体尾部对齐
          .attr("x", "10")
        if (this.isFun(axisLabel)) {
          axisLabel(axis);
        }
      }
    })
  }

  creatXaxis() {
    let len = this.xAxisConfig.length;
    this.xAxisConfig.forEach((item, index) => {
      let {
        type = 'line', data = [], show = true, getDomain, format, align = 'bottom', axisLabel
      } = item;
      let {
        height
      } = this.container;
      let {
        top,
      } = this.gridsConfig[index];
      this.xScale['xScale_' + index] = d3[`${this.axisType[type]}`]()
        .domain((this.isFun(getDomain) ? getDomain({
          type
        }, data) : this.getDomain({
          type
        }, data)))
        .range(this.getRange(align, index))
      this.xAxis['xAxis' + index] = d3[this.lineAlign[align]]().scale(this.xScale['xScale_' + index])
      if (format) {
        format(this.xAxis['xAxis' + index])
      }
      if (show) {
        let axis = this.grids['grid_' + index].append('g')
          .attr("class", "axis x-axis_" + index)
          .attr("transform", "translate(0," + (height / len - (top)) + ")")
          .call(this.xAxis['xAxis' + index]);
        if (this.isFun(axisLabel)) {
          axisLabel(axis);
        }
        this.setAxisLabel(axis, axisLabel);
      }
    })
  }

  setAxisLabel(axis, option) {
    if (!option) return;
    let text = axis.selectAll("text").style("text-anchor", "start");
    this.setNodeAttr(text, option);
  }

  getRange(align = 'bottom', index) {
    let {
      left,
      top,
      right,
      bottom
    } = this.gridsConfig[index];
    return (align === 'bottom' || align === 'top') ? [left, this.container.width - (right)] : [top, this.container.height - (bottom)]
  }

  getDomain({
    type,
    resover
  }, data) {
    let MathArr = resover ? ['max', 'min'] : ['min', 'max'];
    let res = null;
    switch (type) {
      case 'line':
        res = [d3[MathArr[0]](data, d => d), d3[MathArr[1]](data, d => d)];
        break;
      case 'time':
        res = d3.extent(data.map(i => new Date(i)));
        break;
      case 'category':
      case 'band':
        res = data;
        break;
      default:
        break;
    }
    return res;
  }

  creatGrid() {
    this.gridsConfig.forEach((grid, index) => {
      let {
        id = 'grid_' + index
      } = grid;
      this.grids[id] = this.svg.append('g').attr('id', id);
    })
  }

  isFun(fun) {
    return fun && typeof fun === 'function'
  }

  setGrid(grid) {
    this.gridsConfig = grid ? grid instanceof Array ? grid : [grid] : [{
      left: 30,
      right: 30,
      top: 30,
      bottom: 30,
      id: ''
    }];
    this.creatGrid();
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
    this.setNodeAttr(this.title, {
      bottom,
      left,
      right,
      top,
      'font-size': fontSize
    }, 'style');
    this.title.text(text)
  }

  createSvgContainer(el) {
    let box = d3.select(el);
    this.setNodeAttr(box, {
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
    this.setNodeAttr(this.d3Container, {
      width: clientWidth + 'px',
      height: clientHeight + 'px',
      position: "relative"
    }, 'style');
    this.svg = this.d3Container.append('svg');
    this.setNodeAttr(this.svg, {
      position: 'absolute',
      left: 0,
      top: 0,
      width: clientWidth,
      height: clientHeight,
      'user-select': 'none',
      padding: 0,
      margin: '',
      background: "#ccc"
    }, 'style')
  }

  createLineGradient(colorObj = {}, index) {
    const {
      colorStops = [],
        ...xyData
    } = colorObj
    //线性渐变
    var defs = this.grids['grid_' + index].append("defs");
    var linearGradient = defs.append("linearGradient")
    this.setNodeAttr(linearGradient, Object.keys(xyData).reduce((total, item) => {
      total[item] = (xyData[item] * 100) + '%'
      return total;
    }, {}));
    colorStops.forEach(item => {
      linearGradient.append("stop")
        .attr("offset", item.offect * 100 + '%')
        .style("stop-color", item.color);
    })
    let id = 'grid_' + index + "_lineGradient"
    linearGradient.attr('id', id)
    return id;
  }


  createClipPath(index = 0) {
    let {
      left,
      right,
      top,
      bottom,
    } = this.gridsConfig[index];
    this.grids['grid_' + index].append('defs')
      .append('clipPath')
      .attr('id', 'grid_' + index + "_clip")
      .append('rect')
      .attr('height', this.container.height - (top + bottom))
      .attr('y', 0)
      .attr('x', 0)
      .attr("transform", `translate(${left},${top})`)
      .attr('width', 0)
      .transition()
      .duration(1500)
      .ease(d3.easeExpInOut)
      .attr('width', this.container.width - (left + right))
  }

  setNodeAttr(node, option, type = 'attr') {
    for (var i in option) {
      node[type](i, option[i])
    }
  }
}
export default Chart;
