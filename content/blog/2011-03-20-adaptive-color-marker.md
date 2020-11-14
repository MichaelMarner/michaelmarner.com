---
title: Adaptive Color Marker for SAR Environments
author: Michael Marner
type: post
date: 2011-03-20T03:36:12+00:00
slug: /research/adaptive-color-marker/
featured_image: ../wp-content/uploads/2011/03/adaptive-detail-e1422923548205-825x510.jpg
categories:
  - Research
tags:
  - Augmented Reality
  - c++
  - opengl
  - Programming
  - publication
  - sar
---

Hey Everyone

So right now I am at the IEEE Symposium on 3D User Interfaces in Singapore. We have a couple of publications which I&#8217;ll be posting over the next few days. First up is _Adaptive Color Marker for SAR Environments_. In a <a href="http://www.youtube.com/watch?v=6SAjX8-iBOc" target="_blank">previous study</a> we created interactive virtual control panels by projecting onto otherwise blank designs. We used a simple orange marker to track the position of the user&#8217;s finger. However, in a SAR environment, this approach suffers from several problems:

- The tracking system can&#8217;t track the marker if we project the same colour as the marker.
- Projecting onto the marker changes it&#8217;s appearance, causing tracking to fail.
- Users could not tell when they were pressing virtual controls, because their finger occluded the projection.

We address these problems with an active colour marker. We use a colour sensor to detect what is being projected onto the marker, and change the colour of the marker to an _opposite_ colour, so that tracking continues to work. In addition, we can use the active marker as a form of visual feedback. For example, we can change the colour to indicate a virtual button press.

I&#8217;ve added the publication to my publications page, and here&#8217;s the video of the marker in action.

&nbsp;
