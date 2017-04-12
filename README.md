[![Build Status](https://travis-ci.org/rdalin82/CTABus.svg?branch=master)](https://travis-ci.org/rdalin82/CTABus)


Web app for tracking CTA bus location and Clumping https://rdalin-cta.herokuapp.com/

This application was developed with CTA API, Google Maps API, Sinatra, Bootstrap, React and the Flux pattern.

The main part of the application is a single page application which allows users to look up bus routes and
their destinations to find the positions of the bus on a map relative to themselves.  Originally this application
was designed without React/Flux and was dependent on a user flow that forced the user to go to /route when selecting routes and route/destination when selecting a route destination combination which would generate a map.  This UI was clunky and prevented the user from being able to select multiple end locations of buses which could be traveling the same direction.

By using React/Flux the application was changed into single page application, which provided more flexibility, it also made the user interaction less clunky.

## Dependencies
* Ruby 2.2.1
* Sinatra 1.4.7
* React/Flux
* Bootstrap
* CTA public API
* Google Maps API

### Gems (not exhaustive list)
* Nokogiri
* geo-distance
* json


## To Run:
 * git clone
 * bundle install
 * npm
 * webpack
 * rackup

## To run tests:
  * rake test
