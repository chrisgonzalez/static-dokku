# Static Dokku Template

## Setup

1. Make sure you have SASS installed, or just ignore it if you're a purist ;)
2. Run 'npm install'
3. Add your Dokku remote-
$: git remote add SOMENAME dokku@someserver.com:SUBDOMAIN

## Instructions:

1. Run the local server and sass watchers via 'npm run local' and 'npm run sass', respectively
2. Design something awesome
3. Check it on your machine at localhost:5000
6. Push to the remote!
$: git push SOMENAME master
7. Success! Internet!!

## Details:

All working source files will live in src/  

All design files, or static assets can live anywhere else.  

## Build Steps (if you're deploying a static site/page thing)

1. Wrap all style tags you'd like minified in comments of this structure:  
<pre><code>
&lt;!-- styles /finaldirectory/filename.min.css --&gt;  
    &lt;link rel="stylesheet" href="mystyles1.css" /&gt;  
    &lt;link rel="stylesheet" href="mystyles2.css" /&gt;  
&lt;!-- /styles /finaldirectory/filename.min.css --&gt;  
</pre></code>

2. Wrap all script tags you'd like minified in comments of this structure:  
<pre><code>
&lt;!-- styles /finaldirectory/filename.min.js --&gt;  
    &lt;script src="js/myfile1.js"&gt;&lt;/script&gt;  
    &lt;script src="js/myfile2.js"&gt;&lt;/script&gt;  
&lt;!-- /styles /finaldirectory/filename.min.js --&gt;  
</pre></code>

3. If you need to copy any directories (images, data, etc), add commands like 'cp -r src/images dist/images;' to the end of the build script
in package.json, where src/images is your working directory, and dist/images is the production directory.

4. Run 'npm run build' in your console and you'll get a magically modified html file with all your scripts and styles minified.
You can use as many of these comment blocks as you'd like, just make sure to specify a unique filename in the opening and closing
comments.
