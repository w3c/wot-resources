// Run with: node test-redirects.js

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const RESOURCES_BASE = "https://w3c.github.io/wot-resources/";

const redirects = [
  // --- td/v1 ---
  {
    from: "https://www.w3.org/2019/wot/td",
    accept: "text/turtle",
    to: "https://w3c.github.io/wot-resources/td/v1.1/ontology/td.ttl",
    contentType: "text/turtle",
  },
  {
    from: "https://www.w3.org/2019/wot/td",
    accept: "text/html",
    to: "https://w3c.github.io/wot-resources/td/v1.1/ontology/td.html",
    contentType: "text/html",
  },
  {
    from: "https://www.w3.org/2019/wot/json-schema",
    accept: "text/turtle",
    to: "https://w3c.github.io/wot-resources/td/v1.1/ontology/jsonschema.ttl",
    contentType: "text/turtle",
  },
  {
    from: "https://www.w3.org/2019/wot/json-schema",
    accept: "text/html",
    to: "https://w3c.github.io/wot-resources/td/v1.1/ontology/jsonschema.html",
    contentType: "text/html",
  },
  {
    from: "https://www.w3.org/2019/wot/security",
    accept: "text/turtle",
    to: "https://w3c.github.io/wot-resources/td/v1.1/ontology/wotsec.ttl",
    contentType: "text/turtle",
  },
  {
    from: "https://www.w3.org/2019/wot/security",
    accept: "text/html",
    to: "https://w3c.github.io/wot-resources/td/v1.1/ontology/wotsec.html",
    contentType: "text/html",
  },
  {
    from: "https://www.w3.org/2019/wot/hypermedia",
    accept: "text/turtle",
    to: "https://w3c.github.io/wot-resources/td/v1.1/ontology/hctl.ttl",
    contentType: "text/turtle",
  },
  {
    from: "https://www.w3.org/2019/wot/hypermedia",
    accept: "text/html",
    to: "https://w3c.github.io/wot-resources/td/v1.1/ontology/hctl.html",
    contentType: "text/html",
  },
  {
    from: "https://www.w3.org/2019/wot/td-schema/v1",
    accept: "application/json",
    to: "https://w3c.github.io/wot-resources/td/v1/validation/td-json-schema-validation.json",
    contentType: "application/json",
  },
  {
    from: "https://www.w3.org/2019/wot/td/v1",
    accept: "application/ld+json",
    to: "https://w3c.github.io/wot-resources/td/v1/context/td-context-1.1.jsonld",
    contentType: "application/ld+json",
  },

  // --- td/v1.1 ---
  {
    from: "https://www.w3.org/2022/wot/td/v1.1",
    accept: "application/ld+json",
    to: "https://w3c.github.io/wot-resources/td/v1.1/context/td-context-1.1.jsonld",
    contentType: "application/ld+json",
  },
  {
    from: "https://www.w3.org/2022/wot/tm",
    accept: "text/turtle",
    to: "https://w3c.github.io/wot-resources/td/v1.1/ontology/tm.ttl",
    contentType: "text/turtle",
  },
  {
    from: "https://www.w3.org/2022/wot/tm",
    accept: "text/html",
    to: "https://w3c.github.io/wot-resources/td/v1.1/ontology/tm.html",
    contentType: "text/html",
  },
  {
    from: "https://www.w3.org/2022/wot/td-schema/v1.1",
    accept: "application/json",
    to: "https://w3c.github.io/wot-resources/td/v1.1/validation/td-json-schema-validation.json",
    contentType: "application/json",
  },
  {
    from: "https://www.w3.org/2022/wot/tm-schema/v1.1",
    accept: "application/json",
    to: "https://w3c.github.io/wot-resources/td/v1.1/validation/tm-json-schema-validation.json",
    contentType: "application/json",
  },

  // --- td/next ---
  {
    from: "https://www.w3.org/ns/wot-next/td",
    accept: "application/ld+json",
    to: "https://w3c.github.io/wot-thing-description/context/td-context-1.1.jsonld",
    contentType: "application/ld+json",
  },
  {
    from: "https://www.w3.org/ns/wot-next/tm-ontology",
    accept: "text/turtle",
    to: "https://w3c.github.io/wot-thing-description/ontology/tm.ttl",
    contentType: "text/turtle",
  },
  {
    from: "https://www.w3.org/ns/wot-next/tm-ontology",
    accept: "text/html",
    to: "https://w3c.github.io/wot-thing-description/ontology/tm.html",
    contentType: "text/html",
  },
  {
    from: "https://www.w3.org/ns/wot-next/td-ontology",
    accept: "text/turtle",
    to: "https://w3c.github.io/wot-thing-description/ontology/td.ttl",
    contentType: "text/turtle",
  },
  {
    from: "https://www.w3.org/ns/wot-next/td-ontology",
    accept: "text/html",
    to: "https://w3c.github.io/wot-thing-description/ontology/td.html",
    contentType: "text/html",
  },
  {
    from: "https://www.w3.org/ns/wot-next/json-schema-ontology",
    accept: "text/turtle",
    to: "https://w3c.github.io/wot-thing-description/ontology/jsonschema.ttl",
    contentType: "text/turtle",
  },
  {
    from: "https://www.w3.org/ns/wot-next/json-schema-ontology",
    accept: "text/html",
    to: "https://w3c.github.io/wot-thing-description/ontology/jsonschema.html",
    contentType: "text/html",
  },
  {
    from: "https://www.w3.org/ns/wot-next/security-ontology",
    accept: "text/turtle",
    to: "https://w3c.github.io/wot-thing-description/ontology/wotsec.ttl",
    contentType: "text/turtle",
  },
  {
    from: "https://www.w3.org/ns/wot-next/security-ontology",
    accept: "text/html",
    to: "https://w3c.github.io/wot-thing-description/ontology/wotsec.html",
    contentType: "text/html",
  },
  {
    from: "https://www.w3.org/ns/wot-next/hypermedia-ontology",
    accept: "text/turtle",
    to: "https://w3c.github.io/wot-thing-description/ontology/hctl.ttl",
    contentType: "text/turtle",
  },
  {
    from: "https://www.w3.org/ns/wot-next/hypermedia-ontology",
    accept: "text/html",
    to: "https://w3c.github.io/wot-thing-description/ontology/hctl.html",
    contentType: "text/html",
  },
  {
    from: "https://www.w3.org/ns/wot-next/td-schema",
    accept: "application/json",
    to: "https://w3c.github.io/wot-thing-description/validation/td-json-schema-validation.json",
    contentType: "application/json",
  },
  {
    from: "https://www.w3.org/ns/wot-next/tm-schema",
    accept: "application/json",
    to: "https://w3c.github.io/wot-thing-description/validation/tm-json-schema-validation.json",
    contentType: "application/json",
  },

  // --- discovery/v1 ---
  {
    from: "https://www.w3.org/2022/wot/discovery",
    accept: "application/ld+json",
    to: "https://w3c.github.io/wot-resources/discovery/v1/context/discovery-core.jsonld",
    contentType: "application/ld+json",
  },
  {
    from: "https://www.w3.org/2022/wot/discovery-did",
    accept: "application/ld+json",
    to: "https://w3c.github.io/wot-resources/discovery/v1/context/discovery-did.jsonld",
    contentType: "application/ld+json",
  },
  {
    from: "https://www.w3.org/2022/wot/discovery-ontology",
    accept: "text/turtle",
    to: "https://w3c.github.io/wot-resources/discovery/v1/ontology/discovery-ontology.ttl",
    contentType: "text/turtle",
  },
  {
    from: "https://www.w3.org/2022/wot/discovery-ontology",
    accept: "text/html",
    to: "https://w3c.github.io/wot-resources/discovery/v1/ontology/discovery-ontology.html",
    contentType: "text/html",
  },
  {
    from: "https://www.w3.org/2022/wot/discovery/model/directory",
    accept: "application/tm+json",
    to: "https://w3c.github.io/wot-resources/discovery/v1/model/directory.tm.jsonld",
    contentType: "application/tm+json",
  },
  {
    from: "https://www.w3.org/2022/wot/discovery/validation/td-discovery-extensions-json-schema",
    accept: "application/json",
    to: "https://w3c.github.io/wot-resources/discovery/v1/validation/td-discovery-extensions-json-schema.json",
    contentType: "application/json",
  },
];

