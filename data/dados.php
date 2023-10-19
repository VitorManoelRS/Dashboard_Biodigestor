<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tabela de Metano</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <style>
        /* Estilos CSS para a tabela */
        table {
            border-collapse: collapse;
            width: 100%;
        }

        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
            text-align: center;
            font-weight: normal;
            background-color: aliceblue;
        }
        th{
            background-color: lightgray;
        }

        form{
            margin-top: 10px;
            margin-right: 10px;
            text-align: end;
            font-size: 1em;
        }

        *{
            margin: 0px;
            padding: 0px;
            border: 0px;
            text-decoration: none;
        }

        body{
            background-color: #014225;
            color: #000;
            font-weight: bolder;
            padding: 20px;
        }

        p{
            color: #000;
        }

        a{
            font-weight: normal;
        }

    </style>    
    </head>
<body>

    <?php
        session_start(); // Iniciar a sessão
        include("conexão.php");

        // Verificar se o valor do campo de seleção foi enviado pelo formulário
        if(isset($_GET['registrosPorPagina'])) {
            $_SESSION['registrosPorPagina'] = $_GET['registrosPorPagina']; // Armazenar o valor selecionado na sessão
        }
        $registrosPorPaginaPadrao = 10; // Valor padrão inicial

        $registrosPorPagina = isset($_GET['registrosPorPagina']) ? $_GET['registrosPorPagina']:$registrosPorPaginaPadrao;
        
        // Quantidade de registros por página, valor padrão é 10
        $paginaAtual = isset($_GET['pagina']) ? $_GET['pagina'] : 1; // Página atual
        
        $queryTotalRegistros = "SELECT COUNT(*) AS total FROM sensor";
        $resultadoTotalRegistros = mysqli_query($conn, $queryTotalRegistros);
        $totalRegistros = mysqli_fetch_assoc($resultadoTotalRegistros)['total'];
    
        $totalPaginas = ceil($totalRegistros / $registrosPorPagina);
    
        $paginaAtual = isset($_GET['pagina']) ? $_GET['pagina'] : 1;
    
        $indiceInicial = ($paginaAtual - 1) * $registrosPorPagina;
    
        $queryDadosPagina = "SELECT * FROM sensor LIMIT $indiceInicial, $registrosPorPagina";
        $resultadoDadosPagina = mysqli_query($conn, $queryDadosPagina);
    ?>



    <form action="dados.php" method="get"> <!-- Altere o valor de "seu_script_php.php" para o nome do seu arquivo PHP -->
        <label for="registrosPorPagina"><p>Registros por Página:</p></label>
        <select name="registrosPorPagina" id="registrosPorPagina">

<!-- a parte em php faz com que a quantidade de registros se mantenha selecionada após atualizar a página-->
            <option value="10" <?php if($registrosPorPagina == 10) echo 'selected'; ?>>10</option>

            <option value="15" <?php if($registrosPorPagina == 15) echo 'selected'; ?>>15</option>
            <option value="20" <?php if($registrosPorPagina == 20) echo 'selected'; ?>>20</option>

           
        </select>
        <input type="submit" value="Atualizar">
    </form>

    <table>
        <tr>
            <th>ID</th>
            <th>Time</th>
            <th>Metano_ppm</th>
            <th>Metano_percentage</th>
        </tr>

        <?php 


        if ($result->num_rows > 0) {
            while($row = mysqli_fetch_assoc($resultadoDadosPagina)) {
                echo "<tr>";
                echo "<td>" . $row["ID"] . "</td>";
                echo "<td>" . $row["Time"] . "</td>";
                echo "<td>" . $row["Metano_ppm"] . "</td>";
                echo "<td>" . $row["Metano_percentage"] . "</td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='4'>Nenhum dado encontrado!</td></tr>";
            }
    
        echo "<br>";
        echo "Páginas: ";
        for ($i = 1; $i <= $totalPaginas; $i++) {
            echo "<a href='?pagina=$i&registrosPorPagina=$registrosPorPagina'>$i </a>";
        }
        // Fecha a conexão com o banco de dados
        mysqli_close($conn);
        ?>
    

    </table>

    <?php ?>
</body>
</html>