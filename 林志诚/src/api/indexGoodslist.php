<?php
// 分页与数量
    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 9;

    // string a= $page;
    // echo a;

// echo $page;
// echo $qty;
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


$result=$conn->query("select * from goodslist where idx<=$page*$qty&&idx>($page-1)*$qty");

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









    // if($sort){
    // 	$sql .= " order by $sort*1";

    // 	// 降序
    // 	if($desc){
    // 		$sql .= " desc";
    // 	}
    // }

    // // echo "$sql";
    
    // // 读取数据
    // // 获取查询结果集（集合）
    // $result = $conn->query($sql);

    // // 从集合中取出所有数据
    // $row = $result->fetch_all(MYSQLI_ASSOC);

   
   	// //释放查询结果集，避免资源浪费
    // $result->close();
    // // 关闭数据库，避免资源浪费
    // $conn->close();

   	// echo json_encode($row,JSON_UNESCAPED_UNICODE);
?>