// Extracts the MIME type from a Content-Type header, ignoring parameters like "; charset=utf-8".
function baseMime(contentTypeHeader) {
  return (contentTypeHeader ?? "").split(";")[0].trim().toLowerCase();
}

const DIFF_DIR = path.join(__dirname, "test-diff-output");

// Turns a URL + accept type into a safe filename prefix, e.g.
// "https://www.w3.org/2022/wot/tm" + "text/turtle" → "www.w3.org_2022_wot_tm_text_turtle"
function diffFileName(url, accept) {
  return (url + "_" + accept).replace(/https?:\/\//, "").replace(/[^a-zA-Z0-9]+/g, "_");
}

// For resources hosted in this repo, also verify the response body matches
// the local file. Skipped for wot-next, which redirects to the TD repo and is not meant to be stable anyways.
async function testRedirect({ from, accept, to, contentType }, saveDiff) {
  // Send the W3C URL with the expected Accept header and follow all redirects.
  const response = await fetch(from, {
    headers: { Accept: accept },
    redirect: "follow",
  });

  // Check that the final response has the correct MIME type.
  const actualMime = baseMime(response.headers.get("content-type"));
  const expectedMime = baseMime(contentType);
  const mimePass = actualMime === expectedMime;

  let contentPass = true;
  let firstDiff = null;
  let diffFiles = null;
  if (to.startsWith(RESOURCES_BASE)) {
    const localPath = path.join(__dirname, to.slice(RESOURCES_BASE.length));
    const localContent = fs.readFileSync(localPath, "utf8").trim();
    const remoteContent = (await response.text()).trim();
    const localLines = localContent.split("\n");
    const remoteLines = remoteContent.split("\n");
    const diffIndex = localLines.findIndex((line, i) => line !== remoteLines[i]);
    if (diffIndex !== -1) {
      contentPass = false;
      firstDiff = {
        line: diffIndex + 1,
        local: localLines[diffIndex],
        remote: remoteLines[diffIndex] ?? "(line missing)",
      };
    } else if (localLines.length !== remoteLines.length) {
      // All overlapping lines match but one has more lines than the other.
      contentPass = false;
      firstDiff = {
        line: Math.min(localLines.length, remoteLines.length) + 1,
        local: localLines[remoteLines.length] ?? "(line missing)",
        remote: remoteLines[localLines.length] ?? "(line missing)",
      };
    }

    if (!contentPass && saveDiff) {
      fs.mkdirSync(DIFF_DIR, { recursive: true });
      const base = path.join(DIFF_DIR, diffFileName(from, accept));
      fs.writeFileSync(base + ".local", localContent, "utf8");
      fs.writeFileSync(base + ".remote", remoteContent, "utf8");
      const result = spawnSync("diff", ["-u", base + ".local", base + ".remote"], { encoding: "utf8" });
      fs.writeFileSync(base + ".diff", result.stdout, "utf8");
      diffFiles = { local: base + ".local", remote: base + ".remote", diff: base + ".diff", output: result.stdout };
    }
  }

  return { pass: mimePass && contentPass, mimePass, contentPass, firstDiff, diffFiles, from, accept, expectedMime, actualMime };
}

async function main() {
  const saveDiff = process.argv.includes("--save-diff");
  console.log(`Running ${redirects.length} redirect tests...\n`);

  const results = await Promise.all(redirects.map((r) => testRedirect(r, saveDiff)));

  let passed = 0;
  let failed = 0;

  for (const r of results) {
    if (r.pass) {
      console.log(`  PASS  ${r.from}  [${r.accept}]`);
      passed++;
    } else {
      console.log(`  FAIL  ${r.from}  [${r.accept}]`);
      if (!r.mimePass) {
        console.log(`        mime expected: ${r.expectedMime}`);
        console.log(`        mime actual:   ${r.actualMime}`);
      }
      if (!r.contentPass) {
        console.log(`        content does not match local file (first diff at line ${r.firstDiff.line})`);
        console.log(`        local:  ${r.firstDiff.local}`);
        console.log(`        remote: ${r.firstDiff.remote}`);
        if (r.diffFiles) {
          console.log(r.diffFiles.output);
          console.log(`        diff saved to: ${r.diffFiles.diff}`);
        }
      }
      failed++;
    }
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
