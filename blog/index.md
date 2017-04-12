---
    layout: blog
    title: Blog
---
<section>
    <p class="inActive cContent">There is no post.</p>
    <p class="cContent">Can you solve this?</p>
</section>
<section id="puzzleGame">
    <div id="container">
    </div>
    <div id="stat" class="cContent">
        <a id="btnShowImage" class="btn cSm">Show Image</a>
        <div id="message"></div>
    </div>    
</section>
<script src="{{ site.baseurl }}/assets/js/puzzleGame/app.js"></script>
<script type="text/javascript">puzzle.init()</script>