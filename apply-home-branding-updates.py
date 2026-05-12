from pathlib import Path
import sys

ROOT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path.cwd().resolve()

home = ROOT / "pages" / "home.html"
typing = ROOT / "js" / "typing.js"
index = ROOT / "index.html"

missing = [str(p.relative_to(ROOT)) for p in (home, typing) if not p.exists()]
if missing:
    raise SystemExit(f"Missing required file(s): {', '.join(missing)}\nRun this from the repo root folder.")

def backup(path: Path):
    bak = path.with_suffix(path.suffix + ".bak")
    if not bak.exists():
        bak.write_text(path.read_text(encoding="utf-8"), encoding="utf-8")

backup(home)
backup(typing)
if index.exists():
    backup(index)

# 1) Update typing animation phrases.
typing.write_text("""// Rotating homepage role text — aligned with Windows infrastructure/support positioning.
(function(){
  var phrases = [
    'IT Support Specialist',
    'Windows & Infrastructure Operations',
    'Systems Support Specialist',
    'Active Directory Administration',
    'Endpoint Support',
    'Remote IT Operations'
  ];
  var pi = 0, ci = 0, deleting = false;
  function tick(){
    var el = document.getElementById('typed-text');
    if(!el) return;
    var word = phrases[pi];
    if(!deleting){
      ci++;
      el.textContent = word.slice(0, ci);
      if(ci === word.length){ deleting = true; setTimeout(tick, 2200); return; }
      setTimeout(tick, 90);
    } else {
      ci--;
      el.textContent = word.slice(0, ci);
      if(ci === 0){ deleting = false; pi = (pi + 1) % phrases.length; }
      setTimeout(tick, 45);
    }
  }
  setTimeout(tick, 1000);
})();
""", encoding="utf-8")

# 2) Update homepage wording without changing layout/classes.
text = home.read_text(encoding="utf-8")
replacements = {
    "I keep systems running, teams moving, and deployments clean. Hands-on enterprise IT experience supporting POS rollouts across the US, Europe, and South America. Seeking roles in <strong style=\"color:var(--mint);\">IT Support, Help Desk, or Systems Administration</strong>.":
    "I keep systems running, teams moving, and deployments clean. Hands-on enterprise IT experience supporting endpoint deployments, Windows environments, and infrastructure operations across the US, Europe, and South America. Seeking roles in <strong style=\"color:var(--mint);\">IT Support, Systems Support, and Infrastructure Operations</strong>.",

    "Focus: <span class=\"status-val\">IT Support · Help Desk · SysAdmin</span>":
    "Focus: <span class=\"status-val\">IT Support · Systems Support · Infrastructure</span>",

    "<span class=\"t-hi\">Kristian Padilla</span><span class=\"t-out\"> — IT Support Professional</span>":
    "<span class=\"t-hi\">Kristian Padilla</span><span class=\"t-out\"> — IT Support Specialist | Windows &amp; Infrastructure Operations</span>",

    "→ ServiceNow · Jira · Windows · TCP/IP · Active Directory":
    "→ ServiceNow · Jira · Windows · Active Directory · DNS",

    "<div class=\"terminal-line\"><span class=\"t-out\">→ Immediate: </span><span class=\"t-hi\">IT Support / Help Desk</span></div>":
    "<div class=\"terminal-line\"><span class=\"t-out\">→ Immediate: </span><span class=\"t-hi\">IT Support / Systems Support</span></div>",

    "<div class=\"terminal-line\"><span class=\"t-out\">→ Long-term: </span><span class=\"t-yellow\">Cybersecurity</span><span class=\"t-out\"> [ ETA: 2-3 years ]</span></div>":
    "<div class=\"terminal-line\"><span class=\"t-out\">→ Growth Path: </span><span class=\"t-yellow\">Windows Infrastructure · IAM · Endpoint Operations</span></div>",

    "<div class=\"about-card holo-card\"><div class=\"about-card-label\">Systems</div><div class=\"about-card-val\">Windows · Active Directory</div></div>":
    "<div class=\"about-card holo-card\"><div class=\"about-card-label\">Systems</div><div class=\"about-card-val\">Windows · AD · DNS</div></div>",

    "<div style=\"font-family:'Rajdhani',sans-serif;font-size:1.1rem;font-weight:700;color:#eeeee4;text-transform:uppercase;letter-spacing:0.5px;\">Cybersecurity Fundamentals</div>":
    "<div style=\"font-family:'Rajdhani',sans-serif;font-size:1.1rem;font-weight:700;color:#eeeee4;text-transform:uppercase;letter-spacing:0.5px;\">Infrastructure Fundamentals</div>",

    "Foundational knowledge in cybersecurity principles, threat awareness, and secure system practices. Google certified and actively building toward a career in security.":
    "Hands-on Windows infrastructure practice with Active Directory, DNS, domain joins, endpoint troubleshooting, and security-aware support workflows.",

    "<div style=\"font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:700;color:var(--yellow);letter-spacing:1px;text-transform:uppercase;opacity:0.7;\">Cybersecurity</div>":
    "<div style=\"font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:700;color:var(--yellow);letter-spacing:1px;text-transform:uppercase;opacity:0.7;\">Infrastructure Support</div>",

    "<div style=\"font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:1px;\">ETA: 2-3 years</div>":
    "<div style=\"font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:1px;\">Next: GPO · PowerShell · M365</div>",

    "Currently seeking roles in IT Support, Help Desk, or Systems Administration. Open to all opportunities — let's talk.":
    "Currently seeking roles in IT Support, Systems Support, Infrastructure Support, or Windows Administration. Open to remote and hybrid opportunities — let's talk.",
}

missed = []
for old, new in replacements.items():
    if old in text:
        text = text.replace(old, new)
    else:
        missed.append(old[:90] + ("..." if len(old) > 90 else ""))

home.write_text(text, encoding="utf-8")

# 3) Light root index cleanup if present.
if index.exists():
    idx = index.read_text(encoding="utf-8")
    idx = idx.replace("IT Support Professional", "IT Support Specialist | Windows & Infrastructure Operations")
    idx = idx.replace("Kristian Padilla | IT Professional", "Kristian Padilla | IT Support Specialist")
    index.write_text(idx, encoding="utf-8")

print("Branding updates applied.")
print("Updated: js/typing.js, pages/home.html" + (", index.html" if index.exists() else ""))
if missed:
    print("\nSome exact homepage strings were not found. Review these manually:")
    for item in missed:
        print("-", item)
else:
    print("All homepage replacements matched successfully.")
