var ctx = document.getElementById('myChart').getContext('2d');

var chart;
var data_NH3 = [];
var data_CH4 = { labels: [], data: [] };

var data_CO2 = [];

//botoes
var buttonState = {
  CH4: false,
};


var x=0;

// Função para buscar dados de Metano em ppm
function data_MQ4() {
  return fetch('http://localhost/tcc/web/Dashboard_Biodigestor/data/dados_MQ4.php')
    .then(response => response.json())
    .then(data => {
      return data; // Retorna os dados JSON de CH4 em ppm
    });
}
  
  // Função para buscar dados de Metano em percentagem
function data_MQ135() {
  return fetch('http://localhost/tcc/web/Dashboard_Biodigestor/data/dados_MQ135.php')
    .then(response => response.json())
    .then(data => {
      return data; // Retorna os dados JSON de CO2 e NH3 em ppm
    });
}

// Event listener para o botão CH4
document.getElementById('btn_CH4').addEventListener('click', function () {
  selecionado = document.getElementById('btn_CH4');
  buttonState.CH4 = !buttonState.CH4; // Inverte o estado do botão
  if (!buttonState.CH4) {
    selecionado.style.backgroundColor = '#F0F0F0';
    chart.getDatasetMeta(0).hidden = true; // Esconde a primeira linha (Metano)
    x=0;
    
  } else {
    selecionado.style.backgroundColor = '#00FFFF';
    chart.getDatasetMeta(0).hidden = false; // Mostra a primeira linha (Metano)
    x=1;
    }
    chart.update(); // Atualiza o gráfico para refletir a mudança
});

// Event listener para o botão NH3
document.getElementById('btn_NH3').addEventListener('click', function () {
  selecionado = document.getElementById('btn_NH3');
  buttonState.NH3 = !buttonState.NH3; // Inverte o estado do botão
  if (!buttonState.NH3) {
    selecionado.style.backgroundColor = '#F0F0F0';
    chart.getDatasetMeta(1).hidden = true; // Esconde a segunda linha (NH3)
    x=0;

  } else {
    selecionado.style.backgroundColor = '#DC143C';
    chart.getDatasetMeta(1).hidden = false; // Mostra a segunda linha (NH3)
    x=1;
  }
  chart.update(); // Atualiza o gráfico para refletir a mudança
});

// Event listener para o botão CO2
document.getElementById('btn_CO2').addEventListener('click', function () {
  selecionado = document.getElementById('btn_CO2');
  buttonState.CO2 = !buttonState.CO2; // Inverte o estado do botão
  if (!buttonState.CO2) {
    selecionado.style.backgroundColor = '#F0F0F0';
    chart.getDatasetMeta(2).hidden = true; // Esconde a terceira linha (CO2)
    x=0;
  } else {
    selecionado.style.backgroundColor = 'lime';
    chart.getDatasetMeta(2).hidden = false; // Mostra a terceira linha (CO2)
    x=1;
  }
  chart.update(); // Atualiza o gráfico para refletir a mudança
});



  // Função para criar o gráfico com os dados fornecidos
  function createChart(data_CH4, data_NH3, data_CO2) {
    //CONFIGURAÇÕES DO GRÁFICO (TIPO, DADOS, LEGENDA DOS DADOS, CORES)
    var config = {
        type: 'line',
        data: {
            labels: data_CH4.labels,
            datasets: [
                {
                    label: 'Metano (ppm)',
                    data: data_CH4.data,
                    borderColor: '#0FF',
                    tension: 0.1,
                    hidden: true,
                    fill: true,
                    backgroundColor: 'rgba(0,0,0,0)',
                },
                {
                    label: 'NH3 (ppm)',
                    data: data_NH3,
                    borderColor: '#dc143c',
                    tension: 0.1,
                    hidden: true,
                    fill: true,
                    backgroundColor: 'rgba(0,0,0,0)',
                },
                {
                    label: 'CO2 (ppm)',
                    data: data_CO2,
                    borderColor: 'lime',
                    tension: 0.1,
                    hidden: true,
                    fill: true,
                    backgroundColor: 'rgba(0,0,0,0)',
                }
            ]
        },

        options: {
            responsive: true,
            hoverRadius: 8,
            animation: {duration:100},
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
                      callback: function(value){
                        let finalvalue = value.toFixed(1)
                        return finalvalue + ' ppm'
                      },
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

  // Inicia a atualização periódica do gráfico a cada segundo
  setInterval(updateChart, 100);
}
  
  // Chama as funções para obter os dados e, em seguida, cria o gráfico
  function updateChart() {
    Promise.all([data_MQ4(), data_MQ135()]).then(([MQ4, MQ135]) => {
      if (x == 1) {
        chart.data.labels = MQ4.labels;
        chart.data.datasets[0].data = MQ4.data;
        chart.data.datasets[1].data = MQ135.NH3;
        chart.data.datasets[2].data = MQ135.CO2;
      } else {
      }
      chart.update(); 

    });
  }


  Promise.all([data_MQ4(), data_MQ135()]).then(([MQ4, MQ135]) => {
    data_CH4.labels = MQ4.labels;
    data_CH4.data = [];
    data_NH3 = []; 
    data_CO2 = [];
    createChart(data_CH4, data_NH3, data_CO2);

  });
