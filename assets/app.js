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
          if (entry.isIntersecting === false) {
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
          if (entry.isIntersecting === false) {
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
      "$ bash ../ClawChain/setup_clawchain.sh 8888",
      "[ok] service-start",
      "[ok] ui available at http://127.0.0.1:8888",
      "[ok] chain bootstrap: evm:31337"
    ],
    [
      "> Join Monitor",
      "[policy] destructive_delete captured",
      "[restore] target restored from snapshot vault",
      "[proof] manifest exported"
    ],
    [
      "[PASS] destructive_delete",
      "[PASS] destructive_move",
      "[PASS] config_integrity_mutation",
      "[PASS] secret_access"
    ],
    [
      "[verify] invoke_events_ok",
      "[verify] anchor_receipts_ok",
      "[verify] chain_verify_ok",
      "[result] ALL TESTS PASSED"
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

  function renderFrame() {
    var lines = frames[frameIndex];
    terminalOutput.textContent = "";
    var lineIndex = 0;

    function addLine() {
      terminalOutput.textContent += lines[lineIndex] + newline;
      lineIndex += 1;
      if (lineIndex < lines.length) {
        setTimeout(addLine, 420);
      } else {
        frameIndex = (frameIndex + 1) % frames.length;
        setTimeout(renderFrame, 1600);
      }
    }

    addLine();
  }

  renderFrame();
});
