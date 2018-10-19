$(function(){
    //设置轮播图
    myFocus.set({
        id:'myFocus',//ID
        pattern:'mF_fancy'//风格
    });


//设置要生成的商品数目及其页面(及要显示哪几个)
var page = 1;
var qty = 18;

//封装生成商品列表函数
function createList(){
    $.ajax({
        type: 'get',
        url: '../api/indexGoodslist.php',
        async: true,
        data:{
            'page': page,
            'qty': qty
        },
        success: function (data) {
            // var result=eval("("+data+")");
            var result = JSON.parse(data);

            let shopBox = document.querySelector('#shopBox');
            // var goodsShow = document.createElement('div');

            for(var i=0;i<result.length;i++){
                var goodsShow='<div class="goods-show" data-idx="'+result[i][1]+'">'+
                '<a href="#" class="shopLink"><img src="'+result[i][3]+'" alt="" class="goodsPic"/></a>'+
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


//打开页面生成18个商品
createList();

//点击加载更多,显示多18个商品
$('#addmore').click(function(){
    page++;
    console.log(page,qty);
    createList();
});


//点击产品进行页面传参跳转到详情页
    $('#shopBox').delegate('.goods-show','click',function(){
        console.log(this);
        var idxN =  this.dataset.idx;//获取自定义属性用于传参
        console.log(idxN);

        location.href = 'html/goods.html?' + idxN;

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

//获取购物车cookie
// 用于保存所有商品cookie
        var goodsCookie = Cookie.get('goodsCookie');//[{},{}], ''

        if(goodsCookie === ''){
            goodsCookie = [];
        }else{
            goodsCookie = JSON.parse(goodsCookie);
        }
        console.log(goodsCookie);

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