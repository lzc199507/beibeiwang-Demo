<?php
	/*
		注册用户

			* 把数据写入数据库
	 */
	
	include 'connect.php';//require('connect.php');
	
	// 获取前端参数
	$phonenumber = isset($_GET['phonenumber']) ? $_GET['phonenumber'] : null;
	$password = isset($_GET['password']) ? $_GET['password'] : null;


	if($phonenumber && $password){
		// 用户有效性验证
		$sql = "select * from users where phonenumber='$phonenumber'";

		$result = $conn->query($sql);

		if($result->num_rows>0){
			echo "fail";
		}else{
			// 对密码进行加密
			$password = md5($password);
			
			// 写入数据库
			$sql = "insert into users(phonenumber,password) values('$phonenumber','$password')";

			$result = $conn->query($sql);

			if($result){
				echo "success";
			}else{
				echo "fail";
			}
		}
	}else{
		echo "无法获取用户名或密码";
	}


?>