# Alta Bikeshare Map Demo

A simple static single page app that displays an interactive map with location markers generated using an external **GeoJSON** source and collects user info and comments for each location. Built with [Bulma](https://bulma.io/), [jQuery](https://jquery.com/), and [Leaflet](https://leafletjs.com).

Form handling is setup for [Netlify Forms](https://www.netlify.com/docs/form-handling/), which can send email notifications among other things. Each location is referenced by its coordinates for form submission, but this could be modified to use any field associated with the location.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/zanetaylor/alta-map-demo)