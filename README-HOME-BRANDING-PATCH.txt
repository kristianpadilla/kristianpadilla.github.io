HOME BRANDING PATCH

What this updates:
- js/typing.js role rotation
- pages/home.html homepage wording
- index.html splash/title wording if present

It removes/reduces:
- Help Desk as the main target
- Cybersecurity ETA as the main roadmap
- generic IT Support Professional positioning

It adds/emphasizes:
- Windows & Infrastructure Operations
- Systems Support
- Active Directory
- DNS
- Endpoint Support
- Remote IT Operations
- GPO / PowerShell / M365 next steps

How to apply:
1. Put apply-home-branding-updates.py in the ROOT of your repo folder.
2. Open Terminal/Git Bash in that folder.
3. Run:

   python apply-home-branding-updates.py

4. Review the changed files.
5. Commit and push:

   git add index.html pages/home.html js/typing.js
   git commit -m "Update homepage infrastructure branding"
   git push origin main

The script creates .bak backups the first time it runs.
Do not commit the .bak files or this patch script.
