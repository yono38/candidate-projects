# Overview

Implement and design a single-page application that calculates and displays, given user input, the distance between two airports.

# Requirements

- You are only required to use the following airport codes - JFK, LAX, LAS, PDX
- Use best practice (HTML/CSS/Javascript)
- jQuery is acceptable

# Bonuses

- Mockups - preferrable in PSD format
- Think outside the norm - suprise us!

# Tools provided

You have at your disposal two Javascript functions - `IntentMedia.Distance.distance_between_airports` - which takes two, three letter airport codes as arguments, and `IntentMedia.Distance.airport_exists` which takes one, three letter airport code. 

An example usage of the `distance_between_airports` function is:

```javascript
> IntentMedia.Distance.distance_between_airports("JFK", "LAX")
2475

> IntentMedia.Distance.distance_between_airports("JFK", "NON")
0
```

An example usage of the `airport_exists` function is:

```javascript
> IntentMedia.Distance.airport_exists("JFK")
true

> IntentMedia.Distance.airport_exists("NON")
false
```