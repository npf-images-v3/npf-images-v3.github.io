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
        $(this).addClass("photo-origin capt-old");
    });
    
    $(".capt-old").each(function(){
        // target default generated source blog name/url
        var jus = $(this).parent("blockquote").prev("p");
        
        if(jus.find("a.tumblr_blog")){
            jus.addClass("utilisateur");
            
            if($(this).next().length){
                // if it's the only npf of that post, relocate
                if(!$(this).nextAll(".npf_inst").length){
                    $(this).insertBefore($(this).parents("[post-type]").find(".utilisateur"))
                }
            } else {
                jus.attr("contents",jus.text());
                jus.attr("perma",jus.find("a.tumblr_blog").attr("href"));
                
                // remove ":" after username if there is one
                if(jus.attr("contents").slice(-1) == ":"){
                    jus.attr("contents",jus.text().substring(0,jus.text().lastIndexOf(":")))
                }
                
                // remove blockquote
                $(this).unwrap();
                
                // append source blog after the image
                $(this).after("<p class='post-source'>(Source: <a href='" + jus.attr("perma") + "'>" + jus.attr("contents") + "</a>)</p>");
                jus.remove();
            }
        }
    })
    
    /*-----------------------------------------------*/
    
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
    
    // check if unnested captions
    $("[empty-p]").each(function(){
        if($(this).prev(".tumblr_parent").length){
            if($(this).prev().find("img") && $(this).prev().find("a")){
                $(this).prev(".tumblr_parent").addClass("source-head")
            }
        }
    })
    
    $(".tumblr_avatar + .tumblr_blog").each(function(){
        $(this).add($(this).prev()).wrapAll("<div class='source-head'>")
    })
    
    $(".source-head + .npf_inst").each(function(){
        $(this).addClass("photo-origin")
    })
    
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
        if($(this).next().length){
            $(this).insertBefore($(this).parents("[post-type]").find(".source-head"));
            $(this).css("margin-bottom","var(--NPF-Caption-Spacing)")
        }
    })
    
    /*-----------------------------------------------*/
    
    // wrap single npf images in <a>
    $(".tmblr-full[data-orig-height]").each(function(){
        if(!$(this).find("a.post_media_photo_anchor").length){
            var imgurl = $(this).find("img").attr("src");
            $(this).find("img").wrap("<a class='post_media_photo_anchor' data-big-photo='" + imgurl + "' data-big-photo-height='" + $(this).attr("data-orig-height") + "' data-big-photo-width='" + $(this).attr("data-orig-width") + "'></a>");
            $(this).find("img").addClass("post_media_photo t-solo image");
            $(this).find("img").removeAttr("data-orig-height data-orig-width width height")
        }
        
    })
    
    // initiate lightbox on images that didn't originally
    // come with photo anchor
    $(".t-solo").click(function(){	
        var imgsrc = $(this).attr("src");
        
        Tumblr.Lightbox.init([{
            low_res:imgsrc,
            high_res:imgsrc
        }]);
    });
    
    // make npf images HD
    $(".post_media_photo_anchor").each(function(){
        $(this).find("img").attr("src",$(this).attr("data-big-photo"))
    })
    
    // assign unique ID to each NPF photoset
    $(".npf_inst").each(function(){
        $(this).attr("npf-id","npf_" + Math.random().toString(36).substr(2, 5))
    });
    
    // initialize number of images in each NPF photoset,
    // and create an numerically labelled list
    $(".npf_inst").each(function(){
        $(this).find(".tmblr-full").each(function(i){
            i = i + 1;
            $(this).attr("list-order",i);
        });
        
        $(this).find(".tmblr-full img").each(function(w){
            w = w + 1;
            $(this).parents(".npf_inst").attr("image" + w,$(this).attr("src"))
        });
    })
    
    // initialize lightbox + clickthrough
    $(".tmblr-full img").click(function(){
        var npfID = $(this).parents("[npf-id]").attr("npf-id");
        var npford = $(this).parents(".tmblr-full").attr("list-order");
        var npfmax = $(this).parents(".npf_inst")
                     .find(".tmblr-full").length;
        
        $(document).on("click", ".lightbox-image", function(){
            $(this).attr("npf-id",npfID).attr("order",npford);
            
            $(".npf_inst").each(function(){
                if($(this).attr("npf-id") == $(".lightbox-image").attr("npf-id")){
                    
                    npford = Number(npford)+1;
                    
                    if($(this).is("[image" + npford + "]")){
                        var getnext = $(this).attr("image" + npford);
                        $(".lightbox-image").attr("src",getnext);
                        
                        $(".lightbox-image").addClass("lb-img");
                        $(".lightbox-image-container").addClass("lb-cont");
                    } else {
                        if($(".lightbox-image").attr("order") > npfmax){
                            $(".lightbox-image").removeAttr("order");
                        }
                    }
                }
            })
        })
    })

})//end ready
