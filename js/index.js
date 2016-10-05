$(function(){
	$('.go').addClass('active')
	$('.go').on('click',function(){
		$('.go').removeClass('active')
		$('.door-left').addClass('active')
		$('.door-right').addClass('active')
	})
	for (var i = 0; i <20; i++) {
		for (var j = 0; j <20; j++) {
		$('<div>').attr('id',i+'_'+j).addClass('block').appendTo('.scence')
		};
		
	};
 var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}]
	function finddiv(x,y){
		return $('#'+x+'_'+y)
	}
     $.each(she,function(i,v){
		finddiv(v.x,v.y).addClass('she')
	    })
     var shebiao={}
    function fangshiwu(){
    	do{
    		var x=Math.floor(Math.random()*19)
    	    var y=Math.floor(Math.random()*19)
    	  }while(shebiao[x+'_'+y]){
    	  	finddiv(x,y).addClass('food')
    	  	return {x:x,y:y}
    	  }
     
    }
    var index=0;
    var shiwu=fangshiwu()
	function move(){
		var jiutou=she[she.length-1]
		if(direction==="you"){
		var xintou={x:jiutou.x,y:jiutou.y+1}	
		}
		if(direction==="zuo"){
		var xintou={x:jiutou.x,y:jiutou.y-1}	
		}
		if(direction==="shang"){
		var xintou={x:jiutou.x-1,y:jiutou.y}	
		}
		if(direction==="xia"){
		var xintou={x:jiutou.x+1,y:jiutou.y}	
		}
		if(shebiao[xintou.x+'_'+xintou.y]){
			clearInterval(t);
			$('.game-over').addClass('active')
			return
		}
		if(xintou.x<0||xintou.x>19||xintou.y<0||xintou.y>19){
			clearInterval(t)
			$('.game-over').addClass('active')
			return
		}
		she.push(xintou)
		shebiao[xintou.x+'_'+xintou.y]=true
	    finddiv(xintou.x,xintou.y).addClass('she')
	    if(xintou.x===shiwu.x&&xintou.y===shiwu.y){
	    	finddiv(shiwu.x,shiwu.y).removeClass('food')
	    	shiwu=fangshiwu()
			index++;
			$('.score span').text(index)
	    }else{
	    	var weiba=she.shift();
	    	delete shebiao[weiba.x+'_'+weiba.y]
	    	finddiv(weiba.x,weiba.y).removeClass('she')
	    }
	}
		var direction="you"
	$(document).on('keyup',function(e){
     var fanbiao={'zuo':37,'you':39,'shang':38,'xia':40}
     var biao={37:'zuo',39:'you',38:'shang',40:'xia'}

     if(Math.abs(e.keyCode-fanbiao[direction])==2){
     	return
     }else{
     	direction=biao[e.keyCode]

     }
	})
    var audio=$('audio').get(0);
	$(document).on('mousedown',false)
	$('.start').on('click',function(){
        t=setInterval(move,200)
        $('.game-over').removeClass('active')
        audio.play();
	})
	$(".stop").on("click",function(){
		clearInterval(t);
        audio.pause();
	})
	$(".again").on("click",function(){
		location.reload();
	})
})

