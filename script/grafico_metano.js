var ctx = document.getElementById('myChart').getContext('2d');

const ppmInput = document.getElementById('concentracao_ppm');
const percentInput = document.getElementById('concentracao_percent');


  
        //adicionando cores abaixo do gráfico usando a variavel gradient
        const gradient = ctx.createLinearGradient(0,0,0, 400)
        gradient.addColorStop(0,'#5cffca')
        gradient.addColorStop(1,'#66ff')
        
        fetch('http://localhost/tcc/site/Data/Metano_ppm.php')
        .then(response => response.json())
  
        .then(data => {
  
          console.log(data);
  
  //CONFIGURAÇÕES DO GRÁFICO (TIPO, DADOS, LEGENDA DOS DADOS, CORES)
          var config = {
            type: 'line',
            data: {
              labels: data.labels,
              datasets: [{
                label: 'Concentração de Metano (ppm)',
                data: [],
                borderColor: '#000',
                tension: 0.1,
                data: data.data,
                fill: true,
                backgroundColor: gradient
              }]
            },
  
            options: {
              responsive: true,
              hoverRadius:5,
              scales: {
                x: {    //LEGENDA DO EIXO X
                  display: true,
                  ticks:{
                    font:{
                      size:12
                    },
                  },
                },

                y: {  //LEGENDA DO EIXO Y
                  display: true,
                  ticks:{
                    font:{
                      size:12
                    },
                  },
                }, 
              },
            }        
          };
  
          // Função para atualizar o gráfico a cada 1 segundo
          setInterval(function() {
            // Faz uma requisição AJAX para o arquivo PHP que retorna os dados do gráfico
            $.getJSON('http://localhost/tcc/site/Data/Metano_ppm.php', function(data) {
              // Atualiza o gráfico com os novos dados
              chart.data.labels = data.labels;
              chart.data.datasets[0].data = data.data;
              chart.update();
              
            });
          }, 1000);
  
          //CRIA O GRÁFICO
          var chart = new Chart(ctx, config);
        });
  
        