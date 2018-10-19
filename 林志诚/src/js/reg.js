$(function(){

    //滑块滚动验证
    $('#drag').drag();


    //生成随机6位数的验证码
    $myCode=$('#myCode');
    //给span生成一个随机6位数验证码   
           
    function createCode(i){//i为参数
        var Code='';

        for(var n=0;n<i;n++){
            Code+=parseInt(Math.random()*10);
        }
        $('#codeNum').html(Code);
    }

    //页面刷新生成随机验证码
    createCode(6); 

    //点击codeNum更换验证码
    $('#codeNum').click(function(){
        createCode(6); 
    });

    //密码可见与不可见切换
    // $('#eyeClose').toggleClass<---用什么可以切换属性呀(function() {
    //     $('#password').attr('type', 'text');
    // }, function() {
    //     $('#password').attr('type', 'password');
    // });
    var flag = true;

    $('#eyeClose').click(function(){
        if(flag){
            $('#password').attr('type', 'text');
            $('#eyeClose i').removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
        }else{
            $('#password').attr('type', 'password');
            $('#eyeClose i').removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
        }
        flag = !flag;
    });

    //验证是否为有效手机号码正则
   
    $('#phonenumber').blur(function() {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test($(this).val())) {
            console.log('号码无效或者格式错误');
            $('#userN-tip').show();
            return false;
        } 
        else {
            console.log('号码正确');
            $('#userN-tip').hide();
            return true;
        }
    });
    document.onmousedown=function(){
        $('#userN-tip').hide();
        $('#userN-warn').hide();
        $('#code-warn').hide();
        $('#passW-warn').hide();
    }

    //验证验证码是否正确
    $('#myCode').blur(function() {
        if($(this).val()===$('#codeNum').html()){
            console.log('通过验证码验证');
        }else{
            console.log('验证码输入有误');
            $('#code-warn').show();
        }
    });

    //验证密码格式是否正确
    $('#password').blur(function() {
        var reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/;
        if (!reg.test($(this).val())) {
            $('#passW-warn').show();
            return false;
        } 
        else {
            console.log('密码可用');
            return true;
        }
    });

    //验证手机号是否被注册
    let phonenumber = document.querySelector('#phonenumber');
    let password = document.querySelector('#password');
    let btnReg = document.querySelector('#btnReg');

    let statusCode = [200,304];


    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(statusCode.indexOf(xhr.status)>=0){
            let res = xhr.responseText;
            console.log(res);

            if(res === 'no'){
                $('#userN-warn').show();
            }else if(res === 'yes'){
                console.log('可用');
            }

        }
    }

    // 检测用户是否被占用
    phonenumber.onblur = ()=>{
        xhr.open('get','../api/check_number.php?phonenumber='+phonenumber.value,true);
        xhr.send();
    }

    //注册
    let xhr_reg = new XMLHttpRequest();
    xhr_reg.onload = function(){
        if(statusCode.indexOf(xhr_reg.status)>=0){
            let res = xhr_reg.responseText;
            console.log(res);
            if(res === 'success'){
                location.href = 'login.html';
            }else{
                alert('注册失败');
            }
        }
    }

    // 点击注册
    btnReg.onclick = function(){
        // 获取用户名，密码
        let _phonenumber = phonenumber.value;
        var _password = password.value;

        xhr_reg.open('get',`../api/reg.php?phonenumber=${_phonenumber}&password=${_password}`,true);
        xhr_reg.send();
    }



});