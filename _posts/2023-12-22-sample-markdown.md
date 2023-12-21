---
layout:     post
title:      "Sample Markdown"
subtitle:   "Markdown syntax and sample"
date:       2023-12-22 12:00:00
author:     "Truong Nhon"
# hidden: true
# header-img: "img/post-bg-apple-event-2015.jpg"
# header-style: text
# header-img-credit: "@WebdesignerDepot"
# header-img-credit-href: "medium.com/@WebdesignerDepot/poll-should-css-become-more-like-a-programming-language-c74eb26a4270"
# published: false
# header-mask: 0.4
multilingual: true
catalog:      true
lang: vi
tags:
    - markdown
---

<!-- VietNamese Version -->
<div class="vi post-container">
    {% capture about_vi %}{% include posts/2023-12-22-sample-markdown/vi.md %}{% endcapture %}
    {{ about_vi | markdownify }}
</div>

<!-- English Version -->
<div class="en post-container">
    {% capture about_en %}{% include posts/2023-12-22-sample-markdown/en.md %}{% endcapture %}
    {{ about_en | markdownify }}
</div>
