<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Conectar ao banco de dados
$servername = "127.0.0.1";  // Substitua pelo seu servidor de banco de dados
$username = "root";  // Substitua pelo seu nome de usuário
$password = "";    // Substitua pela sua senha
$dbname = "tcc";  // Substitua pelo nome do seu banco de dados

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Consulta SQL para obter os últimos 500 registros
$query = "SELECT ID, Time, Metano_ppm FROM sensor ORDER BY ID DESC LIMIT 500";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $dados = array(); // Array para armazenar os dados

    while ($row = $result->fetch_assoc()) {
        $dados[] = $row; // Adiciona cada registro ao array
    }

    // Converte os dados para JSON
    echo json_encode($dados);
} else {
    echo json_encode(array("message" => "Nenhum dado encontrado na tabela Sensor."));
}

// Feche a conexão com o banco de dados
$conn->close();
?>
