var buildify = require('buildify');
var scripts, styles;

// extract all comments: /<!--[\s\S]*?-->/g
// match anything between two (word)[\s\S]*(word)

buildify('dev')
    .load('index.html')
    .perform(function(content) {
        var i, j, outputFileName,
            comments = content.match(/<!--[\s\S]*?-->/g);

        // for each matching set of comments w/ filename
        for (i = 0; i < comments.length; i+=2) {
            var opening = comments[i],
                closing = comments[i+1];

            var regex = new RegExp('(' + opening + ')[\\s\\S]*' + '(' + closing + ')', 'gi');

            var enclosed = content.match(regex)[0];

            if (enclosed.indexOf('scripts') > -1) {
                console.log('Found a script block!');

                outputFileName = opening.replace('<!-- scripts', '').replace('-->', '').trim();

                var scriptSrc = enclosed.match(/src=\"[\s\S]*?\"/gi);

                var scriptFiles = [];

                for (j = 0; j < scriptSrc.length; j++) {
                    var src = scriptSrc[j].replace('src="', '').replace('"', '');
                    scriptFiles.push(src);
                }

                scripts.push({
                    filename: outputFileName,
                    files: scriptFiles
                });

            } else if (enclosed.indexOf('styles') > -1) {
                console.log('Found a styles block!');

                outputFileName = opening.replace('<!-- styles', '').replace('-->', '').trim();

                var linkHref = enclosed.match(/href=\"[\s\S]*?\"/gi);

                var styleFiles = [];

                for (j = 0; j < linkHref.length; j++) {
                    var href = linkHref[j].replace('href="', '').replace('"', '');
                    styleFiles.push(href);
                }

                styles.push({
                    filename: outputFileName,
                    files: styleFiles
                });
            }
        }

        console.log(scripts);
        console.log(styles);



        for (i = 0; i < scriptStrings.length; i++) {
            var scriptTags = scriptStrings[i].split('</script>');
        }

        for (i = 0; i < scripts.length; i++) {
            scripts[i] = scripts[i].substring(scripts[i].indexOf('"') + 1, scripts[i].lastIndexOf('"'));
        }

        content = content.replace((/(<!-- scripts -->)[\s\S)]*(<!-- \/scripts -->)/mi), '<script src="{{scripts}}"></script>');

        console.log("SCRIPTS FOUND: ");
        console.log(scripts);

        // find all styles
        styles = content.match(/(<!-- styles -->)[\s\S)]*(<!-- \/styles -->)/mi);

        styles = styles[0].split('/>');
        styles = styles.slice(0, styles.length-1);

        for (i = 0; i < styles.length; i++) {
            styles[i] = styles[i].substring(styles[i].indexOf('href="') + 6, styles[i].lastIndexOf('"'));
        }

        console.log("STYLES FOUND: ");
        console.log(styles);

        content = content.replace((/(<!-- styles -->)[\s\S)]*(<!-- \/styles -->)/mi), '<link rel="stylesheet" type="text/css" href="{{stylesheet}}">');

        return content;
    })
    .save('build.html');

buildify('src')
    .load(scripts[0])
    .concat(scripts.slice())
    .uglify()
    .changeDir('../')
    .save('dist/js/techspace-radar.min.js');


buildify('src')
    .load(styles[0])
    .concat(styles.slice(1))
    .cssmin()
    .changeDir('../')
    .save('dist/css/techspace-radar.min.css');


buildify('src')
    .wrap('build.html', {
        scripts: 'js/techspace-radar.min.js',
        stylesheet: 'css/techspace-radar.min.css'
    })
    .changeDir('../')
    .save('dist/index.html');

//regex (<!-- scripts -->)[\s\S)]*(<!-- \/scripts -->)
