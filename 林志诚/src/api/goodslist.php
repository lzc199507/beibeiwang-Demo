<?php

// 分页与数量
    $kind = isset($_GET['kind']) ? $_GET['kind'] : '童装';

    // echo $kind;
    // string a= $kind;
    // echo a;

// echo $kind;
    /*
        商品列表
            * 返回所需商品


        1)连接数据库

        2）数据操作
            * 读取数据
                * select * from...
     */

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'beibei';
    
    // 创建连接
    $conn = new mysqli($servername, $username, $password, $dbname);

if(!$conn){
    die("error:".$conn->connect_error);
}
//设置查询结果的编码，一定要放在query之前
$conn->query("SET NAMES 'UTF8'");


$result=$conn->query("select * from goodslist where category='$kind'");

// 获取分类的商品
// $lie = '母婴';
// $result=$conn->query("select * from goodslist where category='$lie'");
// $result=$conn->query("select * from goodslist where category='童装'");



//$conn->query()获取的是二进制
//将查询的结果集封装到一个数组里
$css=$result->fetch_all();
//以json的格式发送ajax的success中由data接收
echo json_encode($css,JSON_UNESCAPED_UNICODE);
$conn->close();


?>