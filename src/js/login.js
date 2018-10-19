$(function(){

    //输入账号密码登录
    $phonenumber = $('#phonenumber');
    $password = $('#password');
    $btnLg = $('#btnLg');

    // $btnLg.attr('disabled', 'disabled');

    //设置cookie过期时间
    var pastd = new Date();
    // console.log(pastd);
    pastd.setDate(pastd.getDate()+7);

    let statusCode = [200,304];

    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(statusCode.indexOf(xhr.status)>=0){
            let res = xhr.responseText;
            console.log(res);

            if(res == 'fail'){
                alert('用户名或密码错误');

            }else{
                Cookie.set('phonenumber',res,{expires:pastd,path:escape('/')});

                location.href = '../index.html';
            }
        }
    }


// 判断是否滑动滑块到右边
// 
$btnLg.click(function(){
    if($('.drag_text').html() === '验证通过'){
        let _phonenumber = $phonenumber.val();
        let _password = $password.val();



        xhr.open('get',`../api/login.php?phonenumber=${_phonenumber}&password=${_password}`,true);
        xhr.send();
    }else{
        $('.drag_text').css('color','red');
    }


});

document.onmousedown=function(){
    $('.drag_text').css('color','#333');
}


 // function state1(){
 //             $("#drag").removeClass("r2"); 
 //             $("#drag").addClass("r1");
 //             setTimeout(state2,90);
 //         }
 //        function state2(){     
 //             $("#drag").removeClass("r1");
 //             $("#drag").addClass("r2"); 
 //             setTimeout(state1,90);
 //        }
 //        state1();



    


});