README.txt

1.All aspects of the work have been correctly implemented

2. Much help from Ming in class on 10/20

3. Before completely understanding XMLHttpRequests, took about 2 hours researching/struggling. After, about 1.5 hours stumbling with asynchronous functions/bugs.

Part 2: Replacing data.json with http://messagehub.herokuapp.com/messages.json in my lab.js works.

Is it possible to request the data from a different origin (e.g., http://messagehub.herokuapp.com/) or from your local machine (from file:///) from using XMLHttpRequest? Why or why not?

- Yes, it is possible. Based on the readings provided, I found out that modern browsers use Cross-Origin Resource Sharing (CORS). Specifically, these modern browsers use CORS for the XMLHttpRequest API. CORS lets the web server control cross-domain access, including requesting data from a different source.  If we tried using another type of request API, it may not be allowed. In addition to XMLHttpRequest API, CORS enables cross-site HTTP requests for Web Fonts, WebGL textures (unsure what those are), and images drawn to a canvas using drawImage (hey duckhunt lab).