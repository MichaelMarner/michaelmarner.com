---
title: "Java Tutorials: Series 1 Errata"
author: Michael Marner
type: post
date: 2007-04-05T06:33:49+00:00
slug: /java-tutorials/java-vtm-series-1-errata/
categories:
  - Java Video Tutorials
---

Well, the Java VTM series 1 has been incredibly well recieved. Thankyou everyone for your support and comments about my videos. However, I&#8217;ve got a couple of things to fix regarding the videos, so here are some series 1 corrections.<!--more-->

So whats wrong with the videos? Nothing actually, but times change. Java has evolved over the years and the API gets bigger with every release. See, when I started learning Java, version 1.4 had just been released. In this version, like the version before that there was no simple way to extract data from the keyboard. Enter the Keyboard class. This is a java file that I wrote for the Java VTM. It has simple methods for getting data from the keyboard, so that you don&#8217;t have to do it yourself.

However, times change. With the release of Java 5 extracting data from the keyboard has never been easier. What this means for you is that you can pretty much throw my Keyboard class away. It is now obsolete. There is now a standard Java class called **Scanner**. Have a look in the Java API. There are all these methods like nextInt, nextDouble, nextLine etc. What Scanner does is provide a simple way to get data from the keyboard (any InputStream actually), so we don&#8217;t have to do the hard work ourselves.

Lets look at at the following code from Video 4 in the VTM. This is how the video explained how to get data from the keyboard.

<pre lang="java">int testInt;
double testDouble;
char testChar;</pre>

<pre lang="java">testInt = Keyboard.readInt();
testDouble = Keyboard.readDouble();
testChar =  Keyboard.readChar();</pre>

Now lets change the code so we use Scanner instead. The first thing we need to do is create an instance of Scanner. There are a couple of constructors available, but the one we are interested in takes an InputStream as its parameter. If we want to get data from the keyboard, we need to pass in System.in as the parameter.

<pre lang="java">Scanner keyboard = new Scanner(System.in); //create a scanner object</pre>

Now that we have the scanner ready to go, we can use all of its methods to access data that I did using my Keyboard class. The code below shows how we can get numbers from the keyboard.

<pre lang="java">testInt = keyboard.nextInt();
testDouble = keyboard.nextDouble();</pre>

So what about characters? Well, there isn&#8217;t a dedicated method for getting a character from Scanner. Same with Strings. There is a method called nextLine() in Scanner, but it doesn&#8217;t really do what you expect. If there is a line waiting to be read on the InputStream (such as in files), it will read the line. However, if there isn&#8217;t a line waiting to be read you will get an exception! Not fun. So, for doing character and String reading a BufferedReader is the way to go.

<pre lang="java">BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));</pre>

With BufferedReader you can read in lines or characters from an input stream. So to get a character and string you would do the following:

<pre lang="java">System.out.println("Please enter a char");
//readline returns a String, so we get the character
testChar = reader.readLine().charAt(0);

System.out.println("Please enter a String");
testString = reader.readLine();</pre>

Note that the code above should be contained within a try block, as an IOException may be thrown.

So with that, throw away Keyboard.java because you don&#8217;t need it all. The ever expanding Java API now has all of Keyboard&#8217;s functionality and a whole heap more. Finally there is an easy way to get data from the keyboard, without having to write your own classes. [Here][1] is the full Java file from VTM 4, using Scanner and BufferedReader instead of the Keyboard class.

Later  
Michael

[1]: http://marner.servebeer.com/wordpress/wp-content/uploads/2008/12/keyboardtest.zip
