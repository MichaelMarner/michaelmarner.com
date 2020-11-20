---
title: This is a Gatsby Stan Page Now
date: 2020-11-20T17:17:55+10:30
authors:
  - Michael Marner
summary: I ditch wordpress
featured_image: west-theb.jpg
type: post
categories:
  - Thoughts
tags:
  - Gatsby
  - Hugo
  - Wordpress
---

Welcome to my new website... That looks exactly like the old one. Over the last few weekends I've rebuilt this website from Wordpress into a static site built with Gatsby.

## Why?

I've wanted to migrate off Wordpress for a while. Some reasons:

- I have less patience for managing servers in my spare time than I used to.
- I'm paying for a VM that I don't really need. It could be just a couple of cents/month for CloudFront, or host on Netlify for free.
- I really don't want to do this sysadmin work in my spare time

Doing a half-assed job of running a server is a security risk. It's also costing me money unnecessarily.

Now, don't get me wrong - I really like Wordpress. It's my recommendation for anybody who wants to build a website and have a nice admin panel and editor. But more than most people, I'm happy writing in Markdown (I wrote my PhD thesis in LaTeX), and I'm happy working with Git.

A static site just makes sense.

## Why Gatsby?

I had been messing with [Hugo](https://gohugo.io). I liked that builds were super fast. However, it didn't click:

- Extending Hugo through plugins isn't really a thing
- Image processing in Hugo is fairly basic (I really just wanted to do BlurHash)
- I couldn't get into Hugo's templating system

I gave Gatsby a go and have found it really enjoyable to work with. Gatsby is more flexible, meaning in theory I had to do more to get a basic blog, but in reality, that work went really fast. In a few nights I've totally rebuilt the Wordpress theme, have really great image processing, migrated all the articles from Wordpress.

Maybe it's because I'm fairly familiar with the Node ecosystem and Typescript, but I just found Gatsby so much easier to work with.

## No Comment

The one thing that hasn't been transferred over are comments, because all the commenting solutions for static sites suck. That doesn't mean I don't want to talk to you though - please talk to me on [Twitter](https://twitter.com/MichaelMarner) or send me an [email](mailto:marner@hey.com).

But the commenting solutions for static sites suck.

- The open source ones generally require a server. The main reason for me converting to a static site was so I didn't have to run a server. Maybe someone will come up with a really great serverless solution.
- The paid hosted options are expensive for a personal site like this
- The free hosted options are gross - ugly, ad-filled, privacy invading

So comments are gone. But most of the comments on Wordpress were out of date anyway. So going forward, discussions can happen elsewhere.

## Thank you for reading my webzone

I'm going to try and post more about Flutter and other programming stuff, to justify the effort I've just gone to.

Oh, and it's [Open Source](https://github.com/MichaelMarner/michaelmarner.com) now, by the way.
