var ctx = document.getElementById('myChart').getContext('2d');

// Variável para armazenar o gráfico
var chart;

var buttonState = {
    NH3: false,
};

var data_NH3 = [];

var data_CH4 = {
    labels: [
        "27-09 10:01:28", "27-09 10:01:58", "27-09 10:02:28", "27-09 10:02:58", "27-09 10:03:28", "27-09 10:03:58", "27-09 10:04:28", "27-09 10:04:58", "27-09 10:05:28", "27-09 10:05:58", "27-09 10:06:28", "27-09 10:06:58", "27-09 10:07:28", "27-09 10:07:58", "27-09 10:08:28"
    ],
    data: [17.2, 17.9, 17.4, 18.3, 18.7, 17.1, 18.8, 17.6, 18.4, 18.2, 17.5, 18.9, 18.1, 17.7, 19.0]
};

// Adicionando cores abaixo do gráfico usando a variável gradient
const gradient = ctx.createLinearGradient(0, 0, 0, 0);
gradient.addColorStop(0, '#5cffca');
gradient.addColorStop(1, '#66ff');

// Função para criar o gráfico
function createChart(data_CH4, data_NH3) {
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
                    fill: true,
                    backgroundColor: gradient,
                },
                {
                    label: 'NH3 (ppm)',
                    data: data_NH3,
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
function updateChart(data_CH4, data_NH3) {
    chart.data.labels = data_CH4.labels;
    chart.data.datasets[0].data = data_CH4.data;
    chart.data.datasets[1].data = data_NH3;
    chart.update();
}

// Event listener para o botão NH3
document.getElementById('btn_NH3').addEventListener('click', function () {
    selecionado = document.getElementById('btn_NH3');
    buttonState.NH3 = !buttonState.NH3; // Inverte o estado do botão
    if (!buttonState.NH3) {
        selecionado.style.backgroundColor='red';
        data_NH3 = [];
        
    } else {
        selecionado.style.backgroundColor='green';
        data_NH3 = [42.8, 41.7, 45.3, 41.5, 44.2, 46.0, 42.2, 47.0, 41.9, 45.7, 44.5, 43.6, 42.5, 46.5, 41.2];
    }
    updateChart(data_CH4, data_NH3);

});

// Inicializa o gráfico
createChart(data_CH4, data_NH3);
