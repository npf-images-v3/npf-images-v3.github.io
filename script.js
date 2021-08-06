$(document).ready(function(){
    // check jquery version
    var jqver = jQuery.fn.jquery;
    var ver = jqver.replaceAll(".","");
    
    // wrapping script courtesy of Nick Craver, my god and savior
    // stackoverflow.com/a/3329249/8144506
    
    var npf_row = $(".npf_row");
    
    for(var soda=0; soda<npf_row.length;){
        if(ver < "180"){
           soda += npf_row.eq(soda).nextUntil(':not(.npf_row)').andSelf().wrapAll('<div class="npf_inst">').length;
        } else {
           soda += npf_row.eq(soda).nextUntil(':not(.npf_row)').addBack().wrapAll('<div class="npf_inst">').length;
        }
    }
    
    $(".tmblr-full").each(function(){
        if(!$(this).parent().is(".npf_col")){
            if($(this).siblings(".tmblr-full").length){                
                $(this).not(".tmblr-full + .tmblr-full").each(function(){
                    if(ver < "180"){
                        $(this).nextUntil(":not(.tmblr-full").andSelf().wrapAll('<div class="npf_inst">');
                    } else {
                        $(this).nextUntil(":not(.tmblr-full").addBack().wrapAll('<div class="npf_inst">');
                    }
                });
            } else {
                // if .tmblr-full is by itself and is somehow not in a container
                $(this).wrap("<div class='npf_inst'>");
            }
        }
    })
    
    // old captions
    $("[post-type='text'] p:first-child + blockquote > .npf_inst:first-child").each(function(){
        $(this).addClass("photo_origin");
    });
    
    // new captions
    $("[post-type='text'] p:first").each(function(){
            $(this).addClass("see-empty")
    });

})//end ready
