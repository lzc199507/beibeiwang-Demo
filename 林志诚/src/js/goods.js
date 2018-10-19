$(function(){

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


    //获取页面参数
    var url = location.search;//console.log(url);

    //去掉参数最前面的'?'
    var params = url.substring(1);//console.log(params);

    createDetails(params);

    //封装生成详情页面结构
    function createDetails(p){
    $.ajax({
        type: 'get',
        url: '../api/goods.php',
        async: true,
        data:{
            'params': p
        },
        success: function (data) {
            // var result=eval("("+data+")");
            var result = JSON.parse(data);
            // console.log(result);
            $('#goodsTitle').html(result[0][2]);
            var nextimg = Number(result[0][0])+1;
            var newP = (result[0][4]*result[0][5]/10).toFixed(2);
            var saveP = (result[0][4] - newP).toFixed(2);

            let goodsAll = document.querySelector('#goods-all');
            goodsAll.innerHTML='';
            goodsAll.innerHTML=`

            <div id="imgBox" data-idx="${result[0][1]}">
                        <div class="box">
                            
                            <img class="bigP" src="../${result[0][3]}" alt="" />

                            <img src="../${result[0][3]}" alt="" class="smallP" />
                            <img src="../img/g${nextimg}.jpg" alt="" class="smallP" />
                             
                        </div> 
                    </div>
                    <div class="goodsContent">
                        <h3>今日特卖</h3>
                        <p class="title">${result[0][2]}</p>

                        <div class="price-info">
                            <span class="newPrice">&#165;${newP}</span>
                            <div class="oldPrice">${result[0][4]}</div>
                            <div class="discount">
                            折扣<br />${result[0][5]}折</div>
                            <div class="save">您节省了<br />${saveP}</div>
                        </div>

                        <div class="select-info">
                            <div class="s-save s-con">
                                <label for="">优惠</label>
                                <span> 购买后约返10个贝壳 </span>
                            </div>
                            <div class="s-carriage s-con">
                                <label for="">运费</label>
                                <span>包邮（偏远地区除外）</span>
                            </div>
                            <div class="s-color s-con" id="s-color">
                                <label for="">颜色</label>
                                <span>白色</span><span>粉红色</span>
                            </div>
                            <div class="s-size s-con" id="s-size">
                                <label for="">尺寸</label>
                                <span>XS</span>
                                <span>S</span>
                                <span>M</span>
                                <span>L</span>
                            </div>
                        </div>

                        <div class="num-info">
                            <label for="">购买数量</label>
                            <div class="input-group s-num">
                                <span class="input-group-addon" id="cutnum">
                                    -
                                </span>
                                <input type="text" class="form-control" id="s-num" value="1" >
                                <span class="input-group-addon btn-con" id="addnum">+</span>
                            </div>
                        </div>

                        <div id="addToCar">加入购物车</div>

                    </div>
                `;
        }
    });
}



//事件委托
// //点击选择颜色高亮
// $('#s-color span').click(function(){
//     console.log(666);
// });              #s-color span是动态生成的 

// $('span').click(function(){
//     console.log(666);
                        // span是动态生成的 
// });

// $('span').on( 'click',function(){
//     console.log(666);
                        // span是动态生成的 
// });
/*
这样无法触发事件，因为程序找不到此节点。 
在jQuery中有“向未来的元素添加事件处理程序”方法说明，也正是动态创建元素无法触发事件的原因所在。 
正确的写法应该是：

例如 
$(‘父元素’).on(‘click’,’动态的子元素’,function(){});

!!!!!父元素要是静态就有的，不能是动态生成的，不然会获取不到!!!!!

*/ 

//挑选高亮
$('#goods-all').delegate('span','click',function(){
    $(this).css('border-color','#f90').siblings().css('border-color','#ccc');
    //选中的添加一个类名，方便后面获得
    $(this).addClass('choose').siblings().removeClass('choose');
});
//加数量的不高亮
$('#goods-all').on('click','.num-info span',function(){
    $(this).css('border-color','#ccc');
});
//鼠标按下改背景颜色
$('#goods-all').on('mousedown','.num-info span',function(){
    $(this).css('background','#fff');
});
//鼠标弹起恢复背景颜色
$('#goods-all').on('mouseup','.num-info span',function(){
    $(this).css('background','#eee');
});

//点击添加数量
$('#goods-all').on('click','#addnum',function(){
    var i = $(this).prev().val();
    i++;
    $(this).prev().val(i);
});
//点击减少数量
$('#goods-all').on('click','#cutnum',function(){
    var i = $(this).next().val();
    i = Number(i);
    if(i==1){
        i == 1;
    }else{
        i--;
    }
    $(this).next().val(i);
});


// 用于保存所有商品cookie
        var goodsCookie = Cookie.get('goodsCookie');//[{},{}], ''

        if(goodsCookie === ''){
            goodsCookie = [];
        }else{
            goodsCookie = JSON.parse(goodsCookie);
        }
        console.log(goodsCookie);


//点击添加到购物车,保存cookie
$('#goods-all').on('click','#addToCar',function(){
    //获取自定义属性--商品唯一标识
    var goodsId = $('#goods-all').find('#imgBox').attr('data-idx');
    // console.log(goodsId);
    //获取选中的颜色
    var color = $('#goods-all').find('#s-color span.choose').html();
    // console.log(color);
    //获取选中的size
    var size = $('#goods-all').find('#s-size span.choose').html();
    // console.log(size);
    //获取购买数量
    var num = $('#goods-all').find('#s-num').val();
    num = Number(num);
    // console.log(num);

    //获取图片URL
    var imgurl = $('#goods-all').find('.bigP').attr('src');
    // console.log(imgurl);

    //获取title
    var title = $('#goods-all').find('.title').html();
    // console.log(title);

    //获取newPrice
    var newPrice = $('#goods-all').find('.newPrice').html();
    newPrice = Number(newPrice.slice(1));
    // console.log(newPrice);

    //获取oldPrice
    var oldPrice = $('#goods-all').find('.oldPrice').html();
    oldPrice = Number(oldPrice);
    // console.log(oldPrice);

    // 判断商品是否为第一次添加
    for(var i=0;i<goodsCookie.length;i++){
        if(goodsCookie[i].goodsId === goodsId){
            // 如果goodsCookie中有一个商品跟当前guid一样，说明为多次添加
            goodsCookie[i].num += num;
            break;
        }
    }

    // 循环跑完，无法找到相同id，说明为第一次添加
    // 如何判断循环跑完
    if(i===goodsCookie.length){
        // 获取商品信息，并写入对象
        var mygoods = {
                            goodsId:goodsId,//guid商品唯一标识
                            imgurl:imgurl,
                            title:title,
                            color:color,
                            size:size,
                            newPrice:newPrice,
                            oldPrice:oldPrice,
                            num:num
                            // 商品数量：第一次添加（为num），多次添加（在原来基础上+num）
                        };
        goodsCookie.push(mygoods);
        
    }

    // console.log(goodsCookie);





    //设置cookie过期时间
    var pastd = new Date();
    // console.log(pastd);
    pastd.setDate(pastd.getDate()+30);
    // console.log(pastd);


    //保存到cookie
    Cookie.set('goodsCookie',JSON.stringify(goodsCookie),{expires:pastd,path:escape('/')});

    
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






});