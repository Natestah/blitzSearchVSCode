# Blitz Search

Blitz Search is an external Tool that provides a dialogue for search much the same as JetBrains IDE's. With this you can slim down your sidebar and have an improved search experience.

It is intended to be a full replacement for Find-in-Files and Replace in files, You can rebind those hotkeys or make new ones.

The query format is words on a line based instead of literal by default, though a literal option is available.

# Blitz Search is both Fast and Readable:

![Blitz Search In motion](https://blitzsearch.s3.us-east-2.amazonaws.com/AnimateBlitzUpdated.gif)

# Words on a line query is default

Using Modern C# as an example for a search that's hard with traditional search

```csharp
    var myListOfVegetables = new List<string>();
    List<string> myListOfVegetables = new();
    List<string> myListOfVegetables = new List<string>();
```

I know I have a "list" of "vegetables" in my code somewhere. I don't remember if I called it "myVegetableList" or "myListOfVegetables".  I don't remember if I declared it using modern CSharp or old.  "List\*Vegetables" followed by "Vegetables\*list".  Or what's worse is I want to farther narrow this down to the instancing by introducing "new" to the query.  What does that look like in traditional search?  

With Blitz the query here is "vegetables new list" and that matches all those things.


# Configurable Sets of Paths, with Icons to boldly Show what scopes you are looking at ( click image for example ).

[![Blitz SearchQuickScope](https://blitzsearch.s3.us-east-2.amazonaws.com/BlitzQuickScope.png)](https://youtube.com/shorts/k2wyDA6onqM)


## Blitz Search This Command

Blitz Search This Command Finds ( find it in command pallete "Blitz Search This" ) the word at the caret:

![Blitz Search In motion](https://blitzsearch.s3.us-east-2.amazonaws.com/ThemeMatchUpdated.png)

## Blitz Replace This Command

Blitz Replace Command Frames up a Replacement Query, Replace can be either "Words", "Literal" or Regular Expression

![Blitz Search In motion](https://blitzsearch.s3.us-east-2.amazonaws.com/BlitzReplaceWBG.png)

## Features

* Find words on a line by default ( Literal and Regex are available too )
* Find Text in Files faster, by retaining index in memory AND using the quickest form of Serialization for recalling old sessions.  Blits Search is very fast! 
* Real time results update while you type.  
* Large volumes of files quickly. 
* Syntax Highlighting in results, bold highlights, easy on the eyes.
* .GitIgnore / .BlitzIgnore file filter reduces workload and Clutter in results.
* Auto-Human text file discovery Takes burden off Filtering.  There is no file extension here.
* FileName filter is a word on line filters taking the same query "\path_name\ @.cs|@.xaml". Only use it when results need filtering.
* Quality of Life focused, Community Driven features ( see Discord invite )


## Requirements
> Windows x64 only, Download and install the FREE Companion application Blitz Search, Reasonably priced Premium search subscription for Upgraded Theme selection and Replace functionality.
>
> Download from
> [natestah.com](https://natestah.com/)

## Known Issues

> Blitz Search currently has a small user base (friends).  Help me get the word out, like and subscribe. leave a review..
> 
> [Blitz Search Discord](https://discord.com/invite/UYPwQY9ngm)
>
> [r/BlitzSearch](https://www.reddit.com/r/BlitzSearch/)


## Blitz Search is #buildinginpublic, check out this YouTube channel

* I have an over 25 years of AAA game development history, including Working on 10 different Call of Duty titles! I am telling my story as well as doing regular updates on Blitz Search.

[![BlitzSearchYouTube.png](https://blitzsearch.s3.us-east-2.amazonaws.com/BlitzSearchYouTube.png 'Blitz Search Youtube Channel')](https://blitzsearch.s3.us-east-2.amazonaws.com/BlitzSearchYouTube.png)

## Release Notes

### 0.0.9

Added "Blitz Replace This" command, More updates to description. Less words-more pictures.


### 0.0.8

Work to Description and Readme. "Luxury Search", it's no longer about the speed but the whole experience.  Try it for free.

### 0.0.7

Blitz Search is now a signed executable, I am here simply to update the description.

### 0.0.6

When paired with Blitz 0.0.13 + running the command will now start the executable too. Previously it was required to be running.

### 0.0.5

Cleanup ReadMe.mD

### 0.0.3

Initial Setup, testing waters


---

**Enjoy!**
