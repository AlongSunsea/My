window.addEventListener('load',function(){
        // 鼠标经过
        // console.log(111);
        var go = document.querySelector('.go');
        var goNext = document.querySelector('.goNext');
        var header = document.querySelector('.header');
        header.addEventListener('mouseenter',function(){
                // console.log(121);
                go.style.display = 'block';
                goNext.style.display = 'block';
                clearInterval(timer);
                timer = null;
        })

        header.addEventListener('mouseleave',function(){
                // console.log(11);
                go.style.display = 'none';
                // go.style.cursor = 'pointer';
                goNext.style.display = 'none';
                timer = setInterval(function(){
                        // 手动调用右侧按钮点击事件 
                        goNext.click();
                },3000)
        })


        //动态生成小圆点
        var banner = document.querySelector('.banner');
        var header = document.querySelector('.header')
        var ul = banner.querySelector('ul');
        var ol = header.querySelector('.dots');
        // console.log(ul.children.length);
        for (var i = 0;i<ul.children.length;i++){
                //创建li
                // console.log(ul.children.length);
                var li = document.createElement('li');
                // 记录当前的小圆圈索引号，可以自定义属性
                li.setAttribute('index',i);

                //插入ol里面
                ol.appendChild(li);
                 //排他思想  点击小圆圈
                li.addEventListener('click',function(){
                        // 清除其他
                        for (var i = 0;i<ol.children.length;i++){
                                ol.children[i].className = '';
                        }
                        // 重新给格式
                        this.className='current';

                        // 点击小圆圈移动图片, //点击小圆圈实现滚动   小圆圈的索引号*图片宽度
                        // 点击li得到当前索引号
                        var index = this.getAttribute('index');
                        //点击li就拿到当前li的索引号
                        num=index;
                        circle = index;
                        var focusWidth = banner.offsetWidth;
                        // console.log(focusWidth);
                        // console.log(index);
                        animate(banner,-1540*index);
                })
        }
        //第一个设置类名current
        ol.children[0].className = 'current';


        // 克隆第一张图片放到ul后面
        var first = ul.children[0].cloneNode(true);  //深克隆
        ul.appendChild(first);




        // 点击有箭头，向右滑动
        var goNext = document.querySelector('.goNext');
        var num=0;
        var circle = 0;   //控制小圆圈移动

        //节流阀
        var flag = true;
        goNext.addEventListener('click',function(){
                if(flag){
                        flag=false;
                        //走到最后一张，banner复原,无缝滚动
                        if(num ==  ul.children.length - 1){
                        banner.style.left = 0;
                        num = 0;
                        }
                        num++;
                        animate(banner,-num*1540,function(){
                                flag=true;   
                        });

                        circle++;
                        if(circle==ol.children.length){
                                circle=0;
                        }
                        //排他思想清除其余小圆圈的current类名
                        for(var i=0;i<ol.children.length;i++){
                        // console.log(111);
                        ol.children[i].className='';
                        }

                        ol.children[circle].className='current';
                }
                
        })


        //点击左箭头
        var goPre = document.querySelector('.goPre');
        goPre.addEventListener('click',function(){
               if(flag){
                       flag=false;
                        //走到最后一中，banner复原,无缝滚动
                        if(num ==  0){
                        banner.style.left = 0;
                        num = ul.children.length-1;
                        }
                        num--;
                        animate(banner,-num*1540,function(){
                                flag=true;  
                        });
                        circle--;
                        if(circle<0){
                                circle=3;
                        }
                        //排他思想清除其余小圆圈的current类名
                        for(var i=0;i<ol.children.length;i++){
                                // console.log(111);
                                ol.children[i].className='';
                        }
                        ol.children[circle].className='current';
               }
        })


        //自动播放轮播图  类似点击右键按钮
        var timer = setInterval(function(){
                // 手动调用右侧按钮点击事件 
                goNext.click();

        },3000)
       
        //轮播图结束

        // 导航栏监听效果
        var nav = document.querySelector('.nav');
        var as =document.querySelector('.as');
        var mobile = document.querySelector('.mobile');
        var navTop = nav.offsetTop;
        document.addEventListener('scroll',function(){
                if(window.pageYOffset>0){
                        nav.className = 'nav nav-fixed';
                        for(var i=0;i<as.children.length;i++){
                                as.children[i].className='';
                        }
                        as.children[0].className = 'active';
                }else{
                        nav.className = 'nav ';
                }

                // console.log(window.pageYOffset);
                if(window.pageYOffset>=1410){
                        for(var i=0;i<as.children.length;i++){
                                as.children[i].className='';
                        }
                        mobile.className = 'active';
                }
                if(window.pageYOffset>=1958){
                        for(var i=0;i<as.children.length;i++){
                                as.children[i].className='';
                        }
                        as.children[2].className = 'active';
                }
                if(window.pageYOffset>=2524){
                        for(var i=0;i<as.children.length;i++){
                                as.children[i].className='';
                        }
                        as.children[3].className = 'active';
                }
        })





        // 移动模块滚动及显示
        var tabApp = document.querySelector('.tabApp');
        var tabAs =  document.querySelectorAll('.tab-a');
        var blueLine = document.querySelector('.tab-hline');
        var num1;
        var panel = document.querySelector('.tab-panel');
        //var line = document.getElementsByClassName('line')[0];
        //记录滑动初始位置
        var initial;
        //记录上一次下划线位置
        var start;
        var time;
        console.log(tabAs);
        tabAs.forEach(function(item){
                 //给每个标签绑定点击事件
                item.onclick = function(){
                //        console.log(this);
                       num1 = this.getAttribute('data-index');
                       console.log('num1='+num1);
                       for(var i=0;i<4;i++){
                        //        console.log(i);
                        panel.children[i].className='tab-panel-li';
                       }
                       console.log(num1);
                       panel.children[num1].className='tab-panel-li active';
                // console.log(this);
                tabAs.forEach(function(e1){
                    e1.classList.remove('active');
                })
               
                item.classList.add('active');
                // console.log(item.offsetLeft);
                 // 清除定时器
                 clearInterval(time);
                // console.log(2);
                if(item.offsetLeft>=290){
                        blueLine.style.width = '110px';
                }else {
                        blueLine.style.width = '58px';
                }
                animation(item.offsetLeft);
                start = item.offsetLeft;
                // console.log(start);
            }
        })


        //定义动画函数
        function animation(goal){
                
                //动画初始位置为下划线距离左侧位置
               initial = blueLine.offsetLeft;
                // 定时器，实现缓动动画，慢慢滑动的效果
                time = setInterval(function(){
                   // 每次自增(goal-initial)/10，我为10，越小滑动越快
                    initial += (goal-initial);
                   // 给下划线添加left定位
                   
                   blueLine.style.left = initial +'px';        
                    // 如果滑到目标值，清除定时器
                    if(blueLine.offsetLeft==goal){
                       clearInterval(time);
                    }    
               },1)
        }

       
        









})