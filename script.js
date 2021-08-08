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
    $("[post-type='text']").each(function(){
        $(this).find("p").eq(0).each(function(){
            if($(this).next().is(".npf_inst")){
                if($.trim($(this).text()) == ""){
                    $(this).next().addClass("photo-origin");
                    $(this).attr("empty-p","");
                }
            }
        })
    });
    
    $(".photo-origin").each(function(){
        // target source blog link
        $(this).parents("[post-type='text']")
        .find("a[href*='tumblr.com/post']")
        .eq(0).each(function(){
            $(this).addClass("source-blog");
            
            if(!$(this).parent().is("[post-type]")){
                if(!$(this).siblings().length){
                    $(this).parent().addClass("source-blog");
                    $(this).removeClass("source-blog");
                }
            }
        })
        
        $(".source-blog").each(function(){
            if($(this).prev().length){
                // identify source blog avatar
                if($(this).prev().is("img[src*='tumblr.com']")){
                    $(this).prev().addClass("source-portrait");
                }
                
                if($(this).prev().find("img[src*='tumblr.com']")){
                    $(this).prev().addClass("source-portrait");
                }
                
                if(!$(this).prev().prev().length){
                    $(this).prev().addClass("source-portrait")
                }
                
                // add or wrap ".source-head" class
                if($(this).prev().is(".source-portrait")){
                    if(!$(this).closest("[post-type]").length < 1){
                        if(!$(this).next().length){
                            $(this).parent().addClass("source-head")
                        }
                    }
                    
                    if($(this).next().length){
                        $(this).add($(this).prev()).wrapAll("<div class='source-head'>")
                    }
                }
            }
        })
        
        // if post has a caption, relocate
        if($(this).prev().is("[empty-p]")){
            if($(this).next().length){
                $(this).insertBefore($(this).parents("[post-type]").find(".source-head"));
                $(this).css("margin-bottom","var(--NPF-Caption-Spacing)")
            }
        }
    })

})//end ready
