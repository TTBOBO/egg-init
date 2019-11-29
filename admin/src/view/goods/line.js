class Chart {
  constructor(el) {
    this.version = '0.0.1';
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
    this.circleView = {}; //存储circle
    this.xAxisConfig = null;
    this.yAxisConfig = null;
    this.xAxis = {}; //存储 xAxis坐标轴对象
    this.xScale = {}; //存储横坐标数据
    this.x2Scale = null;
    this.circle = {}; // 存储点对象
    this.yAxis = {}; //存储yAxis坐标轴对象
    this.axisX = {}; //X轴
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
      type: 'solid',
      "stroke-opacity": 1,
      // stroke: '#058cff'
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
    let item = this.legendData.filter(item => item.value === name)[0]
    this.showHideLegeng(gridIndex, serisesIndex, {
      ...item,
      show: resover ? item.show : !show
    });
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
    this.gridsConfig.forEach((item, index) => {
      let {
        left,
        right,
        top,
        bottom,
      } = item;
      this.createHoverLine(index);
      let data = this.seriesData[0]; //x轴值都是一样的  取第0个就行
      let react = this.gridsContainer['grid_' + index].append("rect")
        .attr("class", "overPlane")
        .attr("opacity", 0)
        .attr('height', this.container.height - (top + bottom))
        .attr("transform", `translate(${left},${top})`)
        .attr('width', this.container.width - (left + right))
      var tipFun = util.debounce(function (x, y, params) {
        _this.tip.style("display", null);
        let resultData = params.map(item => `<div style="display: flex;align-items: center;"><span style="display: inline-block;margin-right:5px;width: 8px;height: 8px;background: ${item.color || 'red'};border-radius:4px;mrgin-right:5px;"></span>${item.seriesName}:${item.value}</div>`);
        _this.tip.html(formatter ? formatter(params) : "<div id='tip' style='color: #fff;text-align:left;line-height: 20px;'>" + params[0].axisValue + "<br/>" + resultData.join('') + "</div>")
          .transition().duration(100) //提示框的内容
          .style('left', x + 20 + 'px') //提示框的位置
          .style('top', y + 20 + 'px')
      }, 50)
      react.on("mouseover", () => {
        this.hoverLine[`grid_hoverline_${index}`].style("display", null);
      }).on('mousemove', function () {
        let xScale = _this.xScale['xScale_' + index];
        var xdata = xScale.invert(d3.mouse(this)[0]);
        var yIndex = bisect(data, xdata);
        var d0 = data[yIndex - 1];
        var d1 = data[yIndex];
        var current = d1.xType === 'time' ? new Date(d1.xData) : d1.xData;
        var d = d0 ? (xdata - d0.xData > current - xdata ? d : d1) : data[0];
        _this.hoverLine[`grid_hoverline_${index}`].attr("transform", "translate(" + xScale(d.xType === 'time' ? new Date(d.xData) : d.xData) + ",0)");
        let res = _this.series.map((item, sIndex) => {
          _this.circleView[`grid_${index}_circle_${sIndex}`].select('circle').filter(function (cur) {
            d3.select(this).attr("r", () => cur.index === d.index ? item.symbolSize * 1.5 : item.symbolSize);
          })
          return {
            value: item.data[d.index],
            axisIndex: index,
            dataIndex: d.index,
            axisValue: d.xData,
            seriesIndex: sIndex,
            seriesName: item.name,
            seriesType: item.type,
            color: _this.color(item.name)
          }
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
        this.hoverLine[`grid_hoverline_${index}`].style("display", 'none');
        _this.series.map((item, sIndex) => {
          _this.circleView[`grid_${index}_circle_${sIndex}`].select('circle').attr("r", item.symbolSize)
        })
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
    this.gridsConfig.forEach((grid, index) => {
      data.forEach(value => {
        let _index = this.seriesNames.indexOf(value)
        if (_index != -1) {
          let obj = {
            value,
            width,
            axisIndex: index,
            seriesIndex: _index,
            show: true
          }
          width += this.calculateWidth(value) + itemPadding + itemWidth + itemMargn
          legendData.push(obj);
        }
        this.series.forEach((_, _index) => this.seriesIndexConfig[_.name] = [index, _index]); //存储seriesItem 对应grid  以及 group的 index
      })
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
      show
    } = item;
    if (show) {
      this.circleView[`grid_${axisIndex}_circle_${seriesIndex}`].remove();
      this.grids['grid_' + axisIndex].select(`.grid_${axisIndex}_area_${seriesIndex}`).remove();
      this.grids['grid_' + axisIndex].select(`.grid_${axisIndex}_line_${seriesIndex}`).remove();
    } else {
      this.addChart(this.series[seriesIndex], axisIndex, seriesIndex);
      this.grids['grid_' + axisIndex].selectAll(`.grid_line`).sort((a, b) => a[0].seriesIndex - b[0].seriesIndex);
      this.grids['grid_' + axisIndex].selectAll(`.grid_area`).sort((a, b) => a[0].seriesIndex - b[0].seriesIndex);
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
  }

  updateLegendOverStatus(gridIndex, seriesIndex, status) {
    this.circleView[`grid_${gridIndex}_circle_${seriesIndex}`].select('circle').attr("r", this.series[seriesIndex].symbolSize * (status ? 1.5 : 1));
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
      this.createClipPath();
      this.addChart(item, gridIndex, index)
    })
  }

  addChart(item, gridIndex, seriesIndex) {
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
      .append('g')
      .selectAll('g')

      .data(this.seriesData[index])
      .enter()
      .append('g')
      .attr('clip-path', `url(#grid_${gridIndex}_clip)`)
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
      'clip-path': 'url(#grid_' + gridIndex + '_clip)',
      'fill-opacity': this.series.length > 1 && this.yAxisConfig.length === 1 ? '0.5' : '1' //同一坐标系多个area的时，file-opacity 0.5
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
      'clip-path': 'url(#grid_' + gridIndex + '_clip)'
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
      this.createBrush(this.dataZoom[0]);
    }
  }

  createBrush() {
    var _this = this;
    let brush = d3
      .brushX()
      .extent([
        [50, 0],
        [this.container.width - 50, 50]
      ])
      .on('brush end', function () {
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
    this.svg
      .append("g")
      .attr("transform", "translate(0," + (this.container.height - 50) + ")")
      .attr("class", "brush")
      .call(brush)
      .selectAll("rect")
      .attr("width", this.container.width - 100)
      .attr("height", 50)
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
        _this.svg.select(".brush").call(_this.brush.move, _this.xScale['xScale_' + index].range().map(d3.event.transform.invertX, d3.event.transform))
        _this.xScale['xScale_' + index].domain(t.domain());
        _this.changeChart(index);
      });
  }

  changeChart(index) {
    var _this = this;
    _this.setAxisLabel(_this.axisX[index], _this.xAxisConfig[index].axisLabel || {});
    _this.grids['grid_' + index].select('.x-axis_' + index).call(_this.xAxis['xAxis' + index]);
    this.series.forEach((_, _index) => {
      _this.circleView[`grid_${index}_circle_${_index}`].select('circle').attr('cx', d => _this.xScale['xScale_' + index](d.xType === 'time' ? new Date(d.xData) : d.xData))
        .attr('cy', d => _this.yScale['yScale_' + index](d.yType === 'time' ? new Date(d.yData) : d.yData))
      _this.grids['grid_' + index].select(`.grid_${index}_line_${_index}`).attr('d', _this.line[`grid_${index}_line_${_index}`])
      const {
        line,
        transition
      } = _this.lineObj[`grid_${index}_line_${_index}`];
      _this.transitionLine(line, {
        ...transition,
        duration: 0
      });
      _this.grids['grid_' + index].select(`.grid_${index}_area_${_index}`).attr('d', _this.area[`grid_${index}_area_${_index}`])
    })

  }

  setYAxis(yAxis = {}) {
    this.yAxisConfig = yAxis instanceof Array ? yAxis : [yAxis];
    this.creatYaxis(); //创建y轴
  }

  setXAxis(xAxis = {}) {
    this.xAxisConfig = xAxis instanceof Array ? xAxis : [xAxis];
    this.creatXaxis(); //创建x轴
  }

  //type create | update
  creatYaxis(yaxisType = 'create') {
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
        console.log('多个y轴');
      }
      if (!data.length) return;
      let {
        left,
      } = this.gridsConfig[index];
      let domain = (this.isFun(getDomain) ? getDomain({
        type,
        resover
      }, data) : this.getDomain({
        type,
        resover
      }, data))
      if (yaxisType === 'create') {
        console.log(111)
        this.yScale['yScale_' + index] = d3[`${this.axisType[type]}`]()
          .domain(domain)
          .range(this.getRange(align, index))
        this.yAxis['yAxis' + index] = d3[this.lineAlign[align]]().scale(this.yScale['yScale_' + index])
      } else {
        this.yScale['yScale_' + index].domain(domain);
        this.grids['grid_' + index].select('.y-axis_' + index).call(this.yAxis['yAxis' + index]);
        this.changeChart(index);
        return false;
      }
      if (format)
        format(this.yAxis['yAxis' + index])
      if (yaxisType !== 'create') return;
      if (!show) return;
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
      if (this.isFun(axisLabel))
        axisLabel(axis);
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
      if (format)
        this.xAxis['xAxis' + index] = format(this.xAxis['xAxis' + index])
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
      this.gridsContainer[id] = this.svg.append('g').attr('id', id + '_container');
      this.grids[id] = this.gridsContainer[id].append('g').attr('id', id);
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
    this.el = el;
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
      .attr('height', this.container.height - (top + bottom) + 5)
      .attr('y', 0)
      .attr('x', 0)
      .attr("transform", `translate(${left},${top-5})`)
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
