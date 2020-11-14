---
title: How OpenNI Nearly Spoiled The Show
author: Michael Marner
type: post
date: 2011-09-22T10:37:01+00:00
slug: /programming/how-openni-nearly-spoiled-the-show/
categories:
  - Programming
tags:
  - Border Project
  - c++
  - Half Real
  - kinect
  - Linux
  - OpenNI
  - ubuntu
---

[<img loading="lazy" class="alignleft size-thumbnail wp-image-424" title="Half Real" src="../wp-content/uploads/2011/09/halfreal-1-150x150.jpg" alt="Half Real" width="150" height="150" />][1]So, for the last few months I&#8217;ve taken a break from the PhD to do some work for a theatre show for <a title="The Border Project" href="http://www.theborderproject.com" target="_blank">The Border Project</a>, <a title="Half Real" href="http://www.theborderproject.com/project-half-real.html" target="_blank">Half Real</a>.

There&#8217;s a lot of technology in the show. In particular, most of the set is projected, and we are using a Microsoft Kinect to track the actors on stage, and modifying the projections based on their location.

I&#8217;m working on Linux, and using <a title="OpenNI" href="http://www.openni.org/" target="_blank">OpenNI</a> for interfacing with the Kinect. Things _almost_ worked perfectly. In this post I will document the trials and tribulations of getting the Kinect to work for Half Real.

<!--more-->I often fall into

<a title="Not Invented Here Syndrome" href="http://en.wikipedia.org/wiki/Not_Invented_Here" target="_blank">Not Invented Here Syndrome</a>, and so slowly I&#8217;m trying to get out of it. Obviously, interfacing with hardware like the Kinect is not something I really wanted to do during a 3 month theatre development. My Spatial Augmented Reality framework is built on Linux, so I basically had the option of <a href="http://openkinect.org/wiki/Main_Page" target="_blank">Libfreenect</a> or <a href="http://www.openni.org/" target="_blank">OpenNI</a>. OpenNI appears to be more mature, and so that&#8217;s what I went with.

As you can see, I&#8217;m only really tracking the position of the actors &#8211; we aren&#8217;t using any of the gesture recognition stuff.

During development everything looked peachy. However, during production week when we started running through the whole show, a _major_ issue popped up. It turns out there is a bug buried deep in OpenNI that eventually rears its ugly head if you have a few people running around at the same time:

<pre>Program received signal SIGSEGV, Segmentation fault.
 0x00007ffff215574d in Segmentation::checkOcclusion(int, int, int, int)</pre>

This is a big problem. See, this is a theatre show, where the entire set is projected. If the system crashes, the stage goes black. The operator has to restart and bring the projections up to the right point in the show. It turned out that in our tech previews, the software was crashing 2-3 times per show. This was simply unacceptable.

Thankfully, I was only interested in the positions of the actors. This meant I could run the tracking in a completely different process and send the data to the projection system without too much overhead. So, on the day before I finished working for the project, I had to completely rewrite how the tracking worked.

### The Data We Need

As I said, we only need position. I didn&#8217;t have to send through any camera images, gesture information, etc. All I needed was:

<pre lang="cpp">struct KinectMessage
{
    uint8_t actor_id;
    float   quality;
    float   x;
    float   y;
    float   z;
};</pre>

The process that interfaces with the Kinect simply sent these messages over a TCP connection to the projection system for every actor on stage. TCP worked pretty well. Both processes run on the same system, and the Kinect only updates at 30fps anyway. So you know, there&#8217;s only 510 bytes per second, per actor that needed to be transferred. If I was transferring images, a better <a href="http://en.wikipedia.org/wiki/Inter-process_communication" target="_blank">IPC</a> technique would be required.

### While True

At this point, the hard work was done. Simply wrap the tracking process in a shell script that loops forever, rerunning the process when the segfault occurs. The projectors never go to black, and the worst case is the tracking lags for a a couple of seconds. Not perfect, but infinitely better.

I guess the moral of this post is to be wary of relying on 3rd party libraries that are not particularly mature. And if you have to (you don&#8217;t have much choice if you want to talk to the Kinect), wrap it up so it can&#8217;t screw you over. TCP worked for me, because I didn&#8217;t need to transfer much data. Even if you were doing the skeleton tracking and gestures, there isn&#8217;t a lot of data to send. If you need the images from the camera, TCP _may_ not be for you. But there are plenty of other IPC techniques that could handle that amount of data (even pipes would do it). I guess the good news is OpenNI is Open Source, so in theory someone can get around to fixing it.

Hope this helps someone.

Michael

[1]: ../wp-content/uploads/2011/09/halfreal-1.jpg
