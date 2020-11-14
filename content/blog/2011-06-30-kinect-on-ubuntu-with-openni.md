---
title: Kinect on Ubuntu with OpenNI
author: Michael Marner
type: post
date: 2011-06-30T05:06:57+00:00
slug: /programming/kinect-on-ubuntu-with-openni/
categories:
  - Programming
tags:
  - featured
  - kinect
  - microsoft
  - NITE
  - OpenNI
  - ubuntu
---

**UPDATE October 2015: Verified working in Ubuntu 14.04 LTS and 15.04!**

I&#8217;ve spent all this morning trying to talk to the Microsoft Kinect using <a href="http://openni.org/" target="_blank">OpenNI</a>. As it turns out, the process is not exceptionally difficult, it&#8217;s just there doesn&#8217;t seem to be any up to date documentation on getting it all working. So, this post should fill the void. I describe how to get access to the Kinect working using Ubuntu 12.04 LTS, OpenNI 1.5.4, and NITE 1.5.2. <!--more-->

Please note that since writing this tutorial, we now have OpenNI and NITE 2.0, and <a href="http://techcrunch.com/2013/11/24/apple-primesense-acquisition-confirmed/" target="_blank">PrimeSense have been bought by Apple</a>. This tutorial does not work with versions 2 (though 1.5 works just fine), and there is talk of Apple s<a href="http://www.theregister.co.uk/2014/03/02/openni_project_to_close/" target="_blank">topping public access to NITE</a>.

To talk to the Kinect, there are two basic parts: OpenNI itself, and a Sensor module that is actually responsible for communicating with the hardware. Then, if you need it, there is NITE, which is another module for OpenNI that does skeletal tracking, gestures, and stuff. Depending on how you plan on using the data from the Kinect, you may not need NITE at all.

[ad]

### Step 1: Prerequisites

We need to install a bunch of packages for all this to work. Thankfully, the readme file included with OpenNI lists all these. However, to make life easier, this is (as of writing) what you need to install, in addition to all the development packages you (hopefully) already have.

<pre lang="bash">sudo apt-get install git build-essential python libusb-1.0-0-dev freeglut3-dev openjdk-7-jdk</pre>

There are also some optional packages that you can install, depending on whether you want documentation, Mono bindings, etc. Note that on earlier versions the install failed if you didn&#8217;t have doxygen installed, even though it is listed as optional.

<pre lang="bash">sudo apt-get install doxygen graphviz mono-complete</pre>

### Step 2: OpenNI 1.5.4

OpenNI is a framework for working with what they are calling _natural interaction_ devices.Anyway, this is how it is installed:

Check out from Git

OpenNI is hosted on Github, so checking it out is simple:

<pre lang="bash">git clone https://github.com/OpenNI/OpenNI.git</pre>

The first thing we will do is checkout the Unstable 1.5.4 tag. If you don&#8217;t do this, then the SensorKinect library won&#8217;t compile in Step 3. From there, change into the Platform/Linux-x86/CreateRedist directory, and run the RedistMaker script. Note that even though the directory is named x86, this same directory builds 64 bit versions just fine. So, don&#8217;t fret if you&#8217;re on 64bit Linux.

<pre lang="bash">cd OpenNI
git checkout Unstable-1.5.4.0
cd Platform/Linux/CreateRedist
chmod +x RedistMaker
./RedistMaker</pre>

The RedistMaker script will compile everything for you. You then need to change into the Redist directory and run the install script to install the software on your system.

<pre lang="bash">cd ../Redist/OpenNI-Bin-Dev-Linux-[xxx]  (where [xxx] is your architecture and this particular OpenNI release)
sudo ./install.sh</pre>

### Step 3: Kinect Sensor Module

OpenNI doesn&#8217;t actually provide anything for talking to the hardware, it is more just a framework for working with different sensors and devices. You need to install a Sensor module for actually doing the hardware interfacing. Think of an OpenNI sensor module as a device driver for the hardware. You&#8217;ll also note on the OpenNI website that they have a Sensor module that you can download. Don&#8217;t do this though, because that sensor module doesn&#8217;t talk to the Kinect. I love how well documented all this is, don&#8217;t you?

The sensor module you want is also on GitHub, but from a different user. So, we can check out the code. We also need to get the kinect branch, not master.

<pre lang="bash">git clone https://github.com/avin2/SensorKinect
cd SensorKinect</pre>

The install process for the sensor is pretty much the same as for OpenNI itself:

<pre lang="bash">cd Platform/Linux/CreateRedist
chmod +x RedistMaker
./RedistMaker
cd ../Redist/Sensor-Bin-Linux-[xxx] (where [xxx] is your architecture and this particular OpenNI release)
chmod +x install.sh
sudo ./install.sh</pre>

On Ubuntu, regular users are only given read permission to unknown USB devices. The install script puts in some udev rules to fix this, but if you find that none of the samples work unless you run them as root, try unplugging and plugging the Kinect back in again, to make the new rules apply.

### Step 4: Test the OpenNI Samples

At this point, you have enough installed to get data from the Kinect. The easiest way to verify this is to run one of the OpenNI samples.

<pre lang="bash">cd OpenNI/Platform/Linux-x86/Bin/Release
./Sample-NiSimpleViewer</pre>

You should see a yellow-black depth image. At this point, you&#8217;re left with (optionally) installing the higher level NITE module.

### Step 5: Install NITE 1.5 (optional)

Firstly, you need to obtain NITE 1.5.2. Go to the following link and download NITE 1.5.2 for your platform..

<a href="http://www.openni.org/openni-sdk/openni-sdk-history-2/" target="_blank">http://www.openni.org/openni-sdk/openni-sdk-history-2/</a>

Extract the archive, and run the installer:

<pre lang="bash">sudo ./install.sh</pre>

At some point, you may be asked for a license key. A working license key can be found <a href="http://www.google.com/search?q=NITE+license+key" target="_blank">just about anywhere on the Internet</a>. I don&#8217;t think PrimeSense care, or maybe this is a non-commercial license or something. But whatever, just copy that license into the console, including the equals sign at the end, and NITE will install just fine.

### Conclusion

After following these steps, you will be able to write programs that use the Microsoft Kinect through OpenNI and NITE middleware. I hope this helps someone, because I spent a lot of time screwing around this morning trying to get it all to work. Like I said, the process is pretty straight forward, it just hasn&#8217;t been written down in one place (or I suck at google).

<p style="text-align: center;">
  [ad]
</p>
