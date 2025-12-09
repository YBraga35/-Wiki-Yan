---
title: Sumário Inicial
description: Esse documento é supostamente o sumário e a página inicial de todo o meu site baseado nas anotações do Obsidian.
aliases:
  - indexação
  - Índice
tags: []
draft: true
date: 2024-07-24
creation date: 2024-07-24 01:43
modification date: quarta-feira 24º julho 2024 01:48:17
---

> [!quote] Who sows virtue reaps honor.
> — Leonardo da Vinci




# Markdown Cheat Sheet

## Basic Syntax

These are the elements outlined in John Gruber’s original design document. All Markdown applications support these elements.

### Heading

# H1
## H2
### H3

### Bold

**bold text**

### Italic

*italicized text*

### Blockquote

> blockquote

### Ordered List

1. First item
2. Second item
3. Third item

### Unordered List

- First item
- Second item
- Third item

### Code

`code`

### Horizontal Rule

---

### Link

[Markdown Guide](https://www.markdownguide.org)

### Image

![alt text](https://www.markdownguide.org/assets/images/tux.png)

## Extended Syntax

These elements extend the basic syntax by adding additional features. Not all Markdown applications support these elements.

### Table

| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

### Fenced Code Block

```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

### Footnote

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

### Heading ID

### My Great Heading {#custom-id}

### Definition List

term
: definition

### Strikethrough

~~The world is flat.~~

### Task List

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

### Emoji

That is so funny! :joy:

(See also [Copying and Pasting Emoji](https://www.markdownguide.org/extended-syntax/#copying-and-pasting-emoji))

### Highlight

I need to highlight these ==very important words==.

### Subscript

H~2~O

### Superscript

X^2^



# Markdown Syntax﻿

Last modified: 21 June 2024

In different locations around Hub, you have the ability to format blocks of text. This formatting is applied using the Markdown markup syntax. Markdown is supported for the following features in Hub:

|Feature|Description|
|---|---|
|[Quick Notes Widgets](https://www.jetbrains.com/help/hub/quick-notes-widgets.html)|These widgets use Markdown to format text. These widgets can be placed on dashboards and project overview pages.|
|[Project Overviews](https://www.jetbrains.com/help/hub/project-overview.html)|The project description that is shown on a project overview page is formatted in Markdown.|
|[User Agreement](https://www.jetbrains.com/help/hub/user-agreement.html)|The agreement text that is presented to users who are required to accept an information notice to access Hub is formatted in Markdown.|

The Markdown implementation in YouTrack follows the [CommonMark specification](https://spec.commonmark.org/0.28/) with extensions. These extensions support formatting options that are not included in the formal specification like strikethrough text, tables, and autolinks.

To see any of these formatting options in action, paste the sample block of code into an input field that accepts Markdown.

## Character Formatting﻿[](https://www.jetbrains.com/help/hub/markdown-syntax.html#quick-notes-markdown-characters)

You can format inline text with the following Markdown syntax.

|Style|Syntax|
|---|---|
|Strong|Surround text with two asterisks (`**`) or two underscore characters (`__`).|
|Emphasis|Surround text with single asterisks (`*` )or underscore characters (`_`).|
|Strikethrough|Surround text with two tildes (`~~`).|
|Code|Surround text with single backquotes (`` ` ``).|
|Combinations|Surround text with single underscore characters or two tildes inside two asterisks. Surround text with three asterisks to apply strong emphasis.|

```
You should read this, it's **very important**.
You _might_ want to read this.
~~Never mind~~ - it wasn't _that_ important.

Let's try a few `combinations`:
**This text is strong, ~~this text is strong with strikethrough~~, and _this text is formatted with strong emphasis_**
***This text is formatted with strong emphasis too.***
```

## Headings﻿[](https://www.jetbrains.com/help/hub/markdown-syntax.html#quick-notes-markdown-headings)

To apply a heading style, start the line with one to six number signs `#`. Follow the number signs with a space character and enter the heading text. The number of `#` signs determines the heading level.

Hub also supports an alternative syntax for heading levels 1 and 2:

- For heading level 1, enter one or more `=` characters on the following line.
    
- For heading level 2, enter one or more `-` characters on the following line.
    

```
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

Heading 1 - Alternative Syntax
========

Heading 2 - Alternative Syntax
--------
```

## Paragraphs and Line Breaks﻿[](https://www.jetbrains.com/help/hub/markdown-syntax.html#quick-notes-markdown-paragraphs)

Contiguous lines of text belong to the same paragraph. Use the following guidelines to structure your content into paragraphs and enter line breaks.

- To start a new paragraph, leave a blank line between lines of text.
    
- To start a new line inside a paragraph, enter two trailing spaces at the end of the line of text.
    

```
Even though this text is written on two separate lines,
it is parsed as a single paragraph.

This paragraph is separated from the previous paragraph
by a blank line.
```

## Thematic Breaks﻿[](https://www.jetbrains.com/help/hub/markdown-syntax.html#quick-notes-markdown-lines)

Create sections in your content with horizontal lines. Use any of the following methods to add a horizontal line:

- Three underscores (`___`)
    
- Three minus signs (`---`)
    
- Three asterisks (`***`)
    

```
The underscores on the next line create a thematic break below this paragraph.
___
The minus signs below must be separated from this paragraph by a blank line.
If not, they are parsed as a level 2 heading.

----
Three or more asterisks also create a thematic break.
****
```

## Block Quotes﻿[](https://www.jetbrains.com/help/hub/markdown-syntax.html#quick-notes-markdown-quotes)

Use block quotes to call special attention to a quote from another source. You can apply character formatting to inline text inside the quoted block.

To set text as a quote block, start the line with one or more `>` characters. Follow these characters with a space and enter the quoted text. The number of `>` signs determines the level of nesting inside the quote block.

If your quote spans multiple paragraphs, each blank line must start with the `>` character. This ensures that the entire quote block is grouped together.

```
> Use quote blocks to emulate reply text.
> This line is part of the same quote.

This line is not formatted and does not belong to the quote block.

> This block spans multiple paragraphs.
>
> The second paragraph is grouped with the previous paragraph in the same quote block.
> Character formatting is _also_ supported inside the **quote block**.

> Quote blocks can also be nested.
>> When you start a new line with additional > characters,
>>> it simulates a threaded conversation.
```

## Indented Code Blocks﻿[](https://www.jetbrains.com/help/hub/markdown-syntax.html#indented-code-blocks)

You can format blocks of text in a monospaced font to make it easier to identify and read as code.

To format a code block in Markdown, indent every line of the block by at least four spaces. An indented code block cannot interrupt a paragraph, so you must insert at least one blank line between a paragraph the indented code block that follows. The input is processed is as follows:

- One level of indentation (four spaces) is removed from each line of the code block.
    
- The contents of the code block are literal text and are not parsed as Markdown.
    
- Any non-blank line with fewer than four leading spaces ends the code block and starts a new paragraph.
    

```
Start an indented code block following a paragraph with a blank line and at least four spaces of indentation:

    This is a code block.

    Blank lines between indented lines do not end the code block.

    Here is some HTML:
        <div class="footer">
             2009—2017 JetBrains · All rights reserved
        </div>
This line of text is not indented. It ends the code block and starts a new paragraph.
```

## Fenced Code Blocks﻿[](https://www.jetbrains.com/help/hub/markdown-syntax.html#fenced-code-blocks)

Unlike [indented code blocks](https://www.jetbrains.com/help/hub/markdown-syntax.html#indented-code-blocks), fenced code blocks have an info string that lets you specify which language is used for syntax highlighting. Language-specific highlights make the code easier to read.

Syntax highlighting is supported for a range of languages. YouTrack detects and highlights code in C, C++, C#, Java, JavaScript, Perl, Python, Ruby, and SH automatically. To highlight code in other languages, set the language in the info string (the line with the opening code fence). The following languages are supported: apollo (AGC/AEA Assembly Language), basic, clj (Clojure) css, dart, erlang, hs (Haskell), kt (Kotlin), lisp, llvm, lua, matlab, ml, mumps, n (Nemerle), pascal, proto, scala, sql, tcl, tex, vb, vhdl, wiki, xq, and yaml.

- To create a fenced code block that spans multiple lines of code, set the text inside three or more backquotes (` ``` `) or tildes (`~~~`).
    
- Open and close the block with the same character.
    
- Use the same number of characters to open and close the code fence.
    

````
Set multiple lines of code in fenced code blocks.

```
action: function(ctx) {
    workflow.check(!ctx.issue.isChanged('votes'), workflow.i18n('Voting for a resolved issue is not allowed.'));
},
```

The following code block uses syntax highlighting for Haskell:
```hs
-- Point-free style
fib :: Integer -> Integer
fib = (fibs !!)
where fibs = 0 : scanl (+) 1 fibs

-- Explicit
fib :: Integer -> Integer
fib n = fibs !! n
where fibs = 0 : scanl (+) 1 fibs
```
````

## Lists﻿[](https://www.jetbrains.com/help/hub/markdown-syntax.html#quick-notes-markdown-lists)

Use the following syntax to create lists:

- To create an unordered list, start the line with a dash (`-`), asterisk (`*`), or plus sign (`+`).
    
- To create an ordered list, start the line with a number and a period (`1.`). Increment subsequent numbers to format each item in the ordered list.
    
- To nest an unordered list inside an unordered or ordered list, indent the line with two spaces. Nesting ordered lists is not supported.
    

```
Things I need to do today:
1. Fix usability problem
2. Clean up the page
   * Make the headings bigger
2. Push my changes
3. Create code review
   * Describe my changes
   * Assign reviewers
     * Ask for feedback
```

## Tables﻿[](https://www.jetbrains.com/help/hub/markdown-syntax.html#quick-notes-markdown-tables)

Tables are a great tool for adding structure to your content. Use the following syntax to create tables:

- To create columns, use vertical bars (`|`). The outer bars are optional.
    
- Separate the header row from the rest of the table with three or more dashes (`---`).
    

Note that the columns don't have to line up perfectly in the raw Markdown. You can also add character formatting to text inside the table.

```
Kitchen Cleanup Rotation

| Month    | Assignee | Backup |
| -------- | -------- | ------ |
| January  | Dave     | Steve  |
| February | Gregg    | Karen  |
| March    | Diane    | Jorge  |

Here's the same text with character formatting.
+ The text in the first column is flush right.
+ The text in the second column is centered.
+ The Markdown is stripped down to the minimum syntax that is required to render the table.

Month | Assignee | Backup
---:|:---:| ---
**January** | Dave | _Steve_
**February** | Gregg | _Karen_
**March** | Diane | _Jorge_
```

All of the cells are left-justified. The syntax that aligns text to the right or center is not supported.

## Links﻿[](https://www.jetbrains.com/help/hub/markdown-syntax.html#quick-notes-markdown-links)

There are several ways to insert hyperlinks with Markdown.

|Style|Format|
|---|---|
|Inline|Wrap link text with brackets `[ ]` followed by the URL in parentheses `( )`.|
|Inline with tooltip|Use inline formatting and add the tooltip in quotation marks after the URL.|
|Reference|Replace the URL with an arbitrary, case-insensitive reference, wrapped in brackets `[ ]`. Add the reference text and URL to another place in the document. To define the reference, enter the same tag name wrapped in brackets, followed by a colon, followed by the URL. These references are not displayed in the rendered markdown. Use reference-style links when you have multiple links to the same target.|

Hub has also extended the standard syntax to include [autolinks](https://www.jetbrains.com/help/hub/markdown-syntax.html#autolinks).

```
[inline link](https://www.jetbrains.com)
[inline link with tooltip](https://www.jetbrains.com "JetBrains: Development Tools for Professionals and Teams")
[reference link][1]

[1]: https://www.jetbrains.com
```

URLs and URLs in angle brackets are automatically converted into hyperlinks. For example:

- https://www.jetbrains.com
    
- <https://www.jetbrains.com>
    
- jetbrains.com
    

## Autolinks﻿[](https://www.jetbrains.com/help/hub/markdown-syntax.html#autolinks)

Autolinks are absolute URIs and email addresses that are set inside angle brackets (`< >`). They are parsed as links, with the URL or email address as the link label. Unlike [links](https://www.jetbrains.com/help/hub/markdown-syntax.html#quick-notes-markdown-links) that let you specify link text and tooltips, this syntax simply converts the URL or email address into a clickable link.

Hub supports an extended syntax for URLs. Any string that is parsed as a URL is converted into a clickable link, even without the angle brackets. Email addresses that are not set inside angle brackets are displayed as text.

```
Both of these URLs are parsed as links:

<https://youtrack.jetbrains.com/issues>
https://youtrack.jetbrains.com/issues

Email addresses are also converted into "mailto" links when set in angle brackets:

<webmaster@jetbrains.com>
```

## Images﻿[](https://www.jetbrains.com/help/hub/markdown-syntax.html#quick-notes-markdown-images)

The syntax for images is similar to the syntax for links. To insert an inline image:

- Start the line with an exclamation point (`!`).
    
- Wrap the alt text with brackets (`[ ]`).
    
- Set the image URL and tooltip in parentheses (`( )`).
    

You can also use the reference style for images. To insert an image reference:

- Start the line with an exclamation point (`!`).
    
- Wrap the alt text with brackets (`[ ]`).
    
- Set the image reference in brackets (`[ ]`).
    
- Define the image reference in another location with the format `[tag]: image URL "tooltip"`.
    

```
Here's an image link to the Markdown logo on Wikipedia:

Inline:
![Markdown logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/208px-Markdown-mark.svg.png "Markdown")

Reference style:
![Markdown logo][logo]

[logo]: https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/208px-Markdown-mark.svg.png "Markdown"

Markdown also supports images as links.
Just wrap the entire image reference in brackets then add the target URL in parenthesis after the image reference.
People use this syntax to insert a thumbnail image that links to a video on a video sharing platform.

Here's a reference to the latest video promotion for YouTrack:

[![YouTrack — Maintain Order In A World of Chaos](https://img.youtube.com/vi/rhAunB7UQFQ/sddefault.jpg)](https://www.youtube.com/watch?v=rhAunB7UQFQ)
```

## Backslash Escapes﻿[](https://www.jetbrains.com/help/hub/markdown-syntax.html#backslash-escapes)

When you have characters that are parsed as Markdown that you want to show as written, you can escape the character with the backslash (`\`).

- Backslashes before non-markup characters are shown as backslash characters.
    
- Escaped characters are treated as regular characters. Their usual meaning in Markdown syntax is ignored.
    
- Backslash escapes do not work in fenced code blocks, inline code spans, or autolinks.
    

```
Here are a few examples of backslash escapes:

\*not emphasis*
\`not an inline code span`
1\. not an ordered list
\* not an unordered list
\# not a heading

\This is not a backslash escape - the escaped character is not a markup character.
```
