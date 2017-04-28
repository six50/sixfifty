---
layout: post
title:  "Error Margins Explained In Three (±1) Minutes"
date:   2017-04-28 18:00:00 +0100
tags: explainer statistics polls cats
intro: How is it possible that an opinion poll claims to know what the whole country thinks just by asking a few hundred people?
excerpt: <em>How is it possible that an opinion poll claims to know what the whole country thinks just by asking a few hundred people?</em> <br><br> Ask a hundred people if they like cats and around 63% will say yes, give or take a few. If you want to be more accurate, you can even say that the number will be between 53 and 73. What if you asked a thousand people? Perhaps you’ll find 530 to 730 <a href="https://www.google.co.uk/search?q=ailurophile&tbm=isch">ailurophiles</a> this time? <br><br> &quot;<em>Wisdom is the daughter of experience</em>&quot;, according to Leonardo da Vinci, and experiencing more responses to our cat question means we can actually make a wiser guess - with a <em>sample size</em> of 1,000 people you should find 600 to 660 of these like cats.
---

__How is it possible that an opinion poll claims to know what the whole country thinks just by asking a few hundred people?__

Ask a hundred people if they like cats and around 63% will say yes, give or take a few[^1]. If you want to be more accurate, you can even say that the number will be between 53 and 73. What if you asked a thousand people? Perhaps you’ll find 530 to 730 [ailurophiles](https://www.google.co.uk/search?q=ailurophile&tbm=isch) this time?

"_Wisdom is the daughter of experience_ ", according to Leonardo da Vinci, and experiencing more responses to our cat question means we can actually make a wiser guess: with a _sample size_ of 1,000 people you should find 600 to 660 of these like cats.


### How This Works

First, some terminology. In the first example above, we guessed that 53 to 73 out of 100 people like cats. As a percentage, this is 53% - 73%, or you could also write this as 63% ± 10%. Here, 63% is our _estimate_ and 10% is our _margin of error_.

Second, a formula. For a sample of size N, the margin of error (as a percentage) is $$ \frac{98}{\sqrt{N}} $$

When we ask 1,000 people, our margin of error is $$ \frac{98}{\sqrt{1000}} $$ = 3%. Combining this with our estimate we get 63% ± 3%, or 600 to 660 people answering yes.

How many people would you need for a 1% margin of error? [Working backwards](https://www.cymath.com/answer.php?q=solve%20N%20%3D%2098%2Fsqrt(M)%20for%20M), $$ N = (\frac{98}{ME})^2 $$, so a 1% error margin gives $$ N = (\frac{98}{1})^2 $$ = 9,604 people.


### This Should Work Most Of The Time

Let’s imagine you roam the country asking strangers on Tinder if they like cats (statistically, it’s an [excellent opening line](http://mashable.com/2016/08/19/best-opening-lines-dating-tinder/#AWeBRvfLrEqY)). Every day you ask 10 strangers, and can expect between 3 and 9 to say yes, but the exact number will change day to day. One day you might get 7, the next day 4, another you might find that all ten people say they like cats.

The formula above calculates a margin of error that's correct 19 times out of 20, or 95% of the time. This number, also called the _95% confidence level_, is baked into the formula so that roughly one day in twenty you'll find below 3 or above 9 ailurophiles in your Tinder survey.

Perhaps a one in twenty chance of being wrong is too uncertain, but one in a hundred might be acceptable? This means using a _99% confidence level_, and the formula becomes $$ \frac{129}{\sqrt{N}} $$ instead. Using this new formula, you’ll find that if you want to conduct your Tinder poll at a 99% confidence level, you can now expect to find between 2 and 10 cat lovers each day.


### When It Doesn’t Work So Well

Some towns are dog towns, some towns are cat towns[^2]. Sometimes people will give the answer they think you want to hear, sometimes people later change their minds and decide [they prefer dinosaurs as pets](http://news.nationalgeographic.com/news/2013/06/130619-pets-poll-animals-united-states-nation-dogs-cats/). These are all examples of _sampling bias_, which we'll cover in a future article.

If you want to try this at home and estimate what percentage of people in your area like cats, you can use the margin of error to do this. If you ask 100 people and 80 say yes, then your estimate is 80% with a 10% margin of error (at a 95% confidence level). In other words, there's a 19 out of 20 chance that the actual percentage is somewhere between 70% to 90%.

 

_There will always be a margin of error in any election poll. This is fine, we can’t poll the whole country, but do remember that the headline figure is not completely accurate. A large sample size will give a smaller margin of error. This can however be gamed by using a lower confidence level, so for reliable results check for both a large sample size and a high confidence level._

---

[^1]: [63% of US adults like cats either “a little” or “a lot”](http://surveys.ap.org/data%5CGfK%5CAP-GfK%20Petside%20Like-Dislike%20Topline%20123009.pdf). Poll conducted Oct 2009 by GfK Roper Public Affairs & Media, involving telephone interviews with 1,967 US adults and has a margin of error of ±2.2%.

[^2]: In Vermont, [50% of households own a cat](http://dogtime.com/trending/17160-us-states-with-most-and-fewest-pet-owners-named), compared with only 25% of households in Utah. Alabama is definitely more of a dog state (44% of households) than a cat state (27% of households).
