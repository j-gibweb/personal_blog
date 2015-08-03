'use strict';

require("bootstrap-webpack");
require("!style!css!sass!./sass/main.scss");

require('./js/react/views/blog.jsx');
require('./js/main-theme.js');
require('./js/jquery.easing.min.js');



// google analytics for whatever reason
// (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
// (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
// m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
// })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
// ga('create', 'UA-58057969-1', 'auto');
// ga('send', 'pageview');