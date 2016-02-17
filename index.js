/**
 * Created by yan on 16-2-17.
 */
(function () {

  var sumNode = document.getElementById('sum');

  function show(name) {
    document.getElementById('input').value = name;
    fetch(`https://api.github.com/users/${name}/repos?per_page=1024&sort=created&direction=asc`)
      .then(res=>res.json())
      .then(function (list) {
        //list = list.filter(a=>new Date(a.created_at).getFullYear() == 2015)
        drawLine(list);
        drawTotal(list);
        drawPie(list);
        sumNode.innerText = list.reduce((sum, a)=>sum + a.stargazers_count, 0);
      });
  }

  function drawLine(list) {
    var myChart = echarts.init(document.getElementById('line'));
    var option = {
      title: {
        text: 'Star and Watch',
        top: 20,
        textStyle: {
          color: '#2c343c'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: list.map(a=>new Date(a.created_at))
      },
      yAxis: {},
      series: [{
        name: 'stargazers_count',
        type: 'bar',
        data: list.map(a=>a.stargazers_count)
      },
        {
          name: 'forks_count',
          type: 'bar',
          data: list.map(a=>a.forks_count)
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  function drawTotal(list) {
    var myChart = echarts.init(document.getElementById('total'));
    var option = {
      title: {
        text: 'Star Trends',
        top: 20,
        textStyle: {
          color: '#2c343c'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: list.map(a=>new Date(a.created_at))
      },
      yAxis: {},
      series: [{
        name: 'stargazers_count',
        type: 'line',
        data: list.reduce((arr, item)=> {
          var sum = arr.length ? arr[arr.length - 1] : 0;
          arr.push(sum + item.stargazers_count);
          return arr
        }, [])
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  function drawPie(list) {
    var myChart = echarts.init(document.getElementById('pie'));
    var option = {
      backgroundColor: '#2c343c',
      title: {
        text: 'Star',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },

      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },

      visualMap: {
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: 'Star',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: list
            .map(a=>({
              name: a.full_name.split('/')[1],
              value: a.stargazers_count
            }))
            .sort((a, b)=> {
              return a.value - b.value
            })
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  var matchResult = window.location.search.slice(1).match(/username=([^&]*)/);
  if (matchResult && matchResult[1]) {
    show(matchResult[1])
  }
})()
