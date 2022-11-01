$(document).ready(function(){
    let s_slide = $('.slide_main');
    let s_img = $('.slide_main img').width();
    let mslide = $('.mslide').height();
    let s_count = 0;
    let s_no = 0;
    let s_main_total = ($('.slide_main li').length-1);
    let s_nav = $('.slide_bottom li');
    let s_skip = 0;
    let s_count_before = 0;

    $('.slide_main li:last-child').insertBefore('.slide_main li:first-child');
    s_slide.css('margin-left',-s_img);

    var i = 1;
    let k = 0;

    function move_left(){
        k = 0;
        if(s_skip == 0){
            if(s_count == s_main_total){
                s_count = 0;
            }else{
                s_count++;
            }
            s_count_before = (s_count - 1);
        }else{
            s_skip = 0;
        }
        for(var i = 0; (s_count - s_count_before) > i;i++){
            s_no = 1;
            s_slide.animate({'margin-left':-s_img*2},(300 / (s_count - s_count_before)),function(){
                $('.slide_main > li:first-child').insertAfter('.slide_main > li:last-child');
                s_slide.css('margin-left',-s_img);
                k++;
                if(k == s_count - s_count_before){
                    s_no = 0;
                }
            });
        }
        s_nav.removeClass('on');
        s_nav.eq(s_count).addClass('on');
    }

    function move_right(){
        k = 0;
        if(s_skip == 0){
            if(s_count == 0){
                s_count = s_main_total;
            }else{
                s_count++;
            }
            s_count_before = (s_count + 1);
        }else{
            s_skip = 0;
        }
        for(var i = 0; (s_count_before - s_count) > i;i++){
            s_no = 1;
            s_slide.animate({'margin-left':s_img-s_img},(300 / (s_count_before - s_count)),function(){
                $('.slide_main > li:last-child').insertBefore('.slide_main > li:first-child');
                s_slide.css('margin-left',-s_img);
                k++;
                if(k == s_count_before - s_count){
                    s_no = 0;
                }
            });
        }
        s_nav.removeClass('on');
        s_nav.eq(s_count).addClass('on');
    }
    function repos_img(){
        if(s_no == 0){
            s_img = $('.slide_main img').width();
            s_slide.css('margin-left',-s_img);
            mslide = $('.mslide').height();
            $('.mslide_box').css('height', mslide)
        }
    }
    let s_Timer = setInterval(move_left, 3000);
    let s_repos_img = setInterval(repos_img, 10);
    
    $('.slide_bottom li').hover(function(){
        clearInterval(s_Timer);
    },function(){
        clearInterval(s_Timer);
        s_Timer = setInterval(move_left, 3000);
    });
    s_nav.click(function(){
        if(s_no == 0){
            if(s_count > $(this).index()){
                s_count_before = s_count;
                s_count = ($(this).index());
                s_skip = 1;
                s_no = 1;
                move_right();
            }else if(s_count < $(this).index()){
                s_count_before = s_count;
                s_count = ($(this).index());
                s_skip = 1;
                s_no = 1;
                move_left();
            }
        }
    });

    let n = 0;
    $('.gslide .g_btn li').first().addClass('act');

    $('.gslide .gslide_main').css({'left':-(330*n)+330},500);
    $('.gslide .gslide_main .slide').first().addClass('slide_on');
    $('.gslide .fa-angle-left').click(function(){
        moveRight();
    });
    $('.gslide .fa-angle-right').click(function(){
        moveLeft();
    });
    $('.gslide .g_btn li').click(function(){
        n = $(this).index();
        $('.gslide .gslide_main').stop().animate({'left':-(330*n)+330},500);
        $('.gslide .g_btn li').removeClass('act');
        $(this).addClass('act');
        $('.gslide .slide').removeClass('slide_on');
        $('.gslide .slide').eq(n).addClass('slide_on');
    });

    function auto(n){
        $('.gslide .gslide_main').stop().animate({'left':-(330*n)+330},500);
        $('.gslide .g_btn li').removeClass('act');
        $('.gslide .g_btn li').eq(n).addClass('act');
        $('.gslide .slide').removeClass('slide_on');
        $('.gslide .slide').eq(n).addClass('slide_on');
    }
    $('.gslide .g_btn, .gslide i.fa').hover(function(){
        clearInterval(Timer);
    },function(){
        clearInterval(Timer);
        Timer = setInterval(moveLeft, 3000);
    });
    function moveLeft(){
        if(n==6){
        n=0;
        }else{
        n++;
        }
        auto(n);
    }
    function moveRight(){
        if(n==0){
        n=6;
        }else{
        n--;
        }
        auto(n);
    }
    let Timer = setInterval(moveLeft, 3000);

    $('.familysite').hover(function(){
        $('.familysite ul').stop().css('display','block').animate({'opacity':'1'},100);
    },function(){
        $('.familysite ul').stop().animate({'opacity':'0'},100,function(){
            $(this).css('display','none');
        });
    });
});