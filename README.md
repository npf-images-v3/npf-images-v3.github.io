# NPF images fix for Tumblr

###### WRITTEN BY @GLENTHEMES [2021]

#### What is NPF?
> NPF stands for "Neue Post Format". Tumblr used to have multiple types of post formats to choose from (namingly text, photo, quote, link, chat, video, questions), but in recent years they've started to turn many of those formats into NPF only (in other words, **everything becomes a text post**). This means that all images uploaded via Tumblr mobile have turned into **NPF images**. NPF images can also refer to images between paragraphs.
> 
> Whilst non-NPF posts can still be made via the desktop site, many users have preferred to blog via mobile instead. Little to no official documentation has been provided on how NPF works, and so far the default NPF stylesheet only really works for the default theme Optica. Hence, I wrote some modifications to make it look as 'natural' as possible, regardless of whatever theme you're using.
> 
> TLDR; all mobile posts are rendered as **text posts**, even if you're just posting a photo or a video. The only Tumblr block variable we know so far hasn't even changed - it's just `{Body}`. So if you're e.g. an artist, chances are that the picture you post won't be HD, and it will look out of place without further styling (which would be extremely helpful if we had - y'know - documentation).

---

#### Features:
- [x] turns images HD if available
- [x] prevents images from overflowing (stretching sideways)
- [x] stops images from being squashed (default height is apparently 75%. WHO thought this was a good idea?!)
- [x] custom spacing between images
- [x] custom spacing between images and captions
- [x] lightbox support (currently only works with mouse clicks, not arrow keys)
- [x] repositions main image to top of post if they were meant to look like photo posts (e.g. for artists)
- [x] removes the blockquote border on the main image

---

#### How to install:
1.  In your theme's HTML, use the searchbar and look up `{block:Posts`   
    Replace that line with `{block:posts inlineMediaWidth="1280" inlineNestedMediaWidth="1280"}`
2.  Check if your theme already has jQuery installed.  
    Use the searchbar to look up `jquery`, or `ajax.googleapis.com/ajax/libs/jquery`  
    If it exists, great. If you can't find it, paste this under `<head>`:  
    `<script src="//cdn.jsdelivr.net/npm/jquery@latest/dist/jquery.min.js"></script>`
3.  Paste the following **after** the jQuery line:  
    ```html
    <script src="//npf-images-v3.github.io/script.js"></script>
    <link rel="stylesheet" href="//npf-images-v3.github.io/recon.css">
    <style tmblr-npf>
    :root {
        --NPF-Caption-Spacing:1em;
        --NPF-Image-Spacing:4px;
    }
    </style>
    ```
    **Note:** if you're using [unnested captions](https://codepen.io/neothm/pen/PzVjRy) by neothm & magnusthemes, please make sure that my scripts are AFTER the unnest script! (Also, do not change the names of `.tumblr_parent` and .`tumblr_avatar`!)
    
---
    
#### Potential Problems:
If you're using the old dashboard captions, everything *should* run as intended.  
  
However if you're using modern dashboard captions, depending on your theme, the html structure of the user icon & blog link may vary, and so the main photo could still be stuck under it. If you're fine with this, cool! But if you're picky like me, you can manually assign to trigger the rearranging.
*   Add classes `tumblr_avatar` and `tumblr_blog` accordingly:  
    (**must** be done within `{block:Text}`).  
    **Example 1:**
    ```html
    {block:Text}
    ...
    {block:RebloggedFrom}
    {block:Reblogs}
    
    <img src="{PortraitURL-64}" class="tumblr_avatar">
    <a class="tumblr_blog" href="{Permalink}">{Username}</a>
    
    {/block:Reblogs}
    {/block:RebloggedFrom}
    {/block:Text}
    ```
    
    **Example 2:**
    ```html
    {block:Text}
    ...
    {block:RebloggedFrom}
    {block:Reblogs}
    
    <div class="avatar-container tumblr_avatar">
        <img src="{PortraitURL-64}">
    </div>

    <div class="username-container tumblr_blog">
        <a href="{Permalink}">{Username}</a>
    </div>
    
    {/block:Reblogs}
    {/block:RebloggedFrom}
    {/block:Text}
    ```
*   If the `avatar` and `username` are already wrapped nicely in a `div` but somehow it wasn't detected, add `source-head` class to the wrapper!  
    In this scenario, you don't need to worry about assigning `tumblr_avatar` and `tumblr_blog`. 💗
    ```html
    {block:Text}
    ...
    {block:RebloggedFrom}
    {block:Reblogs}
    
    <div class="some-wrapper source-head">
        <img src="{PortraitURL-64}">
        <a href="{Permalink}">{Username}</a>
    </div>
    
    {/block:Reblogs}
    {/block:RebloggedFrom}
    {/block:Text}
    ```
---
#### Further Support
💌 I hope that was clear! I tried my best to do a one-size-fits-all mod that's easy to install for those unfamiliar with code, but ultimately it isn't perfect. If you run into any issues, or are confused, please contact me either in the **`#theme-help`** channel of my [Discord server](https://discord.gg/RcMKnwz), or send me a DM! I generally reply within 12 hours. To make it faster for both of us, you should:
* send a link to your blog
* clarify what theme you are using, and by whom
* copy your full theme code into [ghostbin.com](https://ghostbin.com) - no title or password required - hit save, then send me the link!
