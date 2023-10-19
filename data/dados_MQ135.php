<?php

header("Access-Control-Allow-Origin: *");

// Conecta ao banco de dados MariaDB
$host = '127.0.0.1'; // endereço do servidor
$username = 'root'; // nome de usuário
$password = ''; // senha
$database = 'tcc'; // nome do banco de dados

$mysqli = new mysqli($host, $username, $password, $database);

$qnt_valores = -25; // Limite para a quantidade de dados que aparecem no gráfico

// Verifica se houve erro na conexão
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit();
}
// Consulta os dados no banco de dados
$query = "SELECT NH3_ppm, CO2_ppm FROM mq_135 ORDER BY time DESC "; // altere para a sua tabela e colunas
$result = $mysqli->query($query);

// Cria arrays para armazenar os dados do gráfico
$NH3 = array();
$CO2 = array();

// Percorre os resultados da consulta e armazena os dados no arrays do gráfico
while ($row = $result->fetch_assoc()) {
    $NH3[] = floatval($row['NH3_ppm']); // formata a data/hora para exibir no gráfico
    $CO2[] = floatval($row['CO2_ppm']); // converte o valor para float e armazena no array
}

$NH3 = array_reverse($NH3); // inverte a ordem das datas para exibir no gráfico na ordem correta
$CO2 = array_reverse($CO2); // inverte a ordem dos valores para exibir no gráfico na ordem correta

// Fecha a conexão com o banco de dados
$mysqli->close();

// Retorna os dados em formato JSON
echo json_encode([
  'NH3' => array_slice($NH3,$qnt_valores), 
  'CO2' => array_slice($CO2,$qnt_valores) 
]);
