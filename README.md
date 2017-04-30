<img src="images/logo.png" alt="SixFifty" width="100px">

# SixFifty

We're a team of data scientists, engineers and political experts, dedicated to bringing a rigorous, data-oriented, and impartial view to the 2017 UK general election.

- - -

### About this Repository

This repository is a Jekyll site hosted on GitHub Pages. This gives us a framework into which we can create front-end applications and publish blog posts.

A suggested architecture is that we create data pipeline code in a subdirectory such as `pipeline`, and that this would target Jekyll's `_data` directory as its output location. Data files (JSON, YAML, CSV) in that output directory are available during templating when generating the static site.

Blog posts can be written in the `posts` directory and will be included in the generated static site. They support GitHub-flavoured Markdown.

### Development

Local changes to the site HTML and/or blog posts can be previewed using Jekyll's built-in development server:

```shell
bundle exec jekyll serve --baseurl=''
```

Changes to Javascript components used for visualisations can be previewed by running the Jekyll server as above, and by instructing Webpack to watch and update the Javascript bundle as you edit:

```shell
npm run dev
```

Note: The development build output should not be committed, a fresh `npm run build` which compiles a more optimised version for production should be committed – see deployment instructions below.

### Deployment

Currently deployment is two-stage. The first stage is to build the front-end with `npm run build`, this will output a JS file to the site build directory, this should be committed. The second stage, which is handled by GitHub, is running the Jekyll build which will add the rest of the files to the site build directory and serve it.
