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

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
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
      nav.style.boxShadow = window.scrollY > 10 ? '0 14px 38px rgba(0,0,0,0.14)' : 'none';
    }, { passive: true });
  }

  if (prefersReducedMotion) {
    Array.prototype.slice.call(document.querySelectorAll('.reveal')).forEach(function (node) {
      node.classList.add('visible');
    });
  } else if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
    );

    Array.prototype.slice.call(document.querySelectorAll('.reveal')).forEach(function (node) {
      revealObserver.observe(node);
    });
  } else {
    Array.prototype.slice.call(document.querySelectorAll('.reveal')).forEach(function (node) {
      node.classList.add('visible');
    });
  }

  if (navAnchors.length && 'IntersectionObserver' in window) {
    var sections = navAnchors
      .map(function (link) {
        return document.querySelector(link.getAttribute('href'));
      })
      .filter(Boolean);

    if (sections.length) {
      var sectionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }
            var current = '#' + entry.target.id;
            navAnchors.forEach(function (link) {
              link.classList.toggle('active', link.getAttribute('href') === current);
            });
          });
        },
        { threshold: 0.42, rootMargin: '-18% 0px -45% 0px' }
      );

      sections.forEach(function (section) {
        sectionObserver.observe(section);
      });
    }
  }

  var frames = [
    {
      title: 'Codex / monitored restore',
      tag: 'validated path',
      lines: [
        { stamp: '09:41:12', kind: 'meta', badge: 'discover', text: 'resume:019d2e27-b03f-7963-ba48-44f68d672f26 detected in test7 workspace' },
        { stamp: '09:41:14', kind: 'meta', badge: 'route', text: 'launcher routed into local-operator/codex/test333' },
        { stamp: '09:41:17', kind: 'danger', badge: 'policy', text: 'destructive_delete raised against E:/.../test9 · class=restorable' },
        { stamp: '09:41:18', kind: 'ok', badge: 'snapshot', text: 'snapshot preserved into recovery-vault/recovery-snapshots' },
        { kind: 'rule' },
        { stamp: '09:41:22', kind: 'ok', badge: 'restore', text: 'target restored from vault and verified' },
        { stamp: '09:41:26', kind: 'proof', badge: 'proof', text: 'proof exported with batch_seq_no=0 · merkle_root=d5bb8d64...' },
        { stamp: '09:41:29', kind: 'proof', badge: 'anchor', text: 'evm:31337 confirmed at block=9 · anchor_lookup_found=true' },
        { stamp: '09:41:31', kind: 'proof', badge: 'verify', text: 'session_id=true · batch_seq_no=true · merkle_root=true' }
      ],
      pause: 2800
    },
    {
      title: 'Claude Code / managed handoff',
      tag: 'validated path',
      lines: [
        { stamp: '10:12:02', kind: 'meta', badge: 'discover', text: 'session 11c55c0a-00e9-4e35-b413-ecf5e3709c94 resolved' },
        { stamp: '10:12:05', kind: 'meta', badge: 'handoff', text: 'controlled handoff separated from the native terminal' },
        { stamp: '10:12:10', kind: 'danger', badge: 'policy', text: 'destructive_move detected · recovery plan prepared' },
        { stamp: '10:12:14', kind: 'ok', badge: 'events', text: 'invoke_event + policy_decision_event persisted' },
        { stamp: '10:12:19', kind: 'ok', badge: 'restore', text: 'move rolled back from snapshot set' },
        { kind: 'rule' },
        { stamp: '10:12:24', kind: 'proof', badge: 'proof', text: 'impact_set_id exported with consistent fingerprint' },
        { stamp: '10:12:28', kind: 'proof', badge: 'verify', text: 'anchor_status=confirmed · anchor_field_checks all true' }
      ],
      pause: 3200
    },
    {
      title: 'Dangerous-Ops Smoke Test Report',
      tag: 'windows',
      lines: [
        { stamp: 'report', kind: 'meta', badge: 'platform', text: 'windows · account=dangerous-ops-windows · root=C:\\Users\\labpc\\AppData\\Local\\Temp\\clawchain-dangerous-ops-1774704579' },
        { stamp: 'scenario', kind: 'ok', badge: 'pass', text: 'destructive_delete · destructive_move · config_integrity_mutation' },
        { stamp: 'scenario', kind: 'ok', badge: 'pass', text: 'in_place_file_edit · destructive_truncate · secret_access' },
        { kind: 'rule' },
        { stamp: 'chain-log', kind: 'proof', badge: 'events', text: 'invoke_events_ok · policy_ok · receipts_ok · impact_sets_ok' },
        { stamp: 'counts', kind: 'proof', badge: 'detail', text: 'invoke_events=6 · policy=6 · recovery_planned=3 · impact_sets=3' },
        { stamp: 'result', kind: 'ok', badge: 'summary', text: 'ALL TESTS PASSED' }
      ],
      pause: 3400
    },
    {
      title: 'Proof / chain verification',
      tag: 'evm:31337',
      lines: [
        { stamp: '$', kind: 'meta', badge: 'command', text: 'python -m clawchain.agent_proxy_cli proof --account local-operator --limit 1' },
        { stamp: 'anchor', kind: 'proof', badge: 'status', text: 'backend=evm:31337 · mode=evm-anchored · status=confirmed' },
        { stamp: 'field', kind: 'proof', badge: 'checks', text: 'session_id=true · batch_seq_no=true · merkle_root=true' },
        { stamp: 'receipt', kind: 'proof', badge: 'counts', text: 'anchor_receipts=6 · impact_sets=3 · chain_verify_ok=true' },
        { kind: 'rule' },
        { stamp: 'result', kind: 'ok', badge: 'final', text: 'recoverable · auditable · verifiable' }
      ],
      pause: 3600
    }
  ];

  function buildLine(line) {
    if (line.kind === 'rule') {
      return '<div class="stream-line rule"><div class="stream-divider"></div></div>';
    }

    return [
      '<div class="stream-line ' + escapeHtml(line.kind || 'meta') + '">',
      '<div class="stream-stamp">' + escapeHtml(line.stamp || '') + '</div>',
      '<div class="stream-badge">' + escapeHtml(line.badge || '') + '</div>',
      '<div class="stream-text">' + escapeHtml(line.text || '') + '</div>',
      '</div>'
    ].join('');
  }

  function renderFrameInstant(frame) {
    if (!terminalOutput) {
      return;
    }

    var html = [
      '<div class="stream-frame">',
      '<div class="stream-frame-header">',
      '<div class="stream-frame-title">' + escapeHtml(frame.title) + '</div>',
      '<div class="stream-frame-tag">' + escapeHtml(frame.tag) + '</div>',
      '</div>',
      '<div class="stream-lines">'
    ];

    frame.lines.forEach(function (line) {
      html.push(buildLine(line));
    });

    html.push('</div></div>');
    terminalOutput.innerHTML = html.join('');
    if (terminalWrap) {
      terminalWrap.scrollTop = 0;
    }
  }

  if (terminalOutput) {
    if (prefersReducedMotion) {
      renderFrameInstant(frames[0]);
    } else {
      var frameIndex = 0;
      var baseDelay = 1100;

      function renderFrame(frame) {
        terminalOutput.innerHTML = [
          '<div class="stream-frame">',
          '<div class="stream-frame-header">',
          '<div class="stream-frame-title">' + escapeHtml(frame.title) + '</div>',
          '<div class="stream-frame-tag">' + escapeHtml(frame.tag) + '</div>',
          '</div>',
          '<div class="stream-lines" id="streamLines"></div>',
          '</div>'
        ].join('');

        var linesRoot = document.getElementById('streamLines');
        var lineIndex = 0;

        function appendNextLine() {
          if (!linesRoot) {
            return;
          }

          linesRoot.insertAdjacentHTML('beforeend', buildLine(frame.lines[lineIndex]));
          lineIndex += 1;

          if (terminalWrap) {
            terminalWrap.scrollTop = terminalWrap.scrollHeight;
          }

          if (lineIndex < frame.lines.length) {
            var nextDelay = frame.lines[lineIndex - 1].delay || baseDelay;
            window.setTimeout(appendNextLine, nextDelay);
          } else {
            frameIndex = (frameIndex + 1) % frames.length;
            window.setTimeout(function () {
              renderFrame(frames[frameIndex]);
            }, frame.pause || 3200);
          }
        }

        appendNextLine();
      }

      renderFrame(frames[0]);
    }
  }
});
