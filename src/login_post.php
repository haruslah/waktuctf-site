<?php
$servername = "mysql-db"; // Docker MySQL container name
$dbUsername = "root";
$dbPassword = "root";
$dbname = "waktuctfDB";

// Connect to MySQL
$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$loginInput = trim($_POST['username']); // can be username or email
$password = $_POST['password'];

// Prepare statement to fetch user
$stmt = $conn->prepare("SELECT username, email, password_hash FROM Users WHERE username = ? OR email = ?");
$stmt->bind_param("ss", $loginInput, $loginInput);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo "<script>alert('User not found'); window.history.back();</script>";
    exit();
}

$stmt->bind_result($username, $email, $hashedPassword);
$stmt->fetch();

if (password_verify($password, $hashedPassword)) {
    echo "<script>
    localStorage.setItem('islogin', 'true');
    alert('Login successful! Welcome, $username'); window.location.href='index.html';
    </script>";
} else {
    echo "<script>alert('Incorrect password'); window.history.back();</script>";
}

$stmt->close();
$conn->close();
?>
