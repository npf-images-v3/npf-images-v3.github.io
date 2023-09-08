# NPF images fix for Tumblr

###### WRITTEN BY @GLENTHEMES [2021] — last updated: 2023/09/08 10:08AM GMT-7

#### Table of Contents:
- [What is NPF?](#what-is-npf)
- [Features](#features)
- [Limitations](#limitations)
- [How to install](#how-to-install)
- [Potential problems](#potential-problems)
- [Further support](#further-support)

---

#### What is NPF?
> NPF stands for "Neue Post Format". Tumblr used to have multiple types of post formats to choose from (namingly text, photo, quote, link, chat, video, questions), but in recent years they've started to turn many of those formats into NPF only (in other words, **everything becomes a text post**). This means that all images uploaded via Tumblr mobile have turned into **NPF images**. NPF images can also refer to images between paragraphs.
> 
> Whilst non-NPF posts can still be made via the desktop site, many users have preferred to blog via mobile instead. Little to no official documentation has been provided on how NPF works, and so far the default NPF stylesheet only really works for the default theme Optica. Hence, I wrote some modifications to make it look as 'natural' as possible, regardless of whatever theme you're using.
> 
> TLDR; all mobile posts are rendered as **text posts**, even if you're just posting a photo or a video. The only Tumblr block variable we know so far hasn't changed - it's just `{Body}`. So if you're e.g. an artist, chances are that the picture you post won't be HD, and it will look out of place without further tinkering.

---

#### Features:
- [x] turns images HD if available
- [x] prevents images from overflowing (stretching sideways)
- [x] stops images from being squashed (default height is apparently 75%. WHO thought this was a good idea?!)
- [x] custom spacing between images
- [x] custom spacing between images and captions
- [x] ![new___by_kittyrocker_d92ktsr](https://user-images.githubusercontent.com/88550643/233545907-ff557354-f080-4040-adf0-f3ffe7fce86c.gif) lightbox support &mdash; now functions like traditional photoset lightboxes!

- [x] repositions main image to top of post if they were meant to look like photo posts (e.g. for artists)
- [x] removes the blockquote border on the main image

---

#### Limitations:
- Relies on jQuery (usually works with any version except for `1.9.1`)
- Does ***not*** work with [infinite scroll](https://infiniteajaxscroll.com/infinite-scroll-faq).
  If your theme uses infinite scroll, **please turn it off**.

---

#### How to install:
1.  In your theme's HTML, use the searchbar and look up `{block:Posts`   
    Replace that line with `{block:posts inlineMediaWidth="1280" inlineNestedMediaWidth="1280"}`

2.  On the next line or so, you should find something like `<div class="posts">`  
    If there are multiple lines with a similar name, go for the one with `{PostID}` if it has one!  
    Before the closing bracket `>`, add `post-type="{PostType}"`  

3.  Check if your theme already has jQuery installed.  
    Use the searchbar to look up `jquery`, or `ajax.googleapis.com/ajax/libs/jquery`  
    If it exists, great. If you can't find it, paste this under `<head>`:  
    `<script src="//cdn.jsdelivr.net/npm/jquery@latest/dist/jquery.min.js"></script>`

4.  Paste the following **after** the jQuery line:  
    ```html
    <link rel="stylesheet" media="screen" href="//assets.tumblr.com/client/prod/standalone/blog-network-npf/index.build.css">
    
    <!--
            NPF images fix v3.0 by @glenthemes [2021]
            💌 git.io/JRBt7
    --->
    <script src="//npf-images-v3.github.io/script.js"></script>
    <link rel="stylesheet" href="//npf-images-v3.github.io/recon.css">
    <style tmblr-npf>
    :root {
        --NPF-Caption-Spacing:1em;
        --NPF-Image-Spacing:4px;
    }
    </style>
    ```
    **Note:** if you're using [unnested captions](https://codepen.io/neothm/pen/PzVjRy) by neothm & magnusthemes, please make sure that my scripts are AFTER the unnest script! (Also, do not change the name of `.tumblr_parent`!)
    
---
    
#### Potential Problems:
If you're using the old dashboard captions (these typically have a thin left border), everything *should* run as intended.  
  
However if you're using modern dashboard captions (user avatar + username), depending on your theme, the html structure of the user icon & blog link may vary, and so the main photo could still be stuck under it. If you're fine with this, cool! But if you're picky like me, you can manually assign to trigger the rearranging.  

Within `{block:Text}`, you should find an element for the reblogger image, as well as the name of that user. Add `source-head` class to the wrapper!  
Make sure `{Body}` is *not* included inside `source-head`.

*   **Example 1:**
    ```html
    {block:Text}
    ...
    {block:RebloggedFrom}
    {block:Reblogs}
    
    <div class="some-wrapper source-head">
        <img src="{PortraitURL-64}">
        <a href="{Permalink}">{Username}</a>
    </div>

    {Body}
    
    {/block:Reblogs}
    {/block:RebloggedFrom}
    {/block:Text}
    ```
*   **Example 2 – more complex structure:**
    ```html
    {block:Text}
    ...
    {block:RebloggedFrom}
    {block:Reblogs}
    
    <div class="some-wrapper source-head">
        <div class="avatar-image-container">
            <img src="{PortraitURL-64}">
        </div>
        
        <span class="reblogger-username">
            <a href="{Permalink}">{Username}</a>
        </span>
    </div>

    {Body}
    
    {/block:Reblogs}
    {/block:RebloggedFrom}
    {/block:Text}
    ```
---
#### Further Support
💌 I hope that was clear! I tried my best to do a one-size-fits-all mod that's easy to install for those unfamiliar with code, but ultimately it isn't perfect. If you run into any issues, or are confused, please contact me either in the **`#theme-help`** channel of my [Discord server](https://discord.gg/RcMKnwz), or send me a Discord DM! I generally reply within 12 hours. To make it faster for both of us, you should:
* send a link to your blog
* clarify what theme you are using, and by whom
* copy your full theme code into [ghostbin](https://paste.bingner.com/) or [pastery](https://pastery.net) - no title or password required - hit save, then send me the link!

---

If you made it this far, thank you!  
Please consider reblogging [the post](https://glenthemes.tumblr.com/post/659034084446748672/npf-images-v3), or [send me a donation](https://ko-fi.com/glenthemes)! It helps me out a lot.  

🌟 HT ⋆ glenthemes
