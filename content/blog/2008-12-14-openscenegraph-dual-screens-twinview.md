---
title: "OpenSceneGraph, Dual Screens & TwinView"
author: Michael Marner
type: post
date: 2008-12-14T06:07:24+00:00
slug: /programming/openscenegraph-dual-screens-twinview/
categories:
  - Programming
tags:
  - c++
  - dual screen
  - Linux
  - opengl
  - openscenegraph
  - Programming
---

So some of my work at uni involves programming using <a title="OpenSceneGraph Website" href="http://www.openscenegraph.org" target="_blank" rel="noopener">OpenSceneGraph</a>. Now, anybody who has used OSG before will know that as powerful as it may be, it is seriously lacking in the documentation department. So, this article describes how to do dual screen graphics on Linux using OpenSceneGraph. First we&#8217;ll look at the X Screens approach, which is easier but probably not the best solution. Then we&#8217;ll look at a method that works with a single X screen.<!--more-->

### Multiple X Screens

The easiest way to do dual screen output is if you have your X server configured so each output is its own X screen. The first thing you need to do is make sure you have enough screens. Finding this out is easy enough:

<pre lang="cpp">int getNumScreens()
{
    osg::GraphicsContext::WindowingSystemInterface* wsi = osg::GraphicsContext::getWindowingSystemInterface();
    osg::GraphicsContext::ScreenIdentifier si;
    si.readDISPLAY();
    return wsi-&gt;getNumScreens(si);
}</pre>

You should do this before attempting to create your screens to make sure the X server is configured correctly. Otherwise OSG will throw an error when you try and create a graphics context for a screen that doesn&#8217;t exist. Setting up the viewers is fairly straight forward:

<pre lang="cpp">//Create main scene viewer

ref_ptr compositeViewer = new osgViewer::CompositeViewer;

// create first view
osgViewer::View* v0 = new osgViewer::View();
v0-&gt;setUpViewOnSingleScreen(0);

// add view to the composite viewer
compositeViewer-&gt;addView(v0);

// do the same with the second view
osgViewer::View* v1 = new osgViewer::View();
v1-&gt;setUpViewOnSingleScreen(1);
compositeViewer-&gt;addView(1);</pre>

And thats it. You also need to set the scene data for each of your views and a couple of things I&#8217;ve missed, but that is the basic idea. The problem with this method is it creates 2 graphics contexts, which in most cases will cause a performance hit.

### Single X Screen, Single Context

I looked into this method because I use TwinView on my Linux desktop boxes. Of course, TwinView means that there is only 1 XScreen that spans both monitors. Therefore, the getNumScreens function above will return 1. I have also set up our projector setup to use TwinView, so I don&#8217;t need to have one lot of code for testing on the desktop and then do something completely different when using the projectors. The other benefit of this approach is you only create one graphics context.

First thing we do is get the dimensions of the screen, which will be the combination of both screens.

<pre lang="cpp">// get the total resolution of the xscreen
osg::GraphicsContext::WindowingSystemInterface* wsi = osg::GraphicsContext::getWindowingSystemInterface();
unsigned width, height;
wsi-&gt;getScreenResolution(osg::GraphicsContext::ScreenIdentifier(0), width, height);</pre>

Once that is done we can create our (single) graphics context.

<pre lang="cpp">// create a context that spans the entire x screen
traits-&gt;x = 0;
traits-&gt;y = 0;
traits-&gt;width = width;
traits-&gt;height = height;
traits-&gt;windowDecoration = false;
traits-&gt;doubleBuffer = true;
traits-&gt;sharedContext = 0;
traits-&gt;overrideRedirect = true;
osg::ref_ptr gc = osg::GraphicsContext::createGraphicsContext(traits.get());</pre>

The important one here is overrideRedirect. Some window managers (I&#8217;m looking at you Gnome) will redirect the position of your graphics context, so it won&#8217;t appear where you want it. The overrideRedirect option is kindof new, it does not exist in the version of OSG shipping with Ubuntu 8.10. Therefore, I am running the latest stable release (2.6) compiled from source.

To get the equivalent of 2 screens to draw on, we create 2 views like before. However, we have to set their viewport manually. Here we just make v0 use the left half of the screen, and v1 use the right half. Easy enough?

<pre lang="cpp">//first screen
osgViewer::View* v0 = new osgViewer::View();

osg::ref_ptr cam = v0-&gt;getCamera();
cam-&gt;setGraphicsContext(gc.get());
cam-&gt;setViewport(0, 0, width/2, height);
compositeViewer-&gt;addView(v);

//second screen
osgViewer::View* v1 = new osgViewer::View();
osg::ref_ptr cam2 = v1-&gt;getCamera();
cam2-&gt;setGraphicsContext(gc.get());
cam2-&gt;setViewport(width/2, 0, width/2, height);
compositeViewer-&gt;addView(v1);</pre>

setViewport sets the viewport of the camera. The first 2 parameters are the position in the context&#8217;s window, the next 2 are the dimensions. So, each view gets width/2 for the width, and the second screen&#8217;s position is offset by half the screen width meaning it starts on the second monitor.

## Conclusion

And there you have it. Two methods for dual screen using OpenSceneGraph. Looking at the code, it is fairly simple. However, after browsing the doxygen docs for OSG it was not at all obvious to me. Of course, the osg-users mailing list was a big help here. In fact, <a href="http://groups.google.com/group/osg-users/browse_thread/thread/684fb727c4ab6ee2/daaa720956ae17e1" target="_blank" rel="noopener">here</a> is the thread from the mailing list

Cheers  
Michael
