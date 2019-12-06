class Chart {
  constructor(el) {
    this.version = '0.0.1';
    this.clipCode = parseInt(Math.random() * 1000);
    this.option = null;
    this.d3Container = null;
    this.svg = null;
    this.title = null;
    this.gridsConfig = null; //视图配置
    this.gridsContainer = {} // grid 外围视同
    this.grids = {}; //视组图
    this.line = {}; //线储存
    this.lineObj = {}; //加入data的line
    this.area = {};
    this.circleView = {}; //存储type 为 line 的 circle
    this.scatterView = {}; //存储type 为 scatter 的 circle
    this.xAxisConfig = null;
    this.yAxisConfig = null;
    this.xAxis = {}; //存储 xAxis坐标轴对象
    this.xScale = {}; //存储横坐标数据
    this.x2Scale = null;
    this.circle = {}; // 存储点对象
    this.yAxis = {}; //存储yAxis坐标轴对象
    this.axisX = {}; //X轴
    this.axisY = {};
    this.yScale = {}; //存储纵坐标数据
    this.series = []; //存储体表数据
    this.seriesNames = {};
    this.seriesData = []; // 储存真实提供给可视化图的数据
    this.container = {}
    this.dataZoom = null;
    this.selectCol = null; //选中的列
    this.selectRow = null; //选中的行
    this.color = null;
    this.zoomRect = {}; // 存储zoom容器
    this.brushRect = {}; // 存储brush容器
    this.legendData = []; //存储legend的数据
    this.legendGroup = {};
    this.legendText = null;
    this.legendRect = null;
    this.seriesIndexConfig = {};
    this.id = null;
    this.tip = null;
    this.hoverLine = {};
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
      'type': 'solid',
      "stroke-opacity": 1,
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
      dataZoom,
      legend
    } = option;
    this.series = series;
    this.dataZoom = dataZoom;
    this.setGrid(grid);
    this.setTitle(title);
    this.setXAxis(xAxis);
    this.initlegend(legend);
    this.setSeries(series);
    this.setYAxis(yAxis);
    this.createSeries();
    this.createTooltip(tooltip);
    this.setDataZoom();
  }

  dispatchAction({
    type,
    ...otherParams
  }) {
    // type: legendMouse | legendSelect
    this[type] && this[type](otherParams);
  }

  MouseLegend({
    name,
    status = 'over'
  }) {
    let [gridIndex, serisesIndex] = this.seriesIndexConfig[name];
    this.updateLegendOverStatus(gridIndex, serisesIndex, status === 'over' ? true : false)
  }

  selectLegend({
    name, // legend name
    show, // 显示隐藏
    resover //是否反选  true 时  show字段无效
  }) {
    let [gridIndex, serisesIndex] = this.seriesIndexConfig[name];
    let item = this.legendData.filter(item => item.value === name)[0];
    if (item.show === show) return;
    this.showHideLegeng(gridIndex, serisesIndex, {
      ...item,
      show: resover ? item.show : !show
    });
  }
  getPosition({
    gridIndex,
    type = 1
  }) {
    let len = this.gridsConfig.length;
    let {
      top,
      height,
      bottom = 0
    } = this.gridsConfig[gridIndex];
    let position;
    if (type === 1) {
      position = len > 1 ? height : this.container.height - top - bottom
    } else {
      position = len > 1 ? (top ? height + top : (bottom || 0)) : (this.container.height - top);
    }
    return position
  }
  createOverPlane(item, index, isResize) {
    let {
      left,
      right,
      top
    } = item;
    let position = this.getPosition({
      gridIndex: index
    })
    let rect;
    rect = isResize ? this.zoomRect[index] : this.gridsContainer['grid_' + index].append("rect");
    this.createHoverLine(index, position, isResize);

    rect.attr("class", "overPlane")
      .attr("opacity", 0)
      .attr('height', position)
      .attr("transform", `translate(${left},${top})`)
      .attr('width', this.container.width - (left + right))
    this.zoomRect[index] = rect;
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

    var tipFun = util.debounce(function (x, y, params) {
      _this.tip.style("display", null);
      let resultData = params.map(item => `<div style="display: flex;align-items: center;"><span style="display: inline-block;margin-right:5px;width: 8px;height: 8px;background: ${item.color || 'red'};border-radius:4px;mrgin-right:5px;"></span>${item.seriesName}:${item.value}</div>`);
      _this.tip.html(formatter ? formatter(params) : "<div id='tip' style='color: #fff;text-align:left;line-height: 20px;'>" + params[0].axisValue + "<br/>" + resultData.join('') + "</div>")
        .transition().duration(100) //提示框的内容
        .style('left', x + 20 + 'px') //提示框的位置
        .style('top', y + 20 + 'px')
    }, 50)
    this.gridsConfig.forEach((item, index) => {
      this.createOverPlane(item, index);

    })
    for (var index in this.zoomRect) {
      this.zoomRect[index].on("mouseover", () => {
        this.gridsConfig.forEach((_, gridIndex) => {
          this.hoverLine[`grid_hoverline_${gridIndex}`].style("display", null);
        })
      }).on('mousemove', function () {
        let data = _this.seriesData[0]; //x轴值都是一样的  取第0个就行
        let xScale = _this.xScale['xScale_' + index];
        var xdata = xScale.invert(d3.mouse(this)[0]);
        var yIndex = bisect(data, xdata);
        var d0 = data[yIndex - 1];
        var d1 = data[yIndex];
        var current = d1.xType === 'time' ? new Date(d1.xData) : d1.xData;
        var d = d0 ? (xdata - d0.xData > current - xdata ? d : d1) : data[0];
        let res = [];
        if (!d) return;
        _this.gridsConfig.forEach((_, gridIndex) => {
          _this.hoverLine[`grid_hoverline_${gridIndex}`].attr("transform", "translate(" + xScale(d.xType === 'time' ? new Date(d.xData) : d.xData) + ",0)");
          _this.series.forEach((item, sIndex) => {
            if (item.type === 'line') {
              _this.circleView[`grid_${gridIndex}_circle_${sIndex}`] && _this.circleView[`grid_${gridIndex}_circle_${sIndex}`].select('circle').filter(function (cur) {
                d3.select(this).attr("r", () => cur.index === d.index ? item.symbolSize * 1.5 : item.symbolSize);
              })
            } else if (item.type === 'scatter') {
              _this.scatterView[`grid_${gridIndex}_scatter_${sIndex}`].attr("r", cur => cur.index === d.index ? item.symbolSize * 1.5 : item.symbolSize)
            }
            if (gridIndex === 0) {
              res.push({
                value: item.data[d.index],
                axisIndex: index,
                dataIndex: d.index,
                axisValue: d.xData,
                seriesIndex: sIndex,
                seriesName: item.name,
                seriesType: item.type,
                color: _this.color(item.name)
              })
            }
          })
        })
        if (tooltip) {
          const {
            offsetX,
            offsetY
          } = d3.event;
          tipFun(offsetX, offsetY, res)
        }
        this.selectCol = d;
      }).on("mouseout", () => {
        setTimeout(() => this.tip.style("display", "none"), 50);
        this.gridsConfig.forEach((_, gridIndex) => {
          this.hoverLine[`grid_hoverline_${gridIndex}`].style("display", 'none');
        })
        _this.gridsConfig.forEach((_, gridIndex) => {
          _this.series.map((item, sIndex) => {
            if (item.type === 'line') {
              _this.circleView[`grid_${gridIndex}_circle_${sIndex}`] && _this.circleView[`grid_${gridIndex}_circle_${sIndex}`].select('circle').attr("r", item.symbolSize);
            } else if (item.type === 'scatter') {
              _this.scatterView[`grid_${gridIndex}_scatter_${sIndex}`].attr("r", item.symbolSize);
            }
          })
        })
      })
    }
  }

  createHoverLine(index, height, isResize) {
    let {
      top,
    } = this.gridsConfig[index];

    let hoverLine;
    if (isResize) {
      hoverLine = this.hoverLine[`grid_hoverline_${index}`];
    } else {
      var hoverLineGroup = this.gridsContainer['grid_' + index].append("g")
        .attr("class", "hover-line");
      hoverLine = hoverLineGroup
        .append("line")
    }
    hoverLine
      .attr("x1", 0).attr("x2", 0)
      .attr("y1", top).attr("y2", top + height);
    hoverLine.style('display', 'none');
    this.hoverLine[`grid_hoverline_${index}`] = hoverLine;
  }

  initlegend(legend = {}) {
    this.seriesNames = this.series.map(item => item.name);
    const {
      show,
      data = [],
      itemWidth = 25,
      itemHeight = 18,
      itemMargn = 15,
      itemPadding = 5,
      fontSize = 14
    } = legend
    if (!show) return;
    let width = 0;
    let legendData = [];
    this.color = d3.scaleOrdinal().domain(this.seriesNames).range(d3.schemeSet2);
    data.forEach(value => {
      let seriesIndex = this.seriesNames.indexOf(value)
      let gridIndex = this.gridsConfig.length > 1 ? seriesIndex : 0;
      if (seriesIndex != -1) {
        let obj = {
          value,
          width,
          axisIndex: gridIndex,
          seriesIndex: seriesIndex,
          type: this.series[seriesIndex].type,
          show: true
        }
        width += this.calculateWidth(value) + itemPadding + itemWidth + itemMargn
        legendData.push(obj);
      }
      this.seriesIndexConfig[value] = [gridIndex, seriesIndex]; //存储seriesItem 对应gridIndex(gridIndex)  以及 groupIndex (seriesIndex) 
    })

    var lableGrops = this.svg.append('g').attr('class', 'lableGrops')
      .attr('transform', 'translate(20,20)')
      .selectAll('g')
      .data(legendData)
      .enter()
      .append('g')
      .attr('transform', d => 'translate(' + [d.width, itemHeight / 2] + ')')
      .style('cursor', 'pointer')

    let rect = lableGrops.append('rect');
    let text = lableGrops.append('text');
    this.setNodeAttr(rect, {
      'width': itemWidth,
      'height': itemHeight,
      'x': 0,
      y: -(itemHeight / 2),
      'rx': 5,
      'ry': 5,
      'fill-opacity': 1,
      fill: d => this.color(d.value)
    })

    this.setNodeAttr(text, {
      x: itemWidth + itemPadding,
      'alignment-baseline': 'middle',
      fill: 'black',
      y: 2,
      opacity: 1
    })
    text.text(d => d.value);
    this.setNodeAttr(text, {
      'font-size': fontSize,
      'line-height': itemHeight + 'px'
    }, 'style');
    this.legendText = text;
    this.legendRect = rect;
    this.legendData = legendData;
    this.lableGrops = lableGrops;
    lableGrops.on('mouseover', (d) => {
      this.updateLegendOverStatus(d.axisIndex, d.seriesIndex, true);
    }).on('mouseout', (d) => {
      this.updateLegendOverStatus(d.axisIndex, d.seriesIndex, false);
    }).on('click', (d) => {
      const {
        axisIndex,
        seriesIndex
      } = d;
      this.showHideLegeng(axisIndex, seriesIndex, d);
    })
  }

  showHideLegeng(axisIndex, seriesIndex, item) {
    const {
      show,
      type
    } = item;
    if (show) {
      if (type === 'line') {
        this.circleView[`grid_${axisIndex}_circle_${seriesIndex}`].remove();
        this.grids['grid_' + axisIndex].select(`.grid_${axisIndex}_area_${seriesIndex}`).remove();
        this.grids['grid_' + axisIndex].select(`.grid_${axisIndex}_line_${seriesIndex}`).remove();
      } else if (type === 'scatter') {
        let scatterCon = 'grid_' + axisIndex + '_scatter_' + seriesIndex;
        this.scatterView[scatterCon].transition().duration(300).attr('r', 0).remove();
        setTimeout(() => this.grids['grid_' + axisIndex].select('.' + scatterCon).remove(), 300)
      }
    } else {
      if (type === 'line') {
        this.addLineChart(this.series[seriesIndex], axisIndex, seriesIndex);
        this.grids['grid_' + axisIndex].selectAll(`.grid_line`).sort((a, b) => a[0].seriesIndex - b[0].seriesIndex);
        this.grids['grid_' + axisIndex].selectAll(`.grid_area`).sort((a, b) => a[0].seriesIndex - b[0].seriesIndex);
      } else if (type === 'scatter') {
        this.addScatterChart(this.series[seriesIndex], axisIndex, seriesIndex);
      }
    }
    let opacity = show ? 0.5 : 1;
    this.legendData[seriesIndex] = {
      ...item,
      show: !show
    };
    this.lableGrops.data(this.legendData);
    this.legendText.filter(_d => seriesIndex == _d.seriesIndex).attr('opacity', opacity);
    this.legendRect.filter(_d => seriesIndex == _d.seriesIndex).attr('fill-opacity', opacity)
    this.series[seriesIndex].show = !show;
    this.creatYaxis('update');
    this.update();
  }


  update() {
    this.yAxisConfig.forEach((item, index) => {
      this.changeChart(index);
    })
  }

  updateLegendOverStatus(gridIndex, seriesIndex, status) {
    const {
      type
    } = this.series[seriesIndex];
    switch (type) {
      case 'line':
        this.circleView[`grid_${gridIndex}_circle_${seriesIndex}`].select('circle')
          .transition().duration(300).attr("r", this.series[seriesIndex].symbolSize * (status ? 1.7 : 0.8))
          .transition().duration(100).attr("r", this.series[seriesIndex].symbolSize * (status ? 1.5 : 1));
        break;
      case 'scatter':
        this.scatterView[`grid_${gridIndex}_scatter_${seriesIndex}`]
          .transition().duration(300).attr("r", this.series[seriesIndex].symbolSize * (status ? 1.7 : 0.8))
          .transition().duration(100).attr("r", this.series[seriesIndex].symbolSize * (status ? 1.5 : 1))
        break;
      default:
        break;
    }
  }

  calculateWidth(item) {
    let pre = d3.select(this.el).append('span').style('display', 'inline-block').attr('font-size', '12px').text(item);
    let width = pre._groups[0][0].clientWidth;
    pre.remove();
    return width
  }

  setSeries(series) {
    this.seriesData = series.map(({
      data = [],
      name = ''
    }, seriesIndex) => {
      let color = this.color(name)
      return data.map((_item, _index) => {
        return {
          xData: this.xAxisConfig[0].data[_index], // 暂时取第0个xAxis数据
          yData: _item,
          xType: this.xAxisConfig[0].type,
          index: _index,
          color,
          name,
          seriesIndex
        }
      })
    })
  }

  createSeries() {
    this.series.forEach((item, index) => {
      let gridIndex = this.gridsConfig.length === 1 ? 0 : index;
      switch (item.type) {
        case 'line':
          this.addLineChart(item, gridIndex, index)
          break;
        case 'scatter':
          this.addScatterChart(item, gridIndex, index)
          break;
        default:
          break;
      }

    })
  }



  addLineChart(item, gridIndex, seriesIndex) {
    const {
      lineStyle,
      areaStyle,
    } = item;
    this.createLine({
      lineStyle: Object.assign({}, this.lineStyle, lineStyle || {})
    }, gridIndex, seriesIndex);
    if (areaStyle) {
      this.createArea({
        areaStyle: Object.assign({}, this.areaStyle, areaStyle || {})
      }, gridIndex, seriesIndex);
    }
    this.creatCircle(item, gridIndex, seriesIndex);
  }

  creatCircle(item, gridIndex, index) {
    const {
      symbol = 'circle',
        symbolSize = 5,
        transition = false
    } = item;
    let circleView = this.grids['grid_' + gridIndex]
      .append('g').attr('clip-path', `url(#grid_${gridIndex}_clip_${this.clipCode}_circle)`)
      .attr('class', 'circle_group_' + index)
      .selectAll('g')
      .data(this.seriesData[index])
      .enter()
      .append('g')

    this.circleView[`grid_${gridIndex}_circle_${index}`] = circleView;
    let circle = circleView
      .append(symbol)
      .attr('class', 'circle')
    if (transition) {
      circle = circle
        .attr('cx', () => 0)
        .attr('cy', d => this.yScale['yScale_' + gridIndex](d.yData))
      if (this.isFun(transition)) {
        circle = transition(circle);
      } else {
        circle = circle
          .transition()
          .duration((d, i) => i * 600)
          .ease(d3.easeElasticIn.amplitude(3).period(2))
      }
    }

    circle.attr('cx', d => this.xScale['xScale_' + gridIndex](d.xType === 'time' ? new Date(d.xData) : d.xData))
      .attr('cy', d => this.yScale['yScale_' + gridIndex](d.yData))
      .attr('r', '2')
      .attr('fill', '#fff')
      .attr('stroke-width', 1).attr("stroke", d => d.color)
      .attr('r', symbolSize)
    this.circle[`grid_${gridIndex}_circle`] = circle;
  }

  createArea(option = {}, gridIndex, index) {
    let {
      areaStyle
    } = option;
    let areaName = `grid_${gridIndex}_area_${index}`;
    this.area[areaName] = d3.area()
      .curve(d3.curveMonotoneX)
      .x(d => this.xScale['xScale_' + gridIndex](d.xType === 'time' ? new Date(d.xData) : d.xData))
      .y0(this.yScale['yScale_' + gridIndex](0))
      .y1(d => this.yScale['yScale_' + gridIndex](d.yData));
    let area = this.grids['grid_' + gridIndex].append('g')
      .append('path')
      .datum(this.seriesData[index])
      .attr('d', this.area[areaName])
    this.setNodeAttr(area, {
      ...areaStyle,
      class: areaName + ' grid_area',
      stroke: 'none',
      'clip-path': 'url(#grid_' + gridIndex + '_clip_' + this.clipCode + ')',
      'fill-opacity': this.series.length > 1 && this.yAxisConfig.length === 1 ? '0.5' : '0.8' //同一坐标系多个area的时，file-opacity 0.5
    })
    if (areaStyle) {
      if (typeof areaStyle.fill === 'object') {
        //生成渐变
        let id = this.createLineGradient(areaStyle.fill, gridIndex);
        area.style('fill', "url(#" + id + ")")
      } else {
        area.attr('fill', areaStyle.fill || (d => d[0].color))
      }
    }
  }

  addScatterChart(item, gridIndex, seriesIndex, type = 'create') {
    const {
      symbolSize,
      duration,
      color
    } = item
    let scatterName = `grid_${gridIndex}_scatter_${seriesIndex}`;
    if (type === 'create') {
      var circleUpdate = this.grids['grid_' + gridIndex]
        .append('g')
        .attr('class', scatterName)
        .attr('clip-path', 'url(#grid_' + gridIndex + '_clip_' + this.clipCode + ')')
        .selectAll("circle")
        .data(this.seriesData[seriesIndex])
    } else {
      var circleUpdate = this.grids['grid_' + gridIndex].select('.' + scatterName)
        .selectAll("circle")
        .data(this.seriesData[seriesIndex])
    }
    var circleEnter = circleUpdate.enter()

    var circleExit = circleUpdate.exit();
    circleUpdate.transition()
      .duration(duration)
      .attr("cx", d => this.xScale['xScale_' + gridIndex](d.xData))
      .attr("cy", d => this.yScale['yScale_' + gridIndex](d.yData));

    let scatterView = circleEnter.append("circle")
      .attr("fill", color || (d => d.color))
      .attr("fill-opacity", 0.5)
      .attr("r", symbolSize * 0.5)
      .style('cursor', 'pointer')
    this.scatterView[scatterName] = this.scatterView[scatterName] ? scatterView.merge(this.scatterView[scatterName]) : scatterView
    scatterView
      .attr("cx", d => this.xScale['xScale_' + gridIndex](d.xData))
      .attr("cy", d => this.yScale['yScale_' + gridIndex](d.yData))
      .attr("fill-opacity", 1)
      .transition()
      .duration(duration)
      .attr("r", symbolSize * 1)

    circleExit.transition()
      .duration(duration)
      .attr("fill", "white")
      .remove();
    scatterView.selectAll('circle').attr('r', 10)
  }

  createLine(option = {}, gridIndex, index) {
    let {
      lineStyle
    } = option;
    let lineName = `grid_${gridIndex}_line_${index}`;
    this.line[lineName] = d3
      .line()
      .x(d => this.xScale['xScale_' + gridIndex](d.xType === 'time' ? new Date(d.xData) : d.xData))
      .y(d => this.yScale['yScale_' + gridIndex](d.yData))
      .curve(d3.curveMonotoneX)
    let line = this.grids['grid_' + gridIndex]
      .append("path")
      .datum(this.seriesData[index])
      .attr("d", this.line[lineName])
      .attr('stroke', d => d[0].color)
    const {
      transition,
      ...style
    } = lineStyle;
    this.lineObj[lineName] = {
      line,
      transition
    };
    this.setNodeAttr(line, {
      ...style,
      class: lineName + ' grid_line',
      fill: 'none',
      'clip-path': 'url(#grid_' + gridIndex + '_clip_' + this.clipCode + ')'
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
      line = line
        .attr("stroke-dasharray", len + " " + len)
        .attr("stroke-dashoffset", len)
        .transition()
        .duration(duration !== null ? duration : 2500)
        .attr("stroke-dashoffset", 0)
    }
    return line;
  }

  setDataZoom() {
    if (!this.dataZoom) return;
    /**
     * 因为统计图可能会出现多个grid，所以通过条件给直接grid设置zoom
     */
    if (this.dataZoom[0].inside) {
      this.gridsConfig.forEach((item, index) => {
        let zoomIndex = this.dataZoom[0].zoomIndex;
        let status = zoomIndex && zoomIndex.indexOf(index) != -1;
        if (!status) return;
        this.zoomRect[index].call(this.zoomFun(index))
      })
    }
    /**
     * 因为横坐标只会出现一个brush空间//所以不需要多次创建
     */
    if (this.dataZoom[0].brush) {
      this.createBrush();
    }
  }

  createBrush(isResize = false) {
    var _this = this;
    let brush = d3
      .brushX()
      .extent([
        [50, 0],
        [this.container.width - 50, 35]
      ])

    brush.on('brush end', function () {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return;
      //通过事件对象获取画刷目前的长度以及位置，类似brush.move(selection, [50, 100])
      let s = d3.event.selection
      _this.gridsConfig.forEach((item, index) => {
        let xAxisIndex = _this.dataZoom[0].xAxisIndex;
        let status = xAxisIndex && xAxisIndex.indexOf(index) != -1;
        if (!status) return;
        _this.xScale['xScale_' + index].domain(s.map(_this.x2Scale.invert, _this.x2Scale));
        _this.changeChart(index)
      })
    })
    this.brush = brush;
    let brushContainer = isResize ? d3.select(this.el).select('.brush') : this.svg.append("g").attr("class", "brush");
    brushContainer
      .attr("transform", "translate(0," + (this.container.height - 50) + ")")
      .call(brush)
      .selectAll("rect")
      .attr("width", this.container.width - 100)
      .attr("height", 35)
    d3.select(this.el).select('.brush .selection').attr('stroke', 'none')
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
        _this.gridsConfig.forEach((_, index) => {
          if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return;
          let t = d3.event.transform.rescaleX(_this.x2Scale);
          _this.svg.select(".brush").call(_this.brush.move, _this.xScale['xScale_' + index].range().map(d3.event.transform.invertX, d3.event.transform))
          _this.xScale['xScale_' + index].domain(t.domain());
          _this.changeChart(index);
        })
      });
  }

  changeChart(gridIndex) {
    var _this = this;
    _this.setAxisLabel(_this.axisX[gridIndex], _this.xAxisConfig[gridIndex].axisLabel || {});
    _this.grids['grid_' + gridIndex].select('.x-axis_' + gridIndex).transition().duration(300).call(_this.xAxis['xAxis' + gridIndex]);
    this.series.forEach((_, _index) => {
      switch (_.type) {
        case 'line':
          this.changeLine(gridIndex, _index);
          break;
        case 'scatter':
          this.changeScatter(gridIndex, _index);
          break;
        default:
          break;
      }
    })
  }

  changeScatter(gridIndex, seriesIndex) {
    this.addScatterChart(this.series[seriesIndex], gridIndex, seriesIndex, 'update');
  }

  changeLine(gridIndex, seriesIndex) {
    let circleView = this.circleView[`grid_${gridIndex}_circle_${seriesIndex}`];
    let lineView = this.lineObj[`grid_${gridIndex}_line_${seriesIndex}`];
    let AreaView = this.area[`grid_${gridIndex}_area_${seriesIndex}`];


    if (lineView) {
      this.grids['grid_' + gridIndex].select(`.grid_${gridIndex}_line_${seriesIndex}`).datum(this.seriesData[seriesIndex]).attr('d', this.line[`grid_${gridIndex}_line_${seriesIndex}`])
      // lineView.line.datum(this.seriesData[seriesIndex])
      // const {
      //   line,
      //   transition
      // } = lineView;
      // let curentLine = this.transitionLine(line, {
      //   ...transition,
      //   duration: 0
      // });
      // curentLine.attr('d', this.line[`grid_${gridIndex}_line_${seriesIndex}`])
    }
    if (AreaView) {
      this.grids['grid_' + gridIndex].select(`.grid_${gridIndex}_area_${seriesIndex}`).datum(this.seriesData[seriesIndex]).attr('d', AreaView);
    }
    if (circleView) {
      const {
        symbol = 'circle',
          symbolSize = 5,
      } = this.series[seriesIndex];
      circleView = circleView.data(this.seriesData[seriesIndex])
        .enter()
        .append('g')
        .merge(circleView)
      this.circleView[`grid_${gridIndex}_circle_${seriesIndex}`] = circleView
      circleView.selectAll('circle').remove();
      circleView
        .append(symbol)
        .attr('class', 'circle')
        .attr('cx', d => this.xScale['xScale_' + gridIndex](d.xType === 'time' ? new Date(d.xData) : d.xData))
        .attr('cy', d => this.yScale['yScale_' + gridIndex](d.yType === 'time' ? new Date(d.yData) : d.yData))
        .attr('r', '2')
        .attr('fill', '#fff')
        .attr('stroke-width', 1).attr("stroke", d => d.color)
        .attr('r', symbolSize)
    }
    circleView && circleView.selectAll('circle')
      .attr('cx', d => this.xScale['xScale_' + gridIndex](d.xType === 'time' ? new Date(d.xData) : d.xData))
      .attr('cy', d => this.yScale['yScale_' + gridIndex](d.yType === 'time' ? new Date(d.yData) : d.yData))
  }

  setYAxis(yAxis = {}) {
    this.yAxisConfig = yAxis instanceof Array ? yAxis : [yAxis];
    this.creatYaxis(); //创建y轴
  }

  setXAxis(xAxis = {}) {
    this.xAxisConfig = xAxis instanceof Array ? xAxis : [xAxis];
    this.creatXaxis(); //创建x轴
  }

  resize() {
    this.setContainerClient();
    this.creatXaxis('update', true);
    this.creatYaxis('update', true);
    this.update();
    this.createBrush(true);
    this.gridsConfig.forEach((item, index) => {
      this.createClipPath(index, true);
      this.createOverPlane(item, index, true);
    })
  }

  updateChart(options = {}) {
    const {
      xAxis = [], series = []
    } = options;
    this.xAxisConfig.forEach(item => {
      item.data = item.data.concat(xAxis)
    })
    this.series.forEach((item, index) => {
      item.data = item.data.concat(series[index])
    })
    this.setSeries(this.series);
    this.creatXaxis('update');
    this.creatYaxis('update');
    this.update();
  }

  //type create | update
  creatYaxis(yAxisType = 'create', isResize = false) {
    this.yAxisConfig.forEach((item, index) => {
      let {
        type = 'line', show = true, getDomain, format, align = 'bottom', resover = true, axisLabel,
          name
      } = item;
      let data = null;
      if (this.yAxisConfig.length === 1 && this.seriesData.length >= 1) {
        data = this.series.reduce((total, {
          data,
          show = true
        }) => show ? total.concat(data) : total, [])
      } else {
        data = this.series[index].data;
      }
      if (!data.length) return;
      let {
        left,
        top
      } = this.gridsConfig[index];
      let scaleConfig = {
        getDomain,
        type,
        resover,
        data,
      }
      if (yAxisType === 'create') {
        this.yScale['yScale_' + index] = this.getScale({
          ...scaleConfig,
          isRange: true,
          align,
          index
        })
        this.yAxis['yAxis' + index] = d3[this.lineAlign[align]]().scale(this.yScale['yScale_' + index])
      } else {
        this.yScale['yScale_' + index] = this.yScale['yScale_' + index].domain(this.getDomainData(scaleConfig));
        if (this.yScale['yScale_' + index]) {
          this.yScale['yScale_' + index].range(this.getRange(align, index));
        }
        this.grids['grid_' + index].select('.y-axis_' + index).transition().duration(500).call(this.yAxis['yAxis' + index]);
      }
      if (format)
        format(this.yAxis['yAxis' + index])
      if (!show) return;
      let createStatus = !(isResize || yAxisType === 'update');
      let axis = createStatus ? this.grids['grid_' + index].append('g') : this.axisY[index]
      axis.attr("class", "axis y-axis_" + index)
        .attr("transform", "translate(" + left + ",0 )")
        .call(this.yAxis['yAxis' + index]);
      if (name) {
        if (typeof name === 'string') {
          let axisXName = createStatus ? this.grids['grid_' + index].append("text") : this.grids['grid_' + index].select('.axisY-name');
          axisXName.attr('class', 'axisY-name')
            .text(name)
            .attr("text-anchor", "end") //字体尾部对齐
            .attr("y", top - 6) //沿y轴平移一个字体的大小
            .attr("x", 50) //沿y轴平移一个字体的大小
        } else {
          name(this.grids['grid_' + index])
        }
      }
      if (this.isFun(axisLabel))
        axisLabel(axis);
      this.axisY[index] = axis; //存储x轴
    })
  }

  creatXaxis(xAxisType = 'create', isResize = false) {
    this.xAxisConfig.forEach((item, index) => {
      let {
        type = 'line', data = [], show = true, getDomain, format, align = 'bottom', axisLabel, name
      } = item;
      let {
        width
      } = this.container;
      let {
        left
      } = this.gridsConfig[index];
      let otherConfig = {
        align,
        index,
        isRange: true
      }
      let scaleConfig = {
        type,
        getDomain,
        data
      }
      if (xAxisType === 'create') {
        let params = {
          ...scaleConfig,
          ...otherConfig
        }
        this.xScale['xScale_' + index] = this.getScale({
          ...params
        })
        if (this.dataZoom) {
          this.x2Scale = this.getScale({
            ...params
          })
        }
        this.xAxis['xAxis' + index] = d3[this.lineAlign[align]]().scale(this.xScale['xScale_' + index]);
      } else {
        this.xScale['xScale_' + index] = this.xScale['xScale_' + index].domain(this.getDomainData(scaleConfig))
        this.x2Scale = this.x2Scale.domain(this.getDomainData(scaleConfig))
        if (isResize) {
          this.xScale['xScale_' + index].range(this.getRange(align, index));
          this.x2Scale.range(this.getRange(align, index));
        }
        this.grids['grid_' + index].select('.x-axis_' + index).transition().duration(500).call(this.xAxis['xAxis' + index]);
      }
      if (format)
        this.xAxis['xAxis' + index] = format(this.xAxis['xAxis' + index])
      let position = this.getPosition({
        gridIndex: index,
        type: 2
      })
      if (show) {
        let createStatus = !(isResize || xAxisType === 'update');
        let axis = createStatus ? this.grids['grid_' + index].append('g') : this.axisX[index];
        axis
          .attr("class", "axis x-axis_" + index)
          .attr("transform", "translate(0," + position + ")")
          .call(this.xAxis['xAxis' + index]);
        if (name) {
          if (typeof name === 'string') {
            let axisXName = createStatus ? this.grids['grid_' + index].append("text") : this.grids['grid_' + index].select('.axisX-name');
            axisXName.attr('class', 'axisX-name')
              .text(name)
              .attr("transform", "translate(" + (width - left + 40) + "," + (position + 10) + ")")
              .attr("text-anchor", "end") //字体尾部对齐
          } else {
            name(this.grids['grid_' + index])
          }
        }
        if (this.isFun(axisLabel))
          axisLabel(axis);
        this.axisX[index] = axis; //存储x轴
        this.setAxisLabel(axis, axisLabel);
      }
    })
  }
  setAxisLabel(axis, option) {
    if (!option) return;
    let text = axis.selectAll("text")
    this.setNodeAttr(text, option);
  }

  getScale({
    type,
    align,
    index,
    isRange = false,
    ...otherParams
  }) {
    let doMain = this.getDomainData({
      ...otherParams,
      type
    })
    let scale = d3[`${this.axisType[type]}`]()
    return isRange ? scale.domain(doMain).range(this.getRange(align, index)) :
      scale.domain(doMain);
  }

  getDomainData({
    getDomain,
    type,
    data,
    resover = false
  }) {
    return this.isFun(getDomain) ? getDomain({
      type
    }, data) : this.getDomain({
      type,
      resover
    }, data)
  }

  getRange(align = 'bottom', index) {
    let {
      left,
      top,
      right
    } = this.gridsConfig[index];
    let position = this.getPosition({
      gridIndex: index,
      type: 2
    })
    return (align === 'bottom' || align === 'top') ? [left, this.container.width - right] : [top, position]
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
      this.gridsContainer[id] = this.svg.append('g').attr('id', id + '_container');
      this.grids[id] = this.gridsContainer[id].append('g').attr('id', id);
      this.createClipPath(index);
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
  setContainerClient() {
    const {
      _groups: [
        [{
          clientWidth,
          clientHeight
        }]
      ]
    } = d3.select(this.el);
    this.container.width = clientWidth;
    this.container.height = clientHeight;
  }

  createSvgContainer(el) {
    let box = d3.select(el);
    this.el = el;
    this.setNodeAttr(box, {
      width: "100%",
      'user-select': "none",
      position: "relative"
    })
    this.setContainerClient();
    this.d3Container = box.append('div');
    this.setNodeAttr(this.d3Container, {
      width: '100%',
      height: '100%',
      position: "relative"
    }, 'style');
    this.id = 'chart_' + parseInt(Math.random() * 1000);
    this.d3Container.attr('id', this.id)
    this.svg = this.d3Container.append('svg');
    this.setNodeAttr(this.svg, {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
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

  createClipPath(index = 0, isResize = false) {
    let {
      left,
      right,
      top
    } = this.gridsConfig[index];
    let position = this.getPosition({
      gridIndex: index
    })
    let clipArr = ['current', 'circle'];
    let clipPath = null;
    clipArr.forEach((_, _index) => {
      if (isResize) {
        clipPath = this.grids['grid_' + index].select('#grid_' + index + "_clip_" + this.clipCode + (_index ? '_circle' : '')).select('rect');
      } else {
        clipPath = this.grids['grid_' + index].append('defs')
          .append('clipPath')
          .attr('id', 'grid_' + index + "_clip_" + this.clipCode + (_index ? '_circle' : ''))
          .append('rect')
      }
      clipPath = clipPath.attr('height', position + (_index * 6))
        .attr('y', 0)
        .attr('x', 0)
        .attr("transform", `translate(${left - (_index * 3)},${top -_index * 3})`)
      if (!isResize) {
        clipPath = clipPath.attr('width', 0)
          .transition()
          .duration(1500)
          .ease(d3.easeExpInOut)
      }
      clipPath
        .attr('width', this.container.width - (left + right) + (_index * 6))
    })
  }
  setNodeAttr(node, option, type = 'attr') {
    for (var i in option) {
      node[type](i, option[i])
    }
  }
}
export default Chart;
