<p align="center">
  <a href="https://w3.org/wot">
    <img alt="Web of Things Homepage" src="https://www.w3.org/WoT/IG/wiki/images/8/8f/WOT-hz.svg" width="300" />
  </a>
</p>

<p align="center">
  <a href="https://w3c.social/@wot">
    <img alt="Follow on Mastodon" src="https://img.shields.io/mastodon/follow/111609289932468076?domain=https%3A%2F%2Fw3c.social"></a>
  <a href="https://twitter.com/W3C_WoT">
    <img alt="X (formerly Twitter) Follow" src="https://img.shields.io/twitter/follow/W3C_WoT"></a>
  <a href="https://stackoverflow.com/questions/tagged/web-of-things">
    <img alt="Stack Exchange questions" src="https://img.shields.io/stackexchange/stackoverflow/t/web-of-things?style=plastic"></a>
</p>

# Web of Things (WoT) Resources

General information about the Web of Things can be found on https://www.w3.org/WoT/.
  
---

Repository for the resources like ontologies for WoT specifications.
The redirection rules are managed at <https://github.com/w3c/ns>.

## Stable resources:

* [TD v1](td/v1/README.md)
* [TD v1.1](td/v1.1/README.md)
* [Discovery v1](discovery/v1/README.md)

## Unstable resources:

* [TD next](https://github.com/w3c/wot-resources/tree/main/td/next): Note that this only contains the redirection rules and not the resources themselves.

## Testing redirects

A test script verifies that the W3C redirect URLs resolve with the correct content type and that the returned content matches the files in this repository.
Tests run automatically on pull requests and monthly via GitHub Actions.

To run the tests locally:

```bash
node test-redirects.js
```

To also print a full unified diff for any failing content checks and save the local and remote content to files:

```bash
node test-redirects.js --save-diff
```

The diff is printed inline in the terminal output and also saved as a `.diff` file alongside the `.local` and `.remote` content files.
All files are written to `test-diff-output/` and are not tracked by git.
