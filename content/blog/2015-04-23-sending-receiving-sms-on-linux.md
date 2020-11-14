---
title: "Sending & Receiving SMS on Linux"
author: Michael Marner
type: post
date: 2015-04-23T04:01:32+00:00
excerpt: "A little while ago I worked on a mixed media theatre production called If There Was A Colour Darker Than Black I'd Wear It. As part of this production I needed to build a system that could send and receive SMS messages from audience members. Today we're looking at the technical aspects of how to do that using SMS Server Tools."
slug: /programming/sending-receiving-sms-on-linux/
featured_image: ../wp-content/uploads/2015/04/2015-04-23-13.24.03-825x510.jpg
categories:
  - Programming
tags:
  - Linux
  - mysql
  - sms
  - smstools
---

A little while ago I worked on a mixed media theatre production called <a href="http://illuminart.com.au/project/if-there-was-a-colour-darker-than-black-id-wear-it/" target="_blank">If There Was A Colour Darker Than Black I&#8217;d Wear It</a>. As part of this production I needed to build a system that could send and receive SMS messages from audience members. Today we&#8217;re looking at the technical aspects of how to do that using <a href="http://smstools3.kekekasvi.com/" target="_blank">SMS Server Tools</a>.

There are actually a couple of ways to obtain incoming text messages:

- Using an SMS gateway and software API
- Using a GSM modem plugged into the computer, and a prepaid SIM

The API route is the easiest way to go from a programming aspect. It costs money, but most gateways provide a nice API to interface with, and you&#8217;ll be able to send larger volumes of messages.

BLACK had a few specific requirements that made the gateway unsuitable.

1. We were projecting out of a van in regional South Australia. We had terrible phone reception, and mobile data was really flakey.
2. We were going to be sending text messages to audience members later, and needed to have the same phone number.

So, we got hold of a USB GSM modem and used a prepaid phone SIM. This allowed us to receive unlimited messages for free. However, we couldn&#8217;t send messages as quickly as we would have liked.

## Modem Selection

There are quite a few GSM modems to choose from. You are looking for one with a USB interface and a removable SIM. GSM modems that use wifi to connect to computers won&#8217;t work. You need to be able to remove the SIM because most mobile data SIMs won&#8217;t allow you to send or receive SMS messages. The other big requirement is Linux drivers, and Google is really your friend here. The main thing to watch out for is manufacturers changing the chipsets in minor product revisions.

We ended up going with an old Vodafone modem using a Huawei chipset. The exact model I used is **HUAWEi Mobile Connect Model E169** It shows up in Linux like this:

<pre>ID 12d1:1001 Huawei Technologies Co., Ltd. E169/E620/E800 HSDPA Modem</pre>

## SMS Tools

SMS Tools is an open source software package for interfacing with GSM modems on Linux. It includes a daemon, SMSD, which receives messages. SMSD is configured to run your own scripts when messages are received, allowing you to do pretty much anything you want with them.

Installation is straight forward on Ubuntu et al:

<pre>sudo apt-get install smstools</pre>

Next you&#8217;ll need to configure the software for your modem and scripts.

### Configuration File

The configuration file is a bit <a href="http://smstools3.kekekasvi.com/index.php?p=configure" target="_blank">unwieldy</a>, but thankfully it comes with some sane default settings. Edit the file in your favourite text editor:

<pre>sudo vim /etc/smsd.conf</pre>

#### Modem Configuration

First up you will need to configure your modem. The modem configuration is at the end of the config file, and the exact parameters will vary depending on what modem you have. Let&#8217;s have a look at what I needed:

<pre>[GSM1]
device = /dev/ttyUSB0
init = AT^CURC=0
incoming = yes
baudrate = 115200</pre>

*device* is where you specify the file descriptor for your modem. If you&#8217;re using a USB modem, this will almost allways be /dev/ttyUSB0.

