---
title: FTGL on OSX
author: Michael Marner
type: post
date: 2015-09-16T01:24:09+00:00
excerpt: How to make FTGL work on OSX once more, and get text rendering back into your OpenGL applications.
slug: /programming/ftgl-on-osx/
featured_image: ../wp-content/uploads/2015/09/graf.jpg
categories:
  - Programming
tags:
  - ftgl
  - osx
  - Programming
---

**tl;dr;** I&#8217;ve made a <a href="https://github.com/MichaelMarner/FTGL-OSXFix" target="_blank">GitHub repo</a> that makes FTGL work on OSX again.

<a href="http://ftgl.sourceforge.net/docs/html/index.html" target="_blank">FTGL</a> is a library that makes it super convenient to render TrueType text in OpenGL applications. You can render text as textures and geometry, making it very flexible. There&#8217;s just one problem: if you&#8217;re using MacPorts or Homebrew on OSX, FTGL doesn&#8217;t work! Here&#8217;s how to work around it.

FTGL makes use of <a href="http://www.freetype.org/" target="_blank">FreeType</a> to actually render text. In newish versions of FreeType, some of their source files have been moved around and renamed. This is a problem on OSX since, by default, we are on a case-insensitive filesystem. We now have a name clash where both FTGL and FreeType seem to have a file named `ftglyph.h`. All of a sudden software that uses FTGL will <a href="http://sourceforge.net/p/ftgl/bugs/41/" target="_blank">no longer compile</a> because the wrong files are being included!

The fix for this is fairly straight forward. Since FTGL depends on FreeType, FTGL should be modified to remove the name clash. Unfortunately, FTGL seems to have been abandoned, and has not had any updates since 2013. In the bug report linked above I have provided a patch that renames the file and updates references to it. I&#8217;ve also created a <a href="https://github.com/MichaelMarner/FTGL-OSXFix" target="_blank">GitHub repository</a> with the patch applied.

This problem doesn&#8217;t show up on Linux because on a case sensitive filesystem like Ext4, the FreeType file is `ftglyph.h`, while the FTGL file is named `FTGlyph.h`. No name clash.

So there, uninstall FTGL from MacPorts or Homebrew, clone my GitHub repo, and build/install from source. FTGL will work on OSX once more.

Long term you may want to look at moving away from FTGL in your own software. It is great at what it does, but hasn&#8217;t been updated in a long time. It uses OpenGL display lists internally, so will not work on modern OpenGL specs. But at least you can now use it if you need to.
