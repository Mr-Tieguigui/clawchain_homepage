document.addEventListener('DOMContentLoaded', function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;
  var nav = document.querySelector('.nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var navAnchors = navLinks ? Array.prototype.slice.call(navLinks.querySelectorAll('a[href^="#"]')) : [];
  var themeToggle = document.getElementById('themeToggle');
  var themeLabel = themeToggle ? themeToggle.querySelector('.theme-toggle-label') : null;
  var terminalOutput = document.getElementById('terminalOutput');
  var terminalWrap = document.getElementById('terminalOutputWrap');
  var newline = String.fromCharCode(10);
  var storedTheme = null;

  try {
    storedTheme = window.localStorage.getItem('clawchain-homepage-theme');
  } catch (error) {
    storedTheme = null;
  }

  if (storedTheme === 'light' || storedTheme === 'dark') {
    body.setAttribute('data-theme', storedTheme);
  }

  function syncThemeLabel() {
    if (!themeLabel) {
      return;
    }
    themeLabel.textContent = body.getAttribute('data-theme') === 'light' ? 'Day' : 'Night';
  }

  syncThemeLabel();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var nextTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      body.setAttribute('data-theme', nextTheme);
      syncThemeLabel();
      try {
        window.localStorage.setItem('clawchain-homepage-theme', nextTheme);
      } catch (error) {
        return;
      }
    });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.textContent = open ? '✕' : '☰';
      navToggle.setAttribute('aria-expanded', String(open));
    });

    navAnchors.forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.textContent = '☰';
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (nav) {
    window.addEventListener('scroll', function () {
      nav.style.boxShadow = window.scrollY > 10 ? '0 10px 30px rgba(0,0,0,0.14)' : 'none';
    }, { passive: true });
  }

  if (prefersReducedMotion) {
    Array.prototype.slice.call(document.querySelectorAll('.reveal')).forEach(function (node) {
      node.classList.add('visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting === false) {
            return;
          }
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    Array.prototype.slice.call(document.querySelectorAll('.reveal')).forEach(function (node) {
      revealObserver.observe(node);
    });
  }

  if (navAnchors.length) {
    var sections = navAnchors
      .map(function (link) {
        return document.querySelector(link.getAttribute('href'));
      })
      .filter(Boolean);

    if (sections.length) {
      var sectionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting === false) {
              return;
            }
            var current = '#' + entry.target.id;
            navAnchors.forEach(function (link) {
              link.classList.toggle('active', link.getAttribute('href') === current);
            });
          });
        },
        { threshold: 0.44, rootMargin: '-20% 0px -45% 0px' }
      );

      sections.forEach(function (section) {
        sectionObserver.observe(section);
      });
    }
  }

  var frames = [
    [
      '[09:41:12] discover: live codex session resume:019d2e27-b03f-7963-ba48-44f68d672f26',
      '[09:41:13] route: monitored launcher prepared for local-operator/codex/test333',
      '[09:41:15] service: background runtime ping ok',
      '[09:41:17] policy: destructive_delete risk=restorable target=E:/.../test9',
      '[09:41:18] snapshot: recovery-12a64889e0cd42c4bd53565530ba918c preserved',
      '[09:41:22] restore: target restored from recovery-vault/recovery-snapshots',
      '[09:41:26] proof: clawchain-proof-log.v2 exported',
      '[09:41:29] anchor: evm:31337 confirmed block=9',
      '[09:41:31] verify: session_id=true batch_seq_no=true merkle_root=true'
    ],
    [
      '[10:12:02] discover: live claude session 11c55c0a-00e9-4e35-b413-ecf5e3709c94',
      '[10:12:05] route: managed claude launcher active',
      '[10:12:10] policy: destructive_move detected root=/data/guiyao/openclawchain/Github',
      '[10:12:12] events: invoke_event + policy_decision_event persisted',
      '[10:12:18] restore: move scenario rolled back from snapshot set',
      '[10:12:22] proof: impact_set_id=impact-set-1774595948166',
      '[10:12:26] verify: anchor_lookup_found=true anchor_status=confirmed',
      '[10:12:29] result: monitored recovery path closed'
    ],
    [
      'ClawChain Dangerous-Ops Smoke Test Report',
      'Generated : 2026-03-28 21:29:49',
      'Platform  : windows',
      'Account   : dangerous-ops-windows',
      'Root dir  : C:\\Users\\labpc\\AppData\\Local\\Temp\\clawchain-dangerous-ops-1774704579',
      '[PASS] destructive_delete',
      '[PASS] destructive_move',
      '[PASS] config_integrity_mutation',
      '[PASS] in_place_file_edit',
      '[PASS] destructive_truncate',
      '[PASS] secret_access'
    ],
    [
      '$ python -m clawchain.agent_proxy_cli proof --account local-operator --limit 1',
      'anchor_backend: evm:31337',
      'anchor_mode: evm-anchored',
      'anchor_status: confirmed',
      'impact_sets_count: 3',
      'anchor_receipts_count: 6',
      'recorded_risk_reasons: destructive_delete destructive_move config_integrity_mutation',
      'result: all tests passed'
    ]
  ];

  if (terminalOutput) {
    if (prefersReducedMotion) {
      terminalOutput.textContent = frames[0].join(newline);
    } else {
      var frameIndex = 0;
      var lineDelay = 980;
      var framePause = 4200;

      function renderFrame() {
        var lines = frames[frameIndex];
        terminalOutput.textContent = '';
        var lineIndex = 0;

        function addLine() {
          terminalOutput.textContent += lines[lineIndex] + newline;
          lineIndex += 1;
          if (terminalWrap) {
            terminalWrap.scrollTop = terminalWrap.scrollHeight;
          }
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
    }
  }
});