_init_ specifies <a href="http://en.wikipedia.org/wiki/Hayes_command_set" target="_blank">AT commands</a> needed for your modem. Some modems require initialisation commands before they start doing anything. There are two strategies here, either find the manual for your modem, or take advantage of the SMSTools <a href="http://smstools3.kekekasvi.com/forum.php?id=6" target="_blank">Forums</a> to find a working configuration from someone else.

_incoming_ is there to tell SMSTools you want to use this device to receive messages.

_baudrate_ is, well, the baud rate needed for talking to the device.

Like I said, there are many options to pick from, but this is the bare minimum I needed. Check the SMSTools website and forum for help!

#### Event Handler

The other big important part of the config file is the event handler. Here you can specify a script/program that is run every time a message is sent or received. From this script you can do any processing you need, and could even reply to incoming messages.

<pre>eventhandler = /home/michael/smstools/sql_insert</pre>

My script is some simple Bash which inserts a message into a database, but more on that in a moment.

## Sending Messages

Sending SMS messages is super easy. Smsd looks in a folder, specified in the config file, for outgoing messages. Any files that appear in this folder get sent automatically. By default this folder is /var/spool/sms/outgoing.

An SMS file contains a phone number to send to (including country code, but with out the +) and the body of the message. For example:

<pre>To: 61412345678

This is a text message sent by smstools. Awesome!</pre>

Easy! Just put files that look like this into the folder and you&#8217;re sending messages.

## Receiving Messages

Let&#8217;s have a better look at the event handler. Remember, this script is called every time a message is sent or received. The information about the message is given to your program as command line arguments:

1. The event type. This will be either SENT, RECEIVED, FAILED, REPORT, or CALL. We&#8217;re only interested in RECEIVED here.
2. The path to the SMS file. You read this file to do whatever you need with the message

You can use any programming language to work with the message. However, it is very easy to use <a href="http://linux.die.net/man/1/formail" target="_blank">formail</a> and Bash. For example:

<pre>#!/bin/bash

#run this script only when a message was received.
if [ "$1" != "RECEIVED" ]; then exit; fi;

#Extract data from the SMS file
SENDER=`formail -zx From: &lt; $2`
TEXT=`formail -I "" &lt;$2 | sed -e"1d"`</pre>

From there you can do whatever you want. I put the message into a MySQL database.

## Troubleshooting

That&#8217;s all you need to write programs that can send and receive SMS messages on Linux. Once you have smsd actually talking to your modem it&#8217;s pretty easy. However, in practice it&#8217;s also fragile.

The smsd log file is *incredibly* useful here. It lives in /var/log/smstools/smsd.log

Here are some of the errors I encountered and what to do about them:

### Modem Not Registered

You&#8217;ll see an error that looks like this:

<pre>GSM1: MODEM IS NOT REGISTERED, WAITING 1 SEC. BEFORE RETRYING</pre>

This means the modem has lost reception, and is trying to re-establish a connection. Unfortunately there is nothing you can do here but wait or, using a USB extension cable, trying to find a spot with better reception.

### Write To Modem Error

An error like this:

<pre>GSM1: write_to_modem: error 5: Input/output error</pre>

means the software can no longer communicate with the modem. This is usually caused by the modem being accidentally unplugged, the modem being plugged in after the system has powered up, or by an intermittent glitch in the USB driver. To fix this, do the following:

1. Stop smsd (sudo service smstools stop)
2. Unplug the modem
3. Wait 10 seconds or so
4. Plug the modem back in
5. Start smsd (sudo service smstools start)

### Cannot Open Serial Port

You may see this error:

<pre>Couldn’t open serial port /dev/ttyUSB0, error: No such file or directory</pre>

This occurs if you started the computer (and therefore smsd) before plugging in the modem. Follow the steps above to fix it.

# Conclusion

So there you have it. Follow these steps and you can send and receive SMS messages on Linux, using a cheap prepaid SIM and GSM modem.

In the next post we&#8217;ll be looking at exactly what I used this setup for.
