<?php
	/*
		验证用户手机有效性
			* 验证用户手机是否被占用(手机号是否存在数据库)
	 */
	
	include 'connect.php';
	
	$phonenumber = isset($_GET['phonenumber']) ? $_GET['phonenumber'] : null;


	$sql = "select * from users where phonenumber='$phonenumber'";

	// echo "$sql";

	// 执行sql语句
	$result = $conn->query($sql);

	// var_dump($result);

	// 判断是否获取到数据
	if($result->num_rows>0){
		echo "no";
	}else{
		echo "yes";
	}

?>