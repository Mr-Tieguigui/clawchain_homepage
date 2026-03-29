document.addEventListener("DOMContentLoaded", function () {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  var navAnchors = [];

  if (navLinks) {
    navAnchors = Array.prototype.slice.call(navLinks.querySelectorAll("a"));
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.textContent = open ? "Close" : "Menu";
    });

    navAnchors.forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = "Menu";
      });
    });
  }

  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (prefersReducedMotion) {
    reveals.forEach(function (node) {
      node.classList.add("visible");
    });
  } else if (reveals.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -48px 0px" }
    );

    reveals.forEach(function (node) {
      revealObserver.observe(node);
    });
  }

  var sections = navAnchors
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if (sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          var id = "#" + entry.target.id;
          navAnchors.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === id);
          });
        });
      },
      { threshold: 0.45, rootMargin: "-20% 0px -45% 0px" }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  var terminalOutput = document.getElementById("terminalOutput");
  var newline = String.fromCharCode(10);
  var frames = [
    [
      "[09:41:12] discover: live codex session resume:019d2e27-b03f-7963-ba48-44f68d672f26",
      "[09:41:13] route: monitored launcher prepared for local-operator/codex/test333",
      "[09:41:15] service: background runtime ping ok",
      "[09:41:17] policy: destructive_delete risk=restorable target=E:/.../test9",
      "[09:41:18] snapshot: recovery-12a64889e0cd42c4bd53565530ba918c preserved",
      "[09:41:22] restore: target restored from recovery-vault/recovery-snapshots",
      "[09:41:26] proof: clawchain-proof-log.v2 exported",
      "[09:41:29] anchor: evm:31337 confirmed block=9",
      "[09:41:31] verify: session_id=true batch_seq_no=true merkle_root=true"
    ],
    [
      "[10:12:02] discover: live claude session 11c55c0a-00e9-4e35-b413-ecf5e3709c94",
      "[10:12:05] route: managed claude launcher active",
      "[10:12:10] policy: destructive_move detected root=/data/guiyao/openclawchain/Github",
      "[10:12:12] events: invoke_event + policy_decision_event persisted",
      "[10:12:18] restore: move scenario rolled back from snapshot set",
      "[10:12:22] proof: impact_set_id=impact-set-1774595948166",
      "[10:12:26] verify: anchor_lookup_found=true anchor_status=confirmed",
      "[10:12:29] result: monitored recovery path closed"
    ],
    [
      "ClawChain Dangerous-Ops Smoke Test Report",
      "Generated : 2026-03-28 21:29:49",
      "Platform  : windows",
      "Scenario  : dangerous-ops-windows",
      "[PASS] destructive_delete",
      "[PASS] destructive_move",
      "[PASS] config_integrity_mutation",
      "[PASS] in_place_file_edit",
      "[PASS] destructive_truncate",
      "[PASS] secret_access",
      "[PASS] chain_verify_ok"
    ],
    [
      "$ python -m clawchain.agent_proxy_cli proof --account local-operator --limit 1",
      "format: clawchain-proof-log.v2",
      "anchor_backend: evm:31337",
      "anchor_mode: evm-anchored",
      "anchor_status: confirmed",
      "anchor_lookup_found: true",
      "impact_sets_count: 3",
      "recorded_risk_reasons: destructive_delete destructive_move config_integrity_mutation",
      "result: all tests passed"
    ]
  ];

  if (!terminalOutput) {
    return;
  }

  if (prefersReducedMotion) {
    terminalOutput.textContent = frames[0].join(newline);
    return;
  }

  var frameIndex = 0;
  var lineDelay = 860;
  var framePause = 3600;

  function renderFrame() {
    var lines = frames[frameIndex];
    terminalOutput.textContent = "";
    var lineIndex = 0;

    function addLine() {
      terminalOutput.textContent += lines[lineIndex] + newline;
      lineIndex += 1;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
      if (lineIndex < lines.length) {
        window.setTimeout(addLine, lineDelay);
      } else {
        frameIndex = (frameIndex + 1) % frames.length;
        window.setTimeout(renderFrame, framePause);
      }
    }

    addLine();
  }

  renderFrame();
});
