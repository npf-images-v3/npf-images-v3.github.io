# NPF images fix for Tumblr

###### WRITTEN BY @GLENTHEMES [2021]

#### What is NPF?
> NPF stands for "Neue Post Format". Whilst Tumblr used to have multiple types of post formats to choose from (namingly text, photo, quote, link, chat, video, questions), in recent years they have started to turn many of those formats into NPF only (in other words, everything becomes a text post). This meant that all images uploaded via Tumblr mobile have turned into **NPF images**. NPF images also refer to inline images between paragraphs.
> 
> Whilst non-NPF posts can still be made via the desktop site, many users have preferred to blog via mobile instead. Little to no official documentation has been provided on how NPF works, and so far the default NPF stylesheet only really works for the default theme Optica. Hence, I wrote some modifications to make it look as 'natural' as possible, regardless of whatever theme you're using.
> 
> Another concern of mine is how poorly NPF images work with old Tumblr captions. Although it's been many years since the dashboard changed to unnested reblogs, many themes out there are still using the old captions with a border blockquote, which can look very unappetizing whe NPF images are involved.
> 
> TLDR; all mobile posts are rendered as **text posts**, even if you're just posting a photo or a video. The only Tumblr block variable we know so far hasn't even changed - it's just `{Body}`. So if you're e.g. an artist, chances are that the picture you post won't be HD, and it will look out of place without further styling (which would be extremely helpful if we had - y'know - documentation).

#### Why should you care?
> If you're an active content creator, artist or resource blogger on Tumblr, this affects how your posts look on your theme. I personally can't stand it when **photo posts** end up looking like [this](https://cdn.discordapp.com/attachments/382037367940448256/873934148459450418/unknown.png) or when the user's avatar and name are located above the actual photo. This fix helps to realign images, so they don't stretch or squash. You can also customize the gap size between images, as well as the spacing between photos and captions.

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
