---
layout: page
title: About
permalink: /about
---

When Theresa May announced plans on April 18th for the UK to hold a general election it was met with much cynicism.

However as self-confessed psephologists, we instead were thrilled at the opportunity. There would be political polls aplenty, a discharge of demographic datasets, suspicious statistics being slung around without sensible scrutiny, and fundamentally flawed forecasts being flung into the fray of frenetic factionalism.

<blockquote class="twitter-tweet" data-cards="hidden" data-lang="en-gb"><p lang="en" dir="ltr">Looking for political and/or <a href="https://twitter.com/hashtag/data?src=hash">#data</a> geeks to collaborate on a <a href="https://twitter.com/FiveThirtyEight">@FiveThirtyEight</a> inspired project on the <a href="https://twitter.com/hashtag/UK?src=hash">#UK</a> <a href="https://twitter.com/hashtag/GeneralElection?src=hash">#GeneralElection</a>, DM if interested <a href="https://t.co/1ZH1tVAZTu">pic.twitter.com/1ZH1tVAZTu</a></p>&mdash; John Sandall (@John_Sandall) <a href="https://twitter.com/John_Sandall/status/854286620064976896">18 April 2017</a></blockquote>

Starting with just this tweet we've spawned a team of data scientists, software engineers, and experienced political operatives who want to bring transparency to the data surrounding this next election.

We are not:

- **Paid** – All contributors do so voluntarily.
- **Funded** – We're the kind of people who would happily [spend our free time using our skills for good][datakind].
- **Affiliated with any political party** – We believe that truly impartial and unbiased sources of information are rare enough.

We are:
{% for contributor in site.data.contributors.contributors %}
- {{ contributor.name }}{% if contributor.twitter %} – [@{{ contributor.twitter }}](https://twitter.com/{{ contributor.twitter }}){% endif %}{% if contributor.website %} – <{{ contributor.website }}>{% endif %}
{% endfor %}

If you would like to get involved, just send an email to [contact@sixfifty.org.uk](mailto:contact@sixfifty.org.uk) introducing yourself, or feel free to send any questions to [@SixFiftyData on Twitter](https://twitter.com/SixFiftyData).


[datakind]: http://www.datakind.org/chapters/datakind-uk
