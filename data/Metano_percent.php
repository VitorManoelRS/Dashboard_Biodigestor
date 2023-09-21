<?php

header("Access-Control-Allow-Origin: *");

// Conecta ao banco de dados MariaDB
$host = '127.0.0.1'; // endereço do servidor
$username = 'root'; // nome de usuário
$password = ''; // senha
$database = 'tcc'; // nome do banco de dados

$mysqli = new mysqli($host, $username, $password, $database);

// Verifica se houve erro na conexão
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit();
}

// Consulta os dados no banco de dados
$query = "SELECT time, Metano_percentage FROM sensor ORDER BY time DESC"; // altere para a sua tabela e colunas
$result = $mysqli->query($query);

// Cria arrays para armazenar os dados do gráfico
$labels = array();
$data = array();

// Percorre os resultados da consulta e armazena os dados no arrays do gráfico
while ($row = $result->fetch_assoc()) {
    $labels[] = date('d-m-Y H:i:s', strtotime($row['time'])); // formata a data/hora para exibir no gráfico
    $data[] = floatval($row['Metano_percentage']); // converte o valor para float e armazena no array
}

// Fecha a conexão com o banco de dados
$mysqli->close();

// Retorna os dados em formato JSON
echo json_encode([
  'labels' => array_reverse($labels), // inverte a ordem das datas para exibir no gráfico na ordem correta
  'data' => array_reverse($data) // inverte a ordem dos valores para exibir no gráfico na ordem correta
]);
