# `Kubernetes cluster. Testing Performance and Scalability`

## `General`

This presentation is made with the help of [asciidoctor](https://asciidoctor.org/) and [revealjs](https://docs.asciidoctor.org/reveal.js-converter/latest/).

For creating the presentation from source code custom docker image based on official image [asciidoctor/docker-asciidoctor](https://hub.docker.com/r/asciidoctor/docker-asciidoctor/) was used. 

It is necessary for building [vega](https://vega.github.io/vega/)/[vega-lite](https://vega.github.io/vega-lite/) diagrams.

* [docker-asciidoctor-vega](https://github.com/efrikin/docker-asciidoctor-vega)
* [asciidoctor-vega](https://hub.docker.com/repository/docker/efrikin/asciidoctor-vega)

## `Build`

For creating the presentation the perform following command from directory with source code:

```shell
docker run --rm -v $(pwd):/documents/ efrikin/asciidoctor-vega:latest asciidoctor-revealjs -r asciidoctor-diagram index.adoc
```

## `Installed plugins`

| Name of plugin | Desc          |
| -------------- |:-------------:|
| menu           |               |
| notes-pointer  |               |

## `Hotkeys inside the presentation`

Press button:

* **?**
* **M** and click icon **Keys**

## `Examples`

For replaying the performed tests from the presentation please see [examples](examples/README.md) folder

## Documentations

* [asciidoctor-revealjs](https://docs.asciidoctor.org/reveal.js-converter/latest/)
* [asciidoctor reference](https://asciidoctor.org/docs/asciidoc-syntax-quick-reference/)
* [asciidoctor usermanual](https://asciidoctor.org/docs/user-manual)
* [icons](https://fontawesome.com/icons?d=gallery&m=free)
