### Six50

This repository is a Jekyll site hosted on GitHub Pages. This gives us a framework into which we can create front-end applications and publish blog posts.

A suggested architecture is that we create data pipeline code in a subdirectory such as `pipeline`, and that this would target Jekyll's `_data` directory as its output location. Data files (JSON, YAML, CSV) in that output directory are available during templating when generating the static site.

Blog posts can be written in the `posts` directory and will be included in the generated static site. They support GitHub-flavoured Markdown.
