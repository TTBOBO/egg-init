class Chart {
  constructor(el) {
    this.version = '0.0.1';
    this.option = null;
    this.d3Container = null;
    this.svg = null;
    this.title = null;
    this.gridsConfig = null; //视图配置
    this.grids = {}; //视组图
    this.line = {}; //线储存
    this.lineObj = {}; //加入data的line
    this.area = {};
    this.xAxisConfig = null;
    this.yAxisConfig = null;
    this.xAxis = {}; //存储 xAxis坐标轴对象
    this.xScale = {}; //存储横坐标数据
    this.x2Scale = null;
    this.circle = {}; // 存储点对象
    this.yAxis = {}; //存储yAxis坐标轴对象
    this.yScale = {}; //存储纵坐标数据
    this.series = []; //存储体表数据
    this.seriesData = []; // 储存真实提供给可视化图的数据
    this.container = {}
    this.dataZoom = null;
    this.zoomRect = {}, // 存储zoom容器
      this.id = null;
    this.tip = null;
    this.hoverLine = null;
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

  setOption(option) {
    this.option = option;
    const {
      title,
      grid,
      xAxis,
      yAxis,
      series,
      tooltip,
      dataZoom
    } = option;
    this.series = series;
    this.dataZoom = dataZoom;
    this.setGrid(grid);
    this.setTitle(title);
    this.setXAxis(xAxis);
    this.setYAxis(yAxis);
    this.setSeries(series);
    this.createSeries();
    this.createTooltip(tooltip);
    this.setDataZoom();
  }

  createTooltip(tooltip = {}) {
    const {
      show = true,
        formatter
    } = tooltip;
    if (!show) return;

    let tip = d3.select('#' + this.id).append('div') //添加tip提示框
      .attr('class', 'tooltip')
      .style('display', 'none')
    this.tip = tip;
    var _this = this;
    var bisect = d3.bisector(d => d.xType === 'time' ? new Date(d.xData) : d.xData).left;
    this.series.forEach((item, index) => {
      let {
        left,
        right,
        top,
        bottom,
      } = this.gridsConfig[index];
      const {
        tooltip
      } = this.option;
      this.createHoverLine(index);
      let data = this.seriesData[index];
      let react = this.grids['grid_' + index].append("rect")
        .attr("class", "overPlane")
        .attr("opacity", 0)
        .attr('height', this.container.height - (top + bottom))
        .attr("transform", `translate(${left},${top})`)
        .attr('width', this.container.width - (left + right))
      var tipFun = util.debounce(function (x, y, d) {
        _this.tip.html(tooltip.formatter ? tooltip.formatter(d) : "<span id='tip' style='color: #fff'>Value:" + d.yData + "</span>")
          .transition().duration(100) //提示框的内容
          .style('left', x + 20 + 'px') //提示框的位置
          .style('top', y + 20 + 'px')
      }, 50)
      react.on("mouseover", () => {
        tip.style("display", null);
        _this.hoverLine.style("display", null);
      }).on('mousemove', function () {
        let xScale = _this.xScale['xScale_' + index];
        let yScale = _this.yScale['yScale_' + index];
        var xdata = xScale.invert(d3.mouse(this)[0]);
        var yIndex = bisect(data, xdata);
        var d0 = data[yIndex - 1];
        var d1 = data[yIndex];
        var xData = d1.xType === 'time' ? new Date(d1.xData) : d1.xData;
        var d = d0 ? (xdata - d0.xData > xData - xdata ? d : d1) : data[0];
        _this.hoverLine.attr("transform", "translate(" + xScale(d.xType === 'time' ? new Date(d.xData) : d.xData) + ",0)");
        if (tooltip) {
          const {
            offsetX,
            offsetY
          } = d3.event;
          tipFun(offsetX, offsetY, d)
        }
      }).on("mouseout", function () {
        tip.style("display", "none");
        _this.hoverLine.style("display", 'none');
      })
      this.zoomRect[index] = react;
    })

  }

  createHoverLine(index) {
    let {
      top,
      bottom,
    } = this.gridsConfig[index]
    var hoverLineGroup = this.grids['grid_' + index].append("g")
      .attr("class", "hover-line");
    var hoverLine = hoverLineGroup
      .append("line")
      .attr("x1", 0).attr("x2", 0)
      .attr("y1", top).attr("y2", this.container.height - bottom);
    hoverLine.style('display', 'none');
    this.hoverLine = hoverLine;
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
        lineStyle,
        areaStyle,
        data
      } = item;
      this.createClipPath();
      this.createLine({
        lineStyle: Object.assign({}, this.lineStyle, lineStyle || {})
      }, index);
      if (areaStyle) {
        this.createArea({
          areaStyle: Object.assign(this.areaStyle, areaStyle || {})
        }, index);
      }
      this.creatCircle(item, index);
    })
  }

  creatCircle(item, index) {
    const {
      symbol = 'circle',
        symbolSize = 5
    } = item;
    let circleView = this.grids['grid_' + index]
      .append('g')
      .selectAll('g')
      .data(this.seriesData[index])
      .enter()
      .append('g')
      .attr('clip-path', 'url(#clip-main)')
    let circle = circleView
      .append(symbol)
      .attr('class', 'circle')
    circle
      .attr('cx', () => 0)
      .attr('cy', d => this.yScale['yScale_' + index](d.yData))
      .transition()
      .duration((d, i) => i * 600)
      .ease(d3.easeElasticIn.amplitude(3).period(2))
      .attr('cx', d => this.xScale['xScale_' + index](d.xType === 'time' ? new Date(d.xData) : d.xData))
      .attr('cy', d => this.yScale['yScale_' + index](d.yData))
      .attr('r', '2')
      .attr('fill', '#fff')
      .attr('stroke-width', 1).attr("stroke", '#058cff')
      .style('z-index', 999)
      .transition()
      .duration((d, i) => i * 1000)
      .attr('r', symbolSize)
    this.circle[`grid_${index}_circle`] = circle;
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
    this.lineObj[`grid_${index}_line`] = {
      line,
      transition
    };
    this.setNodeAttr(line, {
      ...style,
      class: `grid_${index}_line`,
      fill: 'none',
      'clip-path': 'url(#grid_' + index + '_clip)'
    })
    this.transitionLine(line, transition);
  }
  transitionLine(line, transition) {
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
        .duration(duration !== null ? duration : 2500)
        .attr("stroke-dashoffset", 0);
    }
  }

  setDataZoom() {
    this.gridsConfig.forEach((item, index) => {
      if (this.dataZoom && this.dataZoom[0].inside) {
        let disabledIndex = this.dataZoom[0].disabledIndex;
        let status = disabledIndex && disabledIndex.indexOf(index) != -1;
        if (!status) {
          this.zoomRect[index].call(this.zoomFun(index))
        }

      }
    })
  }

  zoomFun(index) {
    let {
      left,
      right,
      top,
      bottom,
    } = this.gridsConfig[index];
    var _this = this;
    return d3.zoom() //设置zoom参数       
      .scaleExtent([1, 4]) //放大倍数
      .translateExtent([
        [0, 0],
        [this.container.width - (left + right), this.container.height - (top + bottom)]
      ]) //移动的范围
      .extent([
        [0, 0],
        [this.container.width - (left + right), this.container.height - (top + bottom)]
      ])
      .on("zoom", function () {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return;
        let t = d3.event.transform.rescaleX(_this.x2Scale);
        _this.xScale['xScale_' + index].domain(t.domain());
        _this.grids['grid_' + index].select('.x-axis_' + index).call(_this.xAxis['xAxis' + index]);
        _this.circle[`grid_${index}_circle`].attr('cx', d => _this.xScale['xScale_' + index](d.xType === 'time' ? new Date(d.xData) : d.xData))
        _this.grids['grid_' + index].select(`.grid_${index}_line`).attr('d', _this.line[`grid_${index}_line`])
        const {
          line,
          transition
        } = _this.lineObj[`grid_${index}_line`];
        _this.transitionLine(line, {
          ...transition,
          duration: 0
        });
        _this.grids['grid_' + index].select(`.grid_${index}_area`).attr('d', _this.area[`grid_${index}_area`])
      });
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
        type = 'line', show = true, getDomain, format, align = 'bottom', resover = true, axisLabel,
          name
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
        if (name) {
          if (typeof name === 'string') {
            this.grids['grid_' + index]
              .append("text")
              .text(name)
              .attr("transform", "rotate(-90)") //text旋转-90°
              .attr("text-anchor", "end") //字体尾部对齐
              .attr("dy", "70px") //沿y轴平移一个字体的大小
              .attr("dx", "-50px") //沿y轴平移一个字体的大小
          } else {
            name(this.grids['grid_' + index])
          }
        }
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
        type = 'line', data = [], show = true, getDomain, format, align = 'bottom', axisLabel, name
      } = item;
      let {
        height,
        width
      } = this.container;
      let {
        top,
        left
      } = this.gridsConfig[index];
      this.xScale['xScale_' + index] = d3['scaleTime' || `${this.axisType[type]}`]()
        .domain((this.isFun(getDomain) ? getDomain({
          type
        }, data) : this.getDomain({
          type
        }, data)))
        .range(this.getRange(align, index))
      if (this.dataZoom) {
        this.x2Scale = d3['scaleTime' || `${this.axisType[type]}`]()
          .domain((this.isFun(getDomain) ? getDomain({
            type
          }, data) : this.getDomain({
            type
          }, data)))
          .range(this.getRange(align, index));
      }
      this.xAxis['xAxis' + index] = d3[this.lineAlign[align]]().scale(this.xScale['xScale_' + index])
      if (format) {
        this.xAxis['xAxis' + index] = format(this.xAxis['xAxis' + index])
      }
      if (show) {
        let axis = this.grids['grid_' + index].append('g')
          .attr("class", "axis x-axis_" + index)
          .attr("transform", "translate(0," + (height / len - (top)) + ")")
          .call(this.xAxis['xAxis' + index]);

        if (name) {
          if (typeof name === 'string') {
            this.grids['grid_' + index]
              .append("text")
              .text(name)
              .attr("transform", "translate(" + (width - left + 40) + "," + (height / len - (top) + 10) + ")")
              .attr("text-anchor", "end") //字体尾部对齐
          } else {
            name(this.grids['grid_' + index])
          }
        }
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
    return (align === 'bottom' || align === 'top') ? [left, this.container.width - right] : [top, this.container.height - (bottom)]
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
        res = [d3[MathArr[0]](data, d => new Date(d)), d3[MathArr[1]](data, d => new Date(d))] || d3.extent(data.map(i => new Date(i)));
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
      left: 50,
      right: 50,
      top: 50,
      bottom: 50,
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
    this.id = 'chart_' + parseInt(Math.random() * 1000);
    this.d3Container.attr('id', this.id)
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
      background: "#f0f0f0"
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
