<?php
// Conectar ao banco de dados MySQL
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "tcc";
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// Consulta SQL para buscar os dados desejados
$sql = "SELECT * FROM sensor";
$result = $conn->query($sql);

// Fechar a conexão com o banco de dados
?>