// Variável para armazenar o gráfico
var chart;

// Variável para controlar o estado do botão NH3
var buttonState = {
  NH3: false,
};

// Função para criar o gráfico
function createChart(data, NH3Data) {
  var ctx = document.getElementById('myChart').getContext('2d');
  
  //CONFIGURAÇÕES DO GRÁFICO (TIPO, DADOS, LEGENDA DOS DADOS, CORES)
  var config = {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Metano (ppm)',
          data: data.data,
          borderColor: '#0FF',
          tension: 0.1,
          fill: true,
          backgroundColor: gradient,
        },
        {
          label: 'NH3 (ppm)',
          data: NH3Data.data,
          borderColor: '#dc143c',
          tension: 0.1,
          fill: true,
          backgroundColor: gradient,
        }
      ]
    },

    options: {
      responsive: true,
      hoverRadius: 5,
      scales: {
        x: {
          display: true,
          ticks: {
            font: {
              size: 12
            },
          },
        },

        y: {
          display: true,
          ticks: {
            font: {
              size: 12
            },
          },
        },
      }
    }
  };

  // CRIA O GRÁFICO
  chart = new Chart(ctx, config);
}

// Função para atualizar o gráfico
function updateChart(data, NH3Data) {
  chart.data.labels = data.labels;
  chart.data.datasets[0].data = data.data;
  chart.data.datasets[1].data = NH3Data.data;
  chart.update();
}

// Função para buscar dados iniciais
function fetchData() {
  fetch('http://localhost/tcc/site/Data/Metano_ppm.php')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      createChart(data, data_NH3);
    });
}

// Função para buscar dados do NH3
function fetchNH3Data() {
  fetch('http://localhost/tcc/site/Data/NH3_ppm.php')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      updateChart(chart.data, data);
    });
}

// Event listener para o botão NH3
document.getElementById('btn_NH3').addEventListener('click', function() {
  buttonState.NH3 = !buttonState.NH3;
  if (buttonState.NH3) {
    fetchNH3Data();
  } else {
    updateChart(chart.data, { labels: [], data: [] });
  }
});

// Função para buscar dados a cada 1 segundo
setInterval(function() {
  fetchData();
}, 1000);

// Inicializa o gráfico
fetchData();
