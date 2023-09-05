/*---------------------------------------------------------

    NPF images fix v3.0 by @glenthemes [2021]
    💌 git.io/JRBt7
    
    Credits:
    > wrap divs that are next to each other by Nick Craver
      stackoverflow.com/a/3329249/8144506
    > get 'deepest' element script by Balint Bako
      stackoverflow.com/a/18652986/8144506

    Last updated: 2023-06-20
    
---------------------------------------------------------*/

$(document).ready(function(){
    // check jquery version
    var jqver = jQuery.fn.jquery;
    var ver = jqver.replaceAll(".","");
    
    $(".npf_row .tmblr-full:not(:only-child)").each(function(){
        if(!$(this).parent().is(".npf_col")){
            $(this).wrap("<div class='npf_col'>")
        }        
    })
    
    // wrap any stray .tmblr-full in row container
    $(".tmblr-full + .npf_row").each(function(){
        let uw = $(this).prev();
        if(!uw.parent().is(".npf_row")){
            uw.wrap("<div class='npf_row' columns='1'>")
        }
    })
    
    /*-------------------------------------------------*/
    
    $(".npf_col .tmblr-full [data-big-photo-height]").each(function(){
        $(this).parents(".npf_col").attr("h",$(this).attr("data-big-photo-height"))
    })
    
    $(".npf_col .tmblr-full [data-big-photo-width]").each(function(){
        $(this).parents(".npf_col").attr("w",$(this).attr("data-big-photo-width"))
    })
    
    $(".npf_col .tmblr-full img[data-orig-height]").each(function(){
        $(this).parents(".npf_col").attr("h",$(this).attr("data-orig-height"))
    })
    
    $(".npf_col .tmblr-full img[data-orig-width]").each(function(){
        $(this).parents(".npf_col").attr("w",$(this).attr("data-orig-width"))
    })
    
    /*-------------------------------------------------*/
    
    var spac = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--NPF-Image-Spacing"));
    
    $(".npf_row").each(function(){
        if($(this).find(".npf_col").length){
            // how many columns?
            var cols = $(this).children(".npf_col").length;
            $(this).attr("columns",cols);
            
            cols = Number(cols);
            
            // clarify the width of each column
            var pognt = Math.floor(($(this).width() - (spac * (cols-1))) / cols);
            $(this).children(".npf_col").attr("col-width",pognt)
        }
    })
    
    /*-------------------------------------------------*/
    
    // get the minified width & height values
    $(".npf_col").each(function(){
        var getratio = $(this).attr("w") / $(this).attr("h");
        $(this).attr("ratio",getratio);
        
        var potato = $(this).attr("col-width") / Number(getratio);
        potato = potato.toString();
        potato = potato.substring(0,potato.lastIndexOf("."));
        $(this).attr("col-height",potato);
    })
    
    // get shortest column of that row
    $(".npf_row").each(function(){
        if($(this).find(".npf_col").length){
            var quoi = $(this).children(".npf_col:not([col-height=''])").map(function(){
                return $(this).attr("col-height");
            }).get();
            
            var ngai = Math.min.apply(Math,quoi);
            $(this).find(".tmblr-full").height(ngai);
        }
    });
    
    // remove the attributes bc they ugly
    $(".npf_col").removeAttr("h w ratio")
    
    /*-------------------------------------------------*/
    
    // wrap .npf_rows that are next to each other
    var npf_row = $(".npf_row");
    
    for(var soda=0; soda<npf_row.length;){
        if(ver < "180"){
           soda += npf_row.eq(soda).nextUntil(':not(.npf_row)').andSelf().wrapAll('<div class="npf_inst">').length;
        } else {
           soda += npf_row.eq(soda).nextUntil(':not(.npf_row)').addBack().wrapAll('<div class="npf_inst">').length;
        }
    }
    
    /*-------------------------------------------------*/
    
    // multiple .tmblr-fulls that are next to each other,
    // but are not in a row or container
    // e.g. headers
    $("*:not(.npf_row) > .tmblr-full").each(function(){
        if($(this).siblings(".tmblr-full").length){                
            $(this).not(".tmblr-full + .tmblr-full").each(function(){
                if(ver < "180"){
                    $(this).nextUntil(":not(.tmblr-full").andSelf().wrapAll('<div class="npf_inst">');
                } else {
                    $(this).nextUntil(":not(.tmblr-full").addBack().wrapAll('<div class="npf_inst">');
                }
            });
        }
    })
    
    // redo the .npf_inst wrapping
    $(".npf_inst").each(function(){
        $(this).not(".npf_inst + .npf_inst").each(function(){
            if(ver < "180"){
                $(this).nextUntil(":not(.npf_inst").andSelf().wrapAll('<div class="npf_inst">');
                $(this).nextUntil(":not(.npf_inst").andSelf().children().unwrap();
            } else {
                $(this).nextUntil(":not(.npf_inst").addBack().wrapAll('<div class="npf_inst">');
                $(this).nextUntil(":not(.npf_inst").addBack().children().unwrap();
            }
        });
    })
    
    // wrap single containerless .tmblr-fulls
    $(".tmblr-full").each(function(){
        if(!$(this).parents(".npf_inst").length){
            if(!$(this).parents(".npf_row").length || !$(this).parents(".npf_col").length){
                $(this).wrap("<div class='npf_inst'>")
            }
        }
    })
    
    /*-------------------------------------------------*/
    
    // if: .tumblr_parent exists
    $("[post-type='text']").each(function(){
        $(this).find(".tumblr_parent").eq(0).each(function(){
            $(this).find(".npf_inst").eq(0).each(function(){
                if($.trim($(this).prev("p").text()) == ""){
                    $(this).addClass("photo-origin");
                    
                    // relocate if there's a caption
                    if($(this).next().length){
                        $(this).insertBefore($(this).parents("[post-type='text']").find(".tumblr_parent").eq(0));
                        $(this).css("margin-bottom","var(--NPF-Caption-Spacing)")
                    } else {
                        $(this).addClass("npf-no-caption");
                    }
                }
            })
        });
    })
  
    /*-------------------------------------------------*/
    
    // .source-head do the thing - attempt #2
    // yes there was an attempt #1 but it was too embarrassing
    $("[post-type='text']").each(function(){
        // target first commenter
        var behead = $(this).find(".source-head").parent();
        behead = behead.eq(0);
        
        if(behead.find(".npf_inst").length){
            var nuf = $(this).find(".npf_inst").eq(0);
            if(nuf.prev().length){
                if($.trim(nuf.prev().text()) == ""){
                    if(nuf.next().length){
                        nuf.addClass("photo-origin");
                        nuf.insertBefore(behead.children(".source-head"));
                        nuf.css("margin-bottom","var(--NPF-Caption-Spacing)")
                    } else {
                        nuf.addClass("npf-no-caption")
                    }
                }
                
            }
        }
    })
    
    // catch any stray npfs that were meant to be included in set
    $("[post-type='text']:has(.photo-origin)").each(function(){
        var that = this;
        // was "p + .npf_inst"
        // changed it to "* + p + .npf_inst" bc:
        // images that are NOT next to each other were being grouped
        $(this).find("* + p + .npf_inst").each(function(){
            if($.trim($(this).prev("p").text()) == ""){
                if($(this).next().length){
                    $(this).addClass('recall')
                    $(this).appendTo($(that).find(".photo-origin"))
                }
            }
        })
    })
    
    // if: OLD BLOCKQUOTE CAPTIONS
    $("[post-type='text']").each(function(){
        $(this).find("p").eq(0).each(function(){
            if($(this).find("a.tumblr_blog").length){
                $(this).attr("last-comment","");
            }
        })
        
        var maxDepth = 0;
        $(this).find("blockquote").each(function(){
            $(this).attr('depth', $(this).parents().length);
            if($(this).parents().length > maxDepth){
                maxDepth = $(this).parents().length;
            }
        });
        
        $('[depth="' + maxDepth + '"]').addClass("op-blockquote");
        $("blockquote[depth]").removeAttr("depth")
    });
    
    $(".op-blockquote").each(function(){
        if($(this).prev().is("p")){
            if($(this).prev().find("a.tumblr_blog").length){
                
                var finst = $(this).children().first();
                var poo = $(this).parents("[post-type='text']").find("[last-comment]").eq(0);
                
                if(finst.is(".npf_inst")){
                    if(finst.next().length){
                        finst.addClass("photo-origin");
                        finst.insertBefore(poo);
                        if(finst.next().is("p")){
                            finst.css("margin-bottom","var(--NPF-Caption-Spacing)");
                        }
                        
                        // attempt to fix fked up reblog order
                        if(!$(this).prev().prev().is(".photo-origin")){
                            if(poo.next().is("blockquote")){
                                $(this).add($(this).prev()).prependTo(poo.next("blockquote"))
                            }
                        }
                    } else {
                        // if npf does not have caption text
                        var gp = $(this).prev("p").find("a.tumblr_blog");
                        var gp_name = gp.text();
                        var gp_url = gp.attr("href");
                        finst.addClass("photo-origin");
                        finst.addClass("npf-no-caption");
                        finst.insertBefore(poo);
                        poo.next(".op-blockquote").remove();
                        poo.remove();
                        finst.after("<p class='npf-post-source'>(Source: <a href='" + gp_url + "'>" + gp_name + "</a>)</p>")
                    }
                }
            }
        }
    })
    
    /*-------------------------------------------------*/
    
    // initiate lightbox on images that didn't originally
    // come with photo anchor
    $(".tmblr-full img").click(function(){
        if(!$(this).hasClass("post_media_photo")){
            var imgsrc = $(this).attr("src");
            
            Tumblr.Lightbox.init([{
                low_res:imgsrc,
                high_res:imgsrc
            }]);
        }
    });
    
    // do that thing again if npfs are inside npfs fsfr
    $(".npf_inst .npf_inst").each(function(){
        $(this).children().unwrap();
    })
    
    $(".npf_inst + .npf_inst").each(function(){
        $(this).appendTo($(this).prev());
        $(this).children().unwrap();
    });
    
    $(".npf_inst [list-order]").each(function(){
        $(this).removeAttr("list-order");
    })
    
    /*-------------------------------------------------*/
    
    $("[data-big-photo]").each(function(){
        var gwgw = $(this).attr("data-big-photo");
        var guppy = new Image();
        guppy.src = gwgw;
    })
});// end ready

document.addEventListener("DOMContentLoaded", () => {
  // lightbox functionality
  fetch("https://static.tumblr.com/gtjt4bo/mQyru9n7h/quick_tumblr_lightbox.js")
  .then(response => response.text())
  .then(getContents => {
      let makeScript = document.createElement("script");
      makeScript.textContent = getContents + "\n" + `quick_tumblr_lightbox(".npf_inst")`;
      document.body.appendChild(makeScript)
  });
    
  // target stray NPFs that are supposed to be .photo-origin
  // ideally: old blockquote captions
  let targetStrayNPF = document.querySelectorAll("[post-type='text'] blockquote:not(.op-blockquote) > .npf_inst:first-child");
  targetStrayNPF ? targetStrayNPF.forEach(tsNPF => {
      let elp = tsNPF.parentNode.previousElementSibling;
      if(elp.matches("p[last-comment]")){
          if(elp.querySelector("a.tumblr_blog")){
              if(!elp.previousElementSibling){
                  elp.parentNode.prepend(tsNPF);
                  tsNPF.classList.add("photo-origin")
              }
          }
      }
  }) : ""
})
