---
layout:     post
title:      "Git command"
subtitle:   "cheatsheet"
date:       2023-12-29 12:00:00
author:     "Truong Nhon"
hidden: false
# header-img: "img/post-bg-apple-event-2015.jpg"
# header-style: text
# header-img-credit: "@WebdesignerDepot"
# header-img-credit-href: "medium.com/@WebdesignerDepot/poll-should-css-become-more-like-a-programming-language-c74eb26a4270"
published: true
# header-mask: 0.4
multilingual: false
catalog:      true
lang: en
tags:
- git
- cheatsheat
---
## Git Basics

```bash
git init
git clone <repository_url>
git status
```

## Staging and Commits

```bash
git add <file(s)>
git commit -m "Commit message"
git reset --soft HEAD^  // Undo Last Commit (Keep Changes)
git reset --hard HEAD^  // Undo Last Commit (Discard Changes)
```

## Branching

```bash
git branch <branch_name>
git checkout <branch_name>
git checkout -b <branch_name>
git merge <branch_name>
git branch -d <branch_name>
```

## Remote Repositories

```bash
git remote add <remote_name> <repository_url>
git push <remote_name> <branch_name>
git pull <remote_name> <branch_name>
```

## Logging and History

```bash
git log
git show <commit_hash>
git diff
```

## Miscellaneous

```bash
touch .gitignore  // Ignore Files (Create .gitignore)
git checkout -- <file(s)>  // Undo Changes in Working Directory
git reset HEAD <file(s)>  // Undo Staged Changes
```

## Cherry-pick

```bash
git cherry-pick <commit_hash>
```

## Rebase

```bash
git rebase <base_branch>
git rebase -i <base_branch>  // Interactive rebase
```

## Squash Commits during Rebase

```bash
// Change "pick" to "squash" for the commits you want to squash
// Follow on-screen instructions to edit the commit messages
git rebase -i <base_branch>
```

## Amend the Last Commit

```bash
git commit --amend
```

## Stash Changes

```bash
git stash
git stash save "Stash message"
```

## Apply Stashed Changes

```bash
git stash apply
git stash pop  // Apply and remove from stash
```

## View Stash List

```bash
git stash list
```

## Show Differences with Stash

```bash
git stash show -p <stash_id>
```

## Discard Stashed Changes

```bash
git stash drop <stash_id>
git stash clear  // Remove all stashes
```

## Tagging

```bash
git tag <tag_name>  // Create lightweight tag
git tag -a <tag_name> -m "Tag message"  // Create annotated tag
git push origin <tag_name>  // Push tag to remote
```

## Submodules

```bash
git submodule add <repository_url> <path>  // Add submodule
git submodule update --init --recursive  // Initialize submodules
git submodule foreach git pull origin master  // Update submodules
```

## Git Configurations

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

## Show Configurations

```bash
git config --list
```
