Skip to content
This repository
Search
Pull requests
Issues
Gist
 @zhanglibing
 Watch 1
  Star 0
  Fork 0 oneonetwo/snake
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Pulse  Graphs
Branch: master Find file Copy pathsnake/snake.js
73d23de  on 13 Jul
@oneonetwo oneonetwo chshi
1 contributor
RawBlameHistory     
245 lines (208 sloc)  7.26 KB
$(function(){


    function  st(){
   // 星星的闪跟转  
   var star=['shan','zhuan']
   // var width=parseInt($('.star').width());
   // var height=parseInt($('.star').height());
   for(var i=0;i<200;i++){
   	$('<div>').addClass(function(){
   		return star[Math.floor(Math.random()*2)]
   	}()).css({left:Math.floor(Math.random()*1200),top:Math.floor(Math.random()*400),animationDelay:Math.floor(Math.random()*40)+'s'}).appendTo('.star')
   }}
   st();

    // she  
   for(var i=0;i<20;i++){
      for(var j=0;j<20;j++){
        $('<div>').addClass('square').attr('id',i+'_'+j).appendTo('.bgbox')
      }}

       var score=-1;
       var time=0;

       // 初始化蛇
       var shebiao={
        '0_0':true,
        '0_1':true,
        '0_2':true
       }
      var she=[
        {x:0,y:0},
        {x:0,y:1},
        {x:0,y:2}
        ];
        var zhaodian=function(dian){
          return $('#'+dian.x+'_'+dian.y);
        }

        var init=function(){
          for(var m=0;m<she.length;m++){
            zhaodian(she[m]).addClass('tou')
          }
        }
        init();
          // 放食物
          var setfood=food();
          function food(){
            //不能放在蛇身上
          do{var a=Math.floor(Math.random()*20);
          var b=Math.floor(Math.random()*20);
            }while(shebiao[a+'_'+b]);
          
          $('#'+a+'_'+b).addClass('food');
           score+=1;
           $('.ball_1 .ball').find('span').html('得分:'+score)
          return {x:a,y:b}     
          }
        //判断方向
        var fangxiang="right";
        $(document).on('keydown',function(e){
          e.preventDefault();
          var biao={
            'left':37,
            'right':39,
            'up':38,
            'down':40
          }
          if(Math.abs(e.keyCode-biao[fangxiang])==2){
            return;
          }
          if(e.keyCode==37){
             fangxiang = "left";       
          }else if(e.keyCode==38){
             fangxiang = 'up';
          }else if(e.keyCode==39){
             fangxiang = 'right';
          }else if(e.keyCode==40){
             fangxiang = 'down';
          }
        })





        //移动函数

    var  move=function(){
      var jiutou=she[she.length-1];
      if(fangxiang=='right'){
      var xintou={x:jiutou.x,y:jiutou.y+1}; 
       var yidong=$('#'+(parseInt(xintou.x)+1)+'_'+(parseInt(xintou.y)))
      var yidong2=$('#'+(parseInt(xintou.x)-1)+'_'+(parseInt(xintou.y)))
         yidong.animate({top:10}).delay(50).animate({top:0})
         yidong2.animate({top:-10}).delay(50).animate({top:0})
       }else if(fangxiang=='down'){
      var xintou={x:jiutou.x+1,y:jiutou.y};
      var yidong=$('#'+xintou.x+'_'+(parseInt(xintou.y)+1))
      var yidong2=$('#'+xintou.x+'_'+(parseInt(xintou.y)-1))
      // 移动两边的
       yidong.animate({left:10}).delay(50).animate({left:0})
         yidong2.animate({left:-10}).delay(50).animate({left:0})    
       }else if(fangxiang=='up'){
      var xintou={x:jiutou.x-1,y:jiutou.y};
       var yidong=$('#'+xintou.x+'_'+(parseInt(xintou.y)+1))
      var yidong2=$('#'+xintou.x+'_'+(parseInt(xintou.y)-1))
      // 移动两边的
       yidong.animate({left:10}).delay(50).animate({left:0})
         yidong2.animate({left:-10}).delay(50).animate({left:0})      
       }else if(fangxiang=='left'){
      var xintou={x:jiutou.x,y:jiutou.y-1}; 
      var yidong=$('#'+(parseInt(xintou.x)+1)+'_'+(parseInt(xintou.y)))
      var yidong2=$('#'+(parseInt(xintou.x)-1)+'_'+(parseInt(xintou.y)))
        yidong.animate({top:10}).delay(50).animate({top:0})
         yidong2.animate({top:-10}).delay(50).animate({top:0})   
       }
       
       // function qq(){
       // if($('[class*=tran]')){
       // $($('[class*=tran]:not(.tou)')).removeClass('tranX tranY tran-Y tran-X');
       //  }}
       //  setTimeout(qq,1000)
       time+=100; 
       $('.ball_2 .ball').find('span').html('时常:'+Math.floor(time/1000))
        //能不能撞到自己
        if(shebiao[xintou.x+'_'+xintou.y]){
          $('<div>').addClass('topmen').html('当前得分:'+score).appendTo('.bgbox')
         $('<div>').addClass('botmen').html('加油，再接再厉').appendTo('.bgbox')
         $('.topmen').animate({top:0},400)         
         $('.botmen').animate({bottom:0},400)
         paused();          
           return;
       }     
       she.push(xintou);
       shebiao[xintou.x+'_'+xintou.y]=true; //添加开关
       zhaodian(xintou).addClass('tou'); 
      if((xintou.x==setfood.x)&&(xintou.y==setfood.y)){
        zhaodian(xintou).removeClass('food')
       setfood=food();           
       }else{
        var yiba=she.shift(); 
        delete shebiao[yiba.x+'_'+yiba.y]  //删除尾巴 的开关
       zhaodian(yiba).removeClass('tou');
      }  
       if(xintou.x>19||xintou.y>19||xintou.x<0||xintou.y<0){
           $('<div>').addClass('topmen').html('当前得分:'+score).appendTo('.bgbox')
         $('<div>').addClass('botmen').html('加油，再接再厉').appendTo('.bgbox')
         $('.topmen').animate({top:0},500)         
         $('.botmen').animate({bottom:0},500)
           paused();
           return;
       }   

    }  




   // 开始
   var timerid;
   var  start=function(){
    clearInterval(timerid)
    timerid=setInterval(move,100);
   }
   var paused=function(){
    clearInterval(timerid);
   }
   
    var addqiu=function(){
       $('<div>').addClass('go').appendTo('.bgbox')
       $('<div>').addClass('one').appendTo('.bgbox')
       $('<div>').addClass('two').appendTo('.bgbox')
    }
    var yiqiu=function(){
      $('.go').remove();
      $('.one').remove();
      $('.two').remove();
    } 

  
     

   
    // 点击开始按钮
    $('.starbox .sun').on('click',function(){
       $('.lmen').css({'transform':'translateX(-210px)'})
       $('.rmen').css({'transform':'translateX(210px)'})
       addqiu();
       setTimeout(start,4000)
       $(this).addClass('zanting')
       setTimeout(yiqiu,5000)
        $(this).css({'display':'none'})

       //点击暂停
        $('.ball_3 .ball').on('click',function(e){
          e.stopPropagation();
        if($(this).find('span').html()=="暂停"){
         paused();
         $(this).find('span').html('开始');
        $('.base,.ball_base,.ball').css({'animationPlayState':'paused'})      
         $('.ball_base').off('mouseout')
         return;         
      }
      if($(this).find('span').html()=="开始"){
          start();
          $(this).find('span').html('暂停');
          $('.base,.ball_base,.ball').css({'animationPlayState':'running'})
            $('.ball_base').on('mouseout',function(){
            $('.base,.ball_base,.ball').css({'animationPlayState':'running'})

    })      
          return;
      }
     }) 
    })
    $(document).on('keyup',function(e){
      e.preventDefault();
      if(!$('.botmen').html()){
         if(e.keyCode==32){
      $('.ball_3 .ball').trigger('click')
     }}      
    })


        //重新开始游戏
     $('.ball_4 .ball').on('mousedown',function(){
      $('.base,.ball_base,.ball').css({'animationPlayState':'paused'})
      location.reload();
     })


    $('.ball_base').on('mouseover',function(){
      $('.base,.ball_base,.ball').css({'animationPlayState':'paused'})

    })
    $('.ball_base').on('mouseout',function(){
      $('.base,.ball_base,.ball').css({'animationPlayState':'running'})

    })



    
})
Contact GitHub API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Status Help