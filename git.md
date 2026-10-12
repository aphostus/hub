# git.md — how to use git on this project

> Termux for git. Acode for editing. GitHub for backup.
> No plugin. No GUI. Three lines per push.

---

## 0. THE LOOP

Every time you change something:

```bash
cd /storage/emulated/0/Programs/Phostack
git add .
git commit -m "what changed"
git push
```

That is the whole workflow. First line goes to the project.
Last three save and upload.

---

1. FIRST TIME IN A SESSION

Termux starts in the home folder. Walk to the project first.

```bash
cd /storage/emulated/0/Programs/Phostack
```

Every new Termux window, this is the first line.

---

2. WHAT EACH LINE DOES

git add .
Stages every change in the folder. Like putting items in a box.

git commit -m "note"
Seals the box with a label. The note is a message to future you.

git push
Ships the box to GitHub.

---

3. COMMON TASKS

See what changed

```bash
git status
```

Red = not saved. Green = staged. Clean = nothing changed.

See history

```bash
git log
```

Newest first. Press q to quit.

Undo a broken file

```bash
git checkout script.js
```

Resets that one file to the last commit. Your edits gone.

Undo everything

```bash
git checkout -- .
```

Resets every file to the last commit.

Pull changes from another device

```bash
git pull
```

Only needed if you edit from more than one place.

---

4. COMMIT MESSAGE RULES

Lowercase. Plain English. Short.

Good:

· added favicon
· fixed router path
· removed old configs
· mobile shell started

Bad:

· update (update what?)
· stuff (what stuff?)
· asdf (useless)
· FINAL FINAL v2 (never final)

The message is a note to future you. Six months from now you will
read it and know what happened.

---

5. WHAT NOT TO COMMIT

Protected by .gitignore at project root:

```
Website Version/Private Sources/datahub.env
token.txt
```

Never remove those lines. datahub.env holds API keys. token.txt
held a GitHub token. If either lands on GitHub, it is public forever.

If you add a new secret file, add its path to .gitignore before
the next git add ..

---

6. IF PUSH ASKS FOR PASSWORD

Username: aphostus

Password: a GitHub personal access token, not your account password.
Classic token, repo scope only. Starts with ghp_.

The credential is cached in ~/.git-credentials. You only enter it
when the token expires or is revoked.

If the token leaks:

1. Delete it at github.com/settings/tokens
2. Make a new one
3. Run this with the new token:

```bash
git remote set-url origin https://aphostus:NEW_TOKEN@github.com/aphostus/hub.git
git push
git remote set-url origin https://github.com/aphostus/hub.git
```

---

7. BRANCHES

Current branch: phostack. All work goes here.

Other branches in the repo:

· system — README only
· phoscont — empty for now

Do not create branches until you need them. One branch is fine.

---

8. WHAT NOT TO DO

· Do not use the Acode Git plugin. Android blocks it. Permission
  errors are permanent.
· Do not commit datahub.env or any .env file.
· Do not commit node_modules/.
· Do not commit token.txt.
· Do not paste tokens at the Terminal prompt when it is asking for a
  command. It will run them as commands and fail.
· Do not fight Android permissions. Use Termux.

---

9. ONE LINE TO REMEMBER

cd to the project. Add. Commit. Push. Done.