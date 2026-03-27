——-
title: “How I Use AI Agents to Build Software and Improve Productivity”
date: 2026-03-25
draft: false
——-

*A practical example of human-agent collaboration.*

---

I run several AI agents as part of my daily workflow. Not as a chat assistant you type questions into. As execution partners that do the work while I handle the judgment and prioritization.

Here's how it works in practice.

---

## The Setup

I have agents with different scopes: one focused on complex execution, code, and infrastructure. Another focused on scheduling, coordination, and lighter repeatable tasks more related to personal productivity. I also have a third Agent only focus on communications, but that deserves dedicated post about it.

These agents use a shared workspace on GitHub and coordinate their execution based on project boards and GH Issues. Everything is auditable.

---

## How We Build Features

Every piece of software or automation I build goes through the same process, regardless of size. No exceptions for "quick fixes."

### 1. Scope first

When I have an idea, the agent drafts a full spec before any code: what the feature does, what problem it solves, what files change, and a acceptance criteria with a checklist of what done looks like. I review, iterate on the spec, and approve the scope before it becomes a GitHub issue in one of my projects.

### 2. GitHub issue as source of truth

Every feature lives in a GitHub issue. The agent reads the issue, uses it as requirements, and doesn't invent scope beyond what's written. The issue tracks technical design decisions, the implementation plan, and scope updates as we iterate.

### 3. Design before code

The agent proposes two or three approaches with trade-offs and a recommendation. We agree on the design before implementation starts. The design doc gets committed to the repo.

### 4. Plan before execution

A detailed task-by-task implementation plan is written and posted to the issue. I need to approve it explicitly. Only then the agent starts coding.

### 5. TDD throughout

Every task follows the same pattern using the [superpowers skill](https://github.com/obra/superpowers): write a failing test, implement to pass, commit. No untested code ships.

### 6. Verification before "done"

Before anything is called complete, it gets tested through the real production trigger, like an "agent demo" at the end of a sprint. The agent has to show me evidence it works, not just tell me it does.

### 7. I close the issue

The agent never moves a GH issue to Done without my explicit confirmation. That final gate stays with me.

---

## Config Over Code

Any automation with rules, thresholds, or criteria gets a separate config file. The agent builds to that pattern by default. I can quickly update behavior without having to update the code.

---

## What This Gets Me

- I spend more time thinking about my workflows and how I can automate them and remove my own inefficiencies. 
- I learn a lot as I follow the agent reasoning to define a solution and the the respective implementation.
- Every change is traceable: issue, design doc, commit history and local change logs.
- No surprise scope creep, the agent works from approved specs

---

## Summary

The agent handles execution. I handle the requirements and the final approval. The workflow enforces that boundary explicitly. There are hard gates where the agent must stop and wait for my approval before moving forward.

That's the design. That's not a limitation.

---
