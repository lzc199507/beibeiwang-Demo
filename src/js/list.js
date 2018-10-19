$(function(){

    //封装生成所有商品列表函数
function createAll(){
    $.ajax({
        type: 'get',
        url: '../api/indexGoodslist.php',
        async: true,
        data:{
            'page': 1,
            'qty': 72
        },
        success: function (data) {
            // var result=eval("("+data+")");
            var result = JSON.parse(data);

            let shopBox = document.querySelector('#shopBox');
            shopBox.innerHTML = '';
            // var goodsShow = document.createElement('div');

            for(var i=0;i<result.length;i++){
                var goodsShow='<div class="goods-show" data-idx="'+result[i][1]+'">'+
                '<a href="#" class="shopLink"><img src="../'+result[i][3]+'" alt="" class="goodsPic"/></a>'+
                        '<p class="goodsTitle">'+result[i][2]+'</p>'+
                        '<div class="price-info">'+
                        '<span class="newPrice">&#165;'+(result[i][4]*result[i][5]/10).toFixed(2)+'</span>'+
                        '<span class="oldPrice">'+result[i][4]+'</span>'+
                        '<span class="discount">'+result[i][5]+'折</span></div> </div>';
                
                // shopBox.appendChild(goodsShow);//追加到你需要放在的位置
                shopBox.innerHTML+=goodsShow;
            }
        }
    });
}


//打开页面请求所有商品
createAll();

//委托事件
$('#sub-nav').delegate('.sub-item','click',function(){

    $('.sub-item').removeClass('active');
    $(this).addClass('active');

    var kind = $(this).html();
    console.log(kind);
    console.log(typeof(kind));

    if(kind == '全部'){
        createAll();
    }else{
        createKind(kind);
    }

});


    //封装生成某类商品列表函数
function createKind(kind){
    $.ajax({
        type: 'get',
        url: '../api/goodslist.php',
        async: true,
        data:{
            'kind': kind
        },
        success: function (data) {
            // var result=eval("("+data+")");
            var result = JSON.parse(data);
            console.log(result);

            let shopBox = document.querySelector('#shopBox');
            shopBox.innerHTML='';
            // var goodsShow = document.createElement('div');

            for(var i=0;i<result.length;i++){
                var goodsShow='<div class="goods-show" data-idx="'+result[i][1]+'">'+
                '<a href="#" class="shopLink"><img src="../'+result[i][3]+'" alt="" class="goodsPic"/></a>'+
                        '<p class="goodsTitle">'+result[i][2]+'</p>'+
                        '<div class="price-info">'+
                        '<span class="newPrice">&#165;'+(result[i][4]*result[i][5]/10).toFixed(2)+'</span>'+
                        '<span class="oldPrice">'+result[i][4]+'</span>'+
                        '<span class="discount">'+result[i][5]+'折</span></div> </div>';
                
                // shopBox.appendChild(goodsShow);//追加到你需要放在的位置
                shopBox.innerHTML+=goodsShow;
            }
        }
    });
}


    
//点击产品进行页面传参跳转到详情页
    $('#shopBox').delegate('.goods-show','click',function(){
        console.log(this);
        var idxN =  this.dataset.idx;//获取自定义属性用于传参
        console.log(idxN);

        location.href = 'goods.html?' + idxN;

    });



//回到顶部
$('#toTop').click(function(){
    let timer = setInterval(()=>{
        // 计算缓冲速度（差值越大速度越大）
        let speed = window.scrollY/10;

        scrollBy(0,-speed);

        if(window.scrollY <= 0){
            clearInterval(timer);

            // 重置目标值
            scrollTo(0,0);
        }
    },30);
});


//获取号码的cookie
var numberCookie = Cookie.get('phonenumber');
if(numberCookie === ''){
            numberCookie = [];
        }else{//存在cookie表明已登录，在头部显示
            numberCookie = JSON.parse(numberCookie);
            $('#user-info').html('');
            var show = `<i class="glyphicon glyphicon-user"></i> 
                        <a href="#" class="num">${numberCookie}</a>
                        <a href="#" id="logout">退出</a>
                `;
            $('#user-info').html(show);

        }
console.log(numberCookie); 

//点击退出，删除用户名cookie
$('#user-info').on('click','#logout',function(){
    // console.log('退出');
    // 设置过期时间删除numberCookie
    var now = new Date();
    now.setDate(now.getDate()-1);
    Cookie.set('phonenumber','',{expires:now,path:escape('/')});

    //刷新页面
    window.location.reload();
});


});