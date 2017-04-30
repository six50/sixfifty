---
layout: post
title:  "How Polling Works (And Why It’s Difficult To Do Right)"
date:   2017-04-29 19:00:00 +0100
author: dan-howarth
tags:   explainer statistics polls politics
intro:  Elections mean many things – campaign rallies, manifestos, a debate about whether there will be a debate, and, of course, polls.
excerpt: <em>"Not everything that counts can be counted, and not everything that can be counted counts."</em> <br><br> Elections mean many things – campaign rallies, manifestos, a debate about whether there will be a debate, and, of course, polls. <br><br> Polls generate daily headlines in an election – even, or especially, when they <a href="http://www.bbc.co.uk/news/blogs-the-papers-39682374">contradict each other</a>. Despite failing to accurately predict the result of either the 2015 general election or the Brexit referendum, a new poll can still be front page news. Public trust in opinion polls has plummeted, with one survey finding that <a href="https://www.nationaljournal.com/s/71424/poll-americans-dont-trust-polls">75% of adults don’t trust surveys.</a> <br><br> So, how does polling work? Why is it so difficult to get right in the UK? Our goal is to explain enough essentials to get you through most conversations on election polling, as well as enabling you to cast a critical eye on the headlines that polls generate between now and the election.
---

_"Not everything that counts can be counted, and not everything that can be counted counts."_  [^1]

Elections mean many things – campaign rallies, manifestos, a debate about whether there will be a debate, and, of course, polls.
 
Polls generate daily headlines in an election – even, or especially, when they [contradict each other](http://www.bbc.co.uk/news/blogs-the-papers-39682374). Despite failing to accurately predict the result of either the 2015 general election or the Brexit referendum, a new poll can still be front page news. Public trust in opinion polls has plummeted, with one survey finding that 75% of adults don’t trust surveys[^2].

So, how does polling work? Why is it so difficult to get right in the UK? Our goal is to explain enough essentials to get you through most conversations on election polling, as well as enabling you to cast a critical eye on the headlines that polls generate between now and the election.


### How does polling work?
 
1. Polling works because the views of a large enough group of people is very likely to reflect the views of the overall population, as long as polling companies select those people at random.

2. Polling companies know that a poll from a small group of people won’t exactly match the views of the larger population. When publishing results they allow for some wiggle room by stating something called the _margin of error_. This is a number that reflects to what extent their published answer might not be accurate – read our [explainer article](http://sixfifty.org.uk/2017/04/28/error-margins/) for more. Every poll should state both the _sample size_ (total people who responded) and the margin of error.

3. There is always a chance that any given poll will be wrong, even accounting for the margin of error. Sometimes the randomly picked group of people doesn’t represent the population at all. Typically, one in 20 polls conducted will be wrong in this way[^3] – but having a large number of polls from different companies, as we do at election time, reduces the likelihood of a single rogue poll being taken too seriously.
 
Under laboratory conditions, the science of polling is as accurate and predictable as the laws of gravity. When polls are wrong, however, there’s a good chance that either the group of people questioned was not large enough, or was not representative enough.
 

### Is polling in the UK harder than in other countries?
 
The short answer is, yes. Even [Nate Silver finds it a challenge](https://fivethirtyeight.com/datalab/what-we-got-wrong-in-our-2015-uk-general-election-model/). The main reason is that it is complex and costly for polling companies to question a truly random selection of the population. Consider some of the reasons for this:
 
1. The general election is a not really national poll, but six hundred and fifty contests for each constituency. Each constituency will have its own population mix and local issues that could influence the way people will vote. Polling companies tend to select people to reflect the national population as a whole, which means their results cannot be applied evenly to all constituency races.

2. In each constituency, there are multiple parties competing in a [First Past The Post](https://www.youtube.com/watch?v=s7tWHJfhiyo) race, all campaigning to draw votes away from each other. This makes it even harder for polling companies to translate a national poll finding to a local result.

3. Pollsters also have to contend with other issues, such as tactical voting (meaning that a voter may not vote with their preferred party) and factors such as the [Shy Tory Effect](https://en.wikipedia.org/wiki/Shy_Tory_Factor) (meaning that those polled might not reveal their true intentions). 
 
By contrast, US Presidential elections are much easier to predict (though [not without their difficulties](http://fivethirtyeight.com/features/election-update-why-our-model-is-more-bullish-than-others-on-trump/)). Polls are taken in all of the fifty states, and each contest is normally between two candidates only. Contrary to popular belief, Trump’s victory was actually within the predicted margin of error of the polls. The surprise was more a [failure of journalism](http://www.realclearpolitics.com/articles/2016/11/12/it_wasnt_the_polls_that_missed_it_was_the_pundits_132333.html) than of polling.
 

### What else do polling companies need to consider?
 
There are some other factors that affect all polls, not just those in the UK:
 
1. Polling companies have to be careful not to accidentally favour certain demographic groups. There is a [classic example of this](https://www.wsj.com/articles/SB115974322285279370) - in 1936 the highly respected Literary Digest magazine conducted a hugely expensive poll of 2.4 million people and confidently claimed that Alfred Landon would win the upcoming US Presidential election. The winner was Franklin Delano Roosevelt with a landslide victory. The magazine’s problem was that it primarily polled two groups of people: Literary Digest readers and telephone owners. In short: they got it wrong because they only asked the wealthiest 25% of society who they would vote for.

2. External events, such as a war, terrorist attack or [last minute unexpected events](http://www.newsweek.com/2017/04/21/fbi-director-james-comey-clinton-emails-583247.html) can cause voter sentiment to change, and quickly, in ways that polling companies cannot account for before these events happen.

3. Some polling methods work better than others. Randomly calling landline phones is cheap, but then the group polled will consist entirely of people that own a landline phone and are inclined to answer calls from an unknown number. Conducting interviews on the street can be more random (depending on when and how the interviews are conducted) but they are expensive and time consuming.

4. The questions a polling company asks can have a large impact on how people respond, even if the [questions appear to be almost identical](https://fivethirtyeight.com/features/how-our-uk-election-forecasting-model-works/)! Asking a general question like “_How would you vote if the general election was tomorrow?_” elicits a very different response compared with “_In your constituency, which party’s candidate will you vote for?_” This means that pollsters have to choose which answers they think are more representative. Getting this wrong can impact the poll’s predictive accuracy.

Polling companies must therefore think very hard about how to make their selection random enough to ensure a poll is valid, yet also cost effective. These are issues unlikely to go away anytime soon, but in the meantime we hope you are better informed about how polls work and the unique variety of challenges pollsters in the UK face in getting them right.

 

_The shortcomings of polls discussed here is one reason why we at SixFifty are looking at other ways to forecast election results. We hope to do this by combining polling results with other open data sources, and by applying cutting edge data science and machine learning techniques._
 
_There will be more blogs to explain what we are doing, and more importantly, what results we think are likely, so please stay in touch._

--- 

[^1]: This [source of this quote is unknown](http://quoteinvestigator.com/2010/05/26/everything-counts-einstein/). It is commonly attributed to Einstein, although the evidence for this is weak. Regardless of where it came from, it’s a superb aphorism.

[^2]: A [2013 phone survey of 1,011 American adults](https://www.nationaljournal.com/s/71424/poll-americans-dont-trust-polls) found that 75% of respondents "believe that most polls you hear about...are biased toward a particular point of view".

[^3]: Polls are typically conducted to a "_95% confidence level_", meaning that they are correct, to within the stated margin of error, 19 times out of 20. Read our article, "_[Error Margins Explained In Three (±1) Minutes](http://sixfifty.org.uk/2017/04/28/error-margins/)_", for more on this.

