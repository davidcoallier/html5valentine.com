var urlParams = {};
var username;
var trackerId = 'UA-21393158-1';

(function () {
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

    while (e = r.exec(q)) {
       urlParams[0] = d(e[1]);
    }
})();

$(document).ready(function() {
    try {
        if (urlParams[0] !== undefined) {
            username = urlParams[0];
            run();
        } else {
            home();
        }
    } catch (err) {
        try {
            console.log(err);
        } catch (e) {
            /*fail silently*/
        }
    }
});

var error = function() {
    $.ajax({
        url: 'views/error.html',
        dataType: 'html',
        success: function(data) {
            var template = data;
            $('#lovecontent').html(data);
        }
    });
};

var home = function() {
    $.ajax({
        url: 'views/index.html',
        dataType: 'html',
        success: function(data) {
            var template = data;
            $('#lovecontent').html(data);
        }
    });
};

var run = function() {
    names = [];
    var view = {};
   
    if (username.indexOf(',') > -1) {
        // We have polygamists!
        names = username.split(',');

        view.names = names.join(', ');

        $.ajax({
            url: 'views/swingers.html',
            dataType: 'html',
            success: function(data) {
                var template = data;
                var html = Mustache.to_html(template, view);        
                $('#lovecontent').html(html);
            }
        });

        document.title = username + ", I love all of you!";
        
    } else {
        view.name = username;

        $.ajax({
            url: 'views/lovecontent.html',
            dataType: 'html',
            success: function(data) {
                var template = data;
                var html = Mustache.to_html(template, view);
                $('#lovecontent').html(html);
                document.title = username + ", I love you.";
            }
        });
    }

};

if (trackerId) {
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', trackerId]);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
}

$(window).bind('error', error);
