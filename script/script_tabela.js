$(document).ready(function () {
    var dados = []; // Armazena os dados JSON recebidos do PHP

    // Função para preencher a tabela com dados
    function preencherTabela(pagina) {
        var registrosPorPagina = 15;
        var inicio = (pagina - 1) * registrosPorPagina;
        var fim = inicio + registrosPorPagina;

        var tabela = document.getElementById("dados");
        tabela.innerHTML = ""; // Limpa a tabela

        for (var i = inicio; i < fim && i < dados.length; i++) {
            var row = tabela.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = dados[i].ID;
            cell2.innerHTML = dados[i].Time;
            cell3.innerHTML = dados[i].Metano_ppm;
        }
    }

    // Função para gerar os links de paginação
    function gerarLinksDePaginacao(paginaAtual) {
        var totalPaginas = Math.ceil(dados.length / 15);
        var paginacao = document.getElementById("paginacao");
        paginacao.innerHTML = ""; // Limpa a div de paginação
    
        for (var i = 1; i <= totalPaginas; i++) {
            var link = document.createElement("a");
            link.href = "javascript:void(0);";
            link.innerHTML = i;
            link.onclick = function () {
                var paginas = document.querySelectorAll('.pagination a');
                paginas.forEach(function (pagina) {
                    pagina.classList.remove('active-page'); // Remove a classe "active-page" de todos os links
                });
    
                this.classList.add('active-page'); // Adiciona a classe "active-page" ao link atual
                preencherTabela(parseInt(this.innerHTML));
            };
    
            if (i === paginaAtual) {
                link.classList.add('active-page'); // Adiciona a classe "active-page" à página atual
            }
    
            paginacao.appendChild(link);
        }
    }
    
    

    // Agora você já recebeu os dados do PHP por meio de uma solicitação AJAX
    $.ajax({
        url: 'http://localhost/tcc/web/Dashboard_Biodigestor/data/teste.php',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            dados = response;

            // Obtém a página atual da URL (por exemplo, ?pagina=2)
            var urlParams = new URLSearchParams(window.location.search);
            var paginaAtual = parseInt(urlParams.get("pagina")) || 1;
            // Inicialize a tabela e a paginação
            preencherTabela(paginaAtual);
            gerarLinksDePaginacao(paginaAtual);
        }
    });
});
