<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin:*");

    // 引用另外一个文件
    include "public/connect_db.php";

    
    // 或去json数据, 请求主体的格式为json格式
    $json = json_decode(file_get_contents("php://input"));
    $username = $json -> username;
    $password = $json -> password;
    // 链接数据库
    $coon = new db();
    $sql = "select * from shop_user WHERE username='$username'";//查询用户名是否存在
    $insert = "insert into shop_user (username,password) value ('$username','$password')";//插入用户表

    $rows = $coon -> Query($sql, 2);
    if($rows) {
        // 用户已存在
        $arr = array("code" => "400", "msg"=>"手机号已被注册");
    } else {
        // 用户不存在,--注册
        $rows = $coon -> Query($insert,3);
        if($rows){
            $arr = array("code" => "200", "msg"=>"注册成功", "data"=>array("username"=>$username,"token"=>"1234567899", "atavar"=> "http://www.aaa.com/path/a.png"));
        }
      
    }
    echo json_encode($arr);

   
  ?>