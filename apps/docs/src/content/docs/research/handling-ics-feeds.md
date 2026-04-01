---
title: Handling ICS & Calendar Feeds
description: Research on integrating external calendar data into ccpilot.
---


## Open Questions

1. How is the ics feed genereated. It looks like
   https://chasacademy.instructure.com/feeds/calendars/user_useridhere.ics or
something like this. That would be nice because then we could easily generate
the subscription for every new user from their canvas user id.
-> **ANSWER** every course response object as calendar.ics with the feed.

## Tools

[node-ical](https://www.npmjs.com/package/node-ical) - a node parser for ical
and ics feeds. This also has @types included so works nice with our ts setup.


## Readinglist

- [Medium article on processing ics feeds with TS](https://medium.com/@rene_52707/decoding-icalendar-feeds-a-deep-dive-into-a-typescript-event-processor-d1eb1c7c59f2)


