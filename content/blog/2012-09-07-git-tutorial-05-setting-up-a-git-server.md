---
title: Git Tutorial 05 – Setting up a git server
author: Michael Marner
type: post
date: 2012-09-06T21:07:13+00:00
slug: /git-tutorials/git-tutorial-05-setting-up-a-git-server/
categories:
  - Git Video Tutorials
tags:
  - git
  - Linux
  - repository
  - server
  - ssh
---

[<img loading="lazy" class="alignleft size-thumbnail wp-image-354" title="git-logo" src="../wp-content/uploads/2011/03/git-logo-150x150.png" alt="" width="150" height="150" srcset="../wp-content/uploads/2011/03/git-logo-150x150.png 150w, ../wp-content/uploads/2011/03/git-logo.png 256w" sizes="(max-width: 150px) 100vw, 150px" />][1]Hey

So a couple of weeks ago I received an email asking how to go about setting up a Git server on Linux. This is actually pretty straight forward, provided you are familiar with Linux. I made a quick video describing the process.

<!--more-->

In this video we end up accessing the repository on the server through SSH. There are alternatives to this, such as WebDav, or the built in Git protocol. However, everything I have ever worked on has used SSH to access the repository. It&#8217;s also how GitHub does it.

The basic steps:

1. Connect to the server
2. Make sure that all your developers have a user account on the server (adduser)
3. Create a group on the system for your developers (addgroup)
4. Add all the developers to that group. I did this by manually editing /etc/group on the server, but the more _correct_ way would be to use the useradd command. That way you are less likely to mess up the group file.
5. Create a directory in which to put the git repository.
6. Set the group ownership to the group you just created (chgrp)
7. Make the directory group read/writable, with the sticky bit set so subdirectories inherit the group permissions (chmod)
8. Initialise a bare, shared repository
9. ????
10. Profit!

Hope that helps a bit!

<p style="text-align: center;">
  [ad]
</p>

[1]: ../wp-content/uploads/2011/03/git-logo.png
