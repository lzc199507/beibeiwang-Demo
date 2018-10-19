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


//封装购物车列表函数
function render(){
            goodsCookie = Cookie.get('goodsCookie');//

            if(goodsCookie === ''){
                goodsCookie = [];
            }else{
                goodsCookie = JSON.parse(goodsCookie);
            }

            console.log(goodsCookie);

            console.log(goodsCookie[0]);
            console.log(goodsCookie[1]);
            

            var tbody = document.querySelector('.myCarList');

            for(var i=0;i<goodsCookie.length;i++){

            // 把商品写入页面
            // 创建tr
            var tr = document.createElement('tr');
            tr.classList.add('show-item');
                // 计算总价
                var total = goodsCookie[i].newPrice * goodsCookie[i].num;
            
            tr.innerHTML =  `
                            <td class="car-td-check">
                                <input type="checkbox" checked="checked" class="item-check">
                            </td>
                            <td class="car-td-item">
                                <a class="image" href="#" target="_blank">
                                    <img src="${goodsCookie[i].imgurl}">
                                </a>
                                <a class="title" href="#" target="_blank">
                                    ${goodsCookie[i].title}
                                </a>
                            </td>
                            <td class="car-td-info">
                                <p>${goodsCookie[i].color}</p>
                                <p>${goodsCookie[i].size}</p>
                            </td>
                            <td class="car-td-price">
                                <p class="newPrice">${goodsCookie[i].newPrice}</p>
                                <p class="oldPrice">${goodsCookie[i].oldPrice}</p>
                            </td>
                            <td class="car-td-num">
                                <div class="input-group s-num">
                                    <span class="input-group-addon cutnum">
                                        -
                                    </span>
                                    <input type="text" class="form-control shop-num" value="${goodsCookie[i].num}" >
                                    <span class="input-group-addon btn-con addnum" >+</span>
                                </div>
                            </td>
                            <td class="car-td-total">${total}</td>
                            <td class="car-td-del">
                                <a class="btn-del btn btn-warning" href="##">删除</a>
                            </td>
                        
                            `;
            
            console.log(tr);
                
            tbody.appendChild(tr);
            }

            
        }

//页面生成
render();

//计算数量
var arrNum = checkNum();

allNum(arrNum);
count(arrNum);


//点击添加数量
    $('.myCarList').on('click','.addnum',function(){
        var i = $(this).prev().val();
        i++;
        $(this).prev().val(i);

        //显示价格
        let price = $(this).parent().parent().prev().children('.newPrice').html();
        price = Number(price);
        $(this).parent().parent().next().html((price*i).toFixed(2));

        var arr1 = checkNum();

        allNum(arr1);
        count(arr1);
    });

//点击减少数量
    $('.myCarList').on('click','.cutnum',function(){
        var i = $(this).next().val();
        i = Number(i);
        if(i==1){
            i == 1;
        }else{
            i--;
        }
        $(this).next().val(i);

        //显示价格
        let price = $(this).parent().parent().prev().children('.newPrice').html();
        price = Number(price);
        $(this).parent().parent().next().html((price*i).toFixed(2));

        var arr1 = checkNum();

        allNum(arr1);
        count(arr1);

    });

//input框输入时改变价格
    $('.myCarList').on('input propertychange','.shop-num',function(){
        // console.log(666);
        let qty = $(this).val();
        qty = Number(qty);
        let price = $(this).parent().parent().prev().children('.newPrice').html();
        // console.log(price);
        price = Number(price);
        $(this).parent().parent().next().html((price*qty).toFixed(2));
        var arr1 = checkNum();

        allNum(arr1);
        count(arr1);
    });



//点击删除
    $('.myCarList').on('click','.btn-del',function(){
        $(this).parent().parent().remove();

        var arr1 = checkNum();
        allNum(arr1);
        count(arr1);
        update();
    });

//点击删除全部商品
    $('.del-all').click(function(){
        var ok = confirm('您确定要删除全部商品吗？')
        if(ok){
            $('table').remove();
            $('.allCount').remove();
        }
    });



//勾选全选
    var flag = false;
    
    $('#checkAll').click(function(){
        if(flag){
            $('.myCarList .item-check').prop('checked','true');
            $(this).prop('checked','true');
            // count();

        }else{
            // $('.good_check input').prop('checked','false');
            $('.myCarList .item-check').removeAttr('checked');
            $(this).removeAttr('checked');
        }
        flag = !flag;
        var arr1 = checkNum();

        allNum(arr1);
        count(arr1);
    });

//勾选的数量-->展示为一个数组，如[0,1,2],即勾选的是0，1，2.长度即为数量
    function checkNum(){
        var selected = [];
        for(let i=0;i<$('.myCarList .item-check').size();i++){
            if($('.myCarList .item-check').eq(i).prop('checked')){
                selected.push(i);
            }
        }
        console.log(selected);
        return selected;
    }

    $('.myCarList').on('click','.item-check',function(){
        var arr1 = checkNum();
    //如果都选中，则allchecked,checkAll,shopCheck也选中
        if(arr1.length === $('.item-check').size()){
            $('#checkAll').prop('checked',true);
        }else{//如果有一个未选中，则为未选中
            $('#checkAll').prop('checked',false);
        }

        var arr1 = checkNum();

        allNum(arr1);
        count(arr1);
    });


    //选中商品总数量
    function allNum(array){
        var num = 0;
        for(var i=0;i<array.length;i++){
            num += parseInt($('.myCarList .shop-num').eq(array[i]).val());
        }
        // console.log(num);
        $('#allnum span').html(num);
    }    


    //封装计算总价函数
    //计算总价(已勾选的)
    function count(array){
        var price = 0;
        for(let i=0;i<array.length;i++){
            let p = parseInt($('.myCarList .car-td-total').eq(array[i]).html());
            price += p;
        }
        console.log(price);
        
        $('#totalprice span').html(price);
    }

    //
    function update(){
        if($('.item-check').size() ===0){
            $('table').remove();
            $('.allCount').remove();
        }
    }


});