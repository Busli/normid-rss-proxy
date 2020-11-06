# Normið RSS proxy

## About
Where Normið RSS feed is currently hosted it's not possible to add CORS headers so it's not possible to parse via Javascript.  
This is a small ExpressJS server that serves the RSS feed with the correct headers.  
The RSS feed is fetched everyday via cURL.