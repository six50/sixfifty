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
- **Affiliated with any political party[^1]** – We believe that truly impartial and unbiased sources of information are rare enough.

We are:
<ul class="randomise">
    {% for contributor in site.data.contributors.contributors %}
        <li>
            {{ contributor.name }}
            {% if contributor.twitter %} – <a href="https://twitter.com/{{ contributor.twitter }}">@{{ contributor.twitter }}</a>{% endif %}
            {% if contributor.website %} – <a href="{{ contributor.website }}">{{ contributor.website }}</a>{% endif %}
        </li>
    {% endfor %}
</ul>

If you would like to get involved, just send an email to [contact@sixfifty.org.uk](mailto:contact@sixfifty.org.uk) introducing yourself, or feel free to send any questions to [@SixFiftyData on Twitter](https://twitter.com/SixFiftyData).

---

[^1]: SixFifty is and will remain wholly independent and neutral with respect to all content, analysis and modelling it produces. Individual contributors may be affiliated with specific parties. We would encourage contributions from across the political spectrum, and if you believe our content is in any way biased please do not hesitate to contact us.


[datakind]: http://www.datakind.org/chapters/datakind-uk
