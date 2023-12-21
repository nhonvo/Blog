---
layout:     post
title:      "Hello world"
subtitle:   "First blog"
date:       2023-12-22 12:00:00
author:     "Truong Nhon"
hidden: true
header-img: "img/post-bg-apple-event-2015.jpg"
multilingual: true
lang: en
tags:
    - C#
    - .Net
---

<!-- Chinese Version -->
<div class="zh post-container">
    {% capture about_zh %}{% include posts/2023-12-22-hello-world/zh.md %}{% endcapture %}
    {{ about_zh | markdownify }}
</div>

<!-- VietNamese Version -->
<div class="vi post-container">
    {% capture about_vi %}{% include posts/2023-12-22-hello-world/vi.md %}{% endcapture %}
    {{ about_vi | markdownify }}
</div>

<!-- English Version -->
<div class="en post-container">
    {% capture about_en %}{% include posts/2023-12-22-hello-world/en.md %}{% endcapture %}
    {{ about_en | markdownify }}
</div>
