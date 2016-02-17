/**
 * Created by yan on 16-2-17.
 */
var his = [];
var sum = 0;

function render(e) {
  var name = document.getElementById('input').value;
  fetch(`https://api.github.com/users/${name}/repos?per_page=1000`)
    .then(res=>res.json())
    .then(function (list) {
      drawLine(list);
      drawPie(list)
      var sum = list.reduce((sum, a)=>sum + a.stargazers_count, 0)
      document.getElementById('sum').innerHTML = sum;
    });
  return false;
}

function drawLine(list) {
  var myChart = echarts.init(document.getElementById('line'));
  var option = {
    title: {
      text: 'Star'
    },
    xAxis: {
      type: 'category',
      data: list.map(a=>new Date(a.created_at))
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'line',
      data: list.map(a=>a.stargazers_count)
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
      show: false,
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
        radius: '55%',
        center: ['50%', '50%'],
        data: list
          .map(a=>({
            name: a.full_name,
            value: a.stargazers_count
          }))
          .sort((a, b)=> {
            return a.value - b.value
          }),
        roseType: 'angle',
        label: {
          normal: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            }
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
