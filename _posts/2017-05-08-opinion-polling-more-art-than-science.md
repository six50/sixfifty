---
layout:  post
title:   Why Opinion Polling Is More Art Than Science
date:    2017-05-08 07:00:00 +0100
tags:    explainer polls sampling cats
authors: justin-ibbett,dan-howarth,john-sandall
intro:   In this post, we will dig a little deeper into the strange world of opinion polls. Finding a representative sample of people to answer your questions can make the difference between a poll being spot on or wildly inaccurate.
excerpt: <em>"The problem is that when the polls are wrong, they tend to be wrong in the same direction." – Nate Silver</em><br><br> In this post, we will dig a little deeper into the strange world of opinion polls. One of the challenges mentioned in our <a href="https://sixfifty.org.uk/2017/04/29/how-polling-works/">first article about polling</a> was the <strong>difficulty of randomly finding a group of people whose views reflect the overall population</strong>. To use polling terminology, finding a <em>representative sample</em> of people to answer your questions can make the difference between a poll being spot on or wildly inaccurate.<br><br>This blog looks at two techniques that pollsters deploy to find a representative sample, <em>random dialing</em> and <em>panels</em>. It also looks at how the use of something called <em>weighting</em> can be applied to poll results to make them more representative.
---

_"The problem is that when the polls are wrong, they tend to be wrong in the same direction." — Nate Silver_ [^1]<br><br>


In this post, we will dig a little deeper into the strange world of opinion polls. One of the challenges mentioned in our [first article about polling](https://sixfifty.org.uk/2017/04/29/how-polling-works/) was the **difficulty of randomly finding a group of people whose views reflect the overall population**. To use polling terminology, finding a _representative sample_ of people to answer your questions can make the difference between a poll being spot on or wildly inaccurate. 

This blog looks at two techniques that pollsters deploy to find a representative sample, _random dialing_ and _panels_. It also looks at how the use of something called _weighting_ can be applied to poll results to make them more representative. 


### Finding a representative sample  

Not all people respond alike to being polled. Take _random dialing_, which involves call centres using software to **randomly dial phone numbers during working hours**. The aim is to find a group of people that is representative of the whole population with a balanced mix across gender, age, ethnicity and viewpoints.

However, it can sometimes take a lot longer to reach representatives of certain demographic groups. During the US Presidential election, [one firm reported](https://www.linkedin.com/pulse/pollsters-scramble-fewer-people-take-phone-calls-wjs-bill-conaway) that it took 10 calls to find a woman over 65 but it took 300 calls to find one young Hispanic male willing to answer questions. **The kind of people who would answer their landline phone on a Tuesday afternoon may not be representative of the wider voting population.**

Pollsters could simply keep dialing until they find enough people to fill their sample, but this is expensive. In reality, they accept that their sample’s demographic mix will never be quite right and do their best to correct for it.


### Weighting _should_ make polls more representative

One way of doing this is to adjust or _weight_ the survey responses to match the demographic profile of the voting population. For example, imagine a survey asks 200 dogs and 100 cats the same question: "_Are you a dog?_". The results (assuming [no animals are confused on the matter](https://www.youtube.com/watch?v=aP3gzee1cps)) would suggest that two out of three animals is a dog. Given that in reality there are just as many pet cats as pet dogs[^2], one can adjust the numbers by giving the cats’ responses double weighting, bringing the average response to a more accurate "50% of animals think they are dogs". This same technique is used by pollsters to **adjust their survey responses to more closely match the overall population**.

**Weighting samples correctly is hard.** All it took for one US poll to conclude that Trump had double digit support among black voters was a [single 19-year-old black man from Illinois](https://www.nytimes.com/2016/10/13/upshot/how-one-19-year-old-illinois-man-is-distorting-national-polling-averages.html). Although the survey had a sample size of 3,000 people, this man was weighted 30 times more than the average respondent, and as much as 300 times more than the least-weighted respondent, purely on the basis that he was a member of a hard-to-reach demographic. The result was clearly a flawed prediction.

Every polling company has to decide which factors to weight on. Gender? Age? Education? Political or social attitudes? It’s a tricky question, and it’s not possible to truly say if one approach is better than another. Furthermore, trying to ensure that a survey is representative of attitudes, such as weighting on which way respondents voted in the EU Referendum, is made harder by those attitudes changing over time.


### Unknown unknowns 

Another approach is to use _panels_, which are composed of **members of the public assembled and screened by pollsters** to represent the broader population. However, panels can be impacted by _self-selection bias_. The fact that panellists volunteer to spend time taking surveys can make them unrepresentative of a broader population. There may also be unknown biases when selecting a sample to complete a survey, as people may be selected for their demographic attributes and not their views.

The problem is compounded by the industry structure of polling. Although there are many great market research agencies, there are only a few companies that own a panel. Many of the names you read in the papers may not actually run the panel where they get their data from. If the panelists themselves are members of multiple panels at the same time, this could potentially result in bias that can cascade through the industry.


### Polling is imperfect yet still pivotal

Despite these difficulties, **surveys fulfil a crucial role in our society**. They are critical for governments and businesses when it comes to understanding public opinion. Insight comes not only from knowing _how many_ people think XYZ, but also in understanding _why_ they think XYZ. By directly asking voters, surveys can answer questions that even Big Data can’t touch.

Technology has a big role to play in improving polling. New companies are now reaching people beyond panels by finding individuals across different websites and inviting them to participate in a survey, although such companies are still in their infancy. Equally, data science and newer statistical techniques can help to provide predictions from smaller sample sizes that are both more accurate and more granular.

The future of polling will likely see **technological advancements minimising the statistical flaws** of the current polling industry, whilst diving deeper into the data behind the headline numbers in order to understand what drives us.

---

[^1]: This quote by Nate Silver is taken from a January 2017 article for _[FiveThirtyEight](https://fivethirtyeight.com/)_ titled _[Can You Trust Trump's Approval Rating Polls?](https://fivethirtyeight.com/features/can-you-trust-polling-in-the-age-of-trump/)_, which also happens to be a terrific exploration into the myriad of ways that polling data can lead you astray.

[^2]: The American Vetinary Association's [2012 US Pet Ownership & Demographics Sourcebook](https://www.avma.org/KB/Resources/Statistics/Pages/Market-research-statistics-US-pet-ownership.aspx) states that 36.5% of households own an average of 1.6 dogs, and 30.4% of households own an average of 2.1 cats per household. Whilst there may be more dog-households than cat-households on average, there are just over 6% more pet cats overall, which is close enough to equal numbers for the purposes of this article.

