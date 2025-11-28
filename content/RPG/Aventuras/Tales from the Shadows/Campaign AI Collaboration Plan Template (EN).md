---
title: "Campaign AI Collaboration Plan Template (EN)"
tags:
  - template
  - ai-workflow
  - campaign-management
draft: false
---

# Campaign AI Collaboration Plan Template

Use this template when you need to replicate the “curate + reorganize + expand” workflow from Tales from the Shadows for a different campaign. It is structured to help you steer an AI assistant efficiently, with ready-made prompts and checkpoints.

---

## 0. Kickoff Checklist
- **Scope Definition**: Clarify overall goal, target formats (Obsidian, VTT, PDF), and expected deliverables.
- **Current State Audit**: List existing files/folders and identify constraints (naming conventions, sandboxing, testing requirements).
- **Authority & Safety**: Remind AI about system rules (no destructive git cmds, ASCII edits, apply_patch usage).

> **Prompt Starter**  
> “We’re working on *[Campaign Name]* in *[folder/path]*. I want to inspect existing materials and map high-level structure before we make changes. Please list top-level files with short descriptions.”

---

## 1. High-Level Structure Alignment
1. **Inventory Core Docs**  
   - Ask AI to summarize key files in batches (avoid memory overload).
   - Capture act/arc structure, theme notes, and mechanical scaffolding.
2. **Decide File Taxonomy**  
   - Agree on naming/numbering pattern (e.g., `00` for references, `01` per act).
   - Identify special folders (`npc/`, `locations/`, `mechanics/`, `handouts/`).

> **Prompt Starter**  
> “Based on your scan, suggest an act-based file numbering scheme and highlight files that should share aliases. I want intros under `00`, narrative arcs under sequential codes, and support folders for NPCs/places.”

**Checkpoint**: Confirm the master outline with the AI before renaming anything.

---

## 2. Reorganization Phase
1. **Batch Renaming Strategy**  
   - Plan rename order (core acts first, then support docs).
   - Ensure AI adds aliases to preserve existing wiki links.
2. **Link Integrity**  
   - After renames, run regex/link audits to update references.
   - Use scripted replacement via `apply_patch` or Python where appropriate.
3. **Master Document Update**  
   - Refresh master matrix/table of contents to reflect new structure.

> **Prompt Starter**  
> “Rename the Act II guide to `02.00 - Act II - [Title].md`, add aliases for the old names, and update every link pointing at the previous filename. Show me a quick summary of files touched.”

**Checkpoint**: Run `rg` or equivalent to verify no stale references to old filenames remain.

---

## 3. Content Expansion Modules
### 3.1 NPC Dossiers
- Create individual files for recurring NPCs with consistent sections: Snapshot, Arc by Act, Relationship Web, Scene Hooks, Mechanical Notes, Change Log.
- Update quick-reference rosters to link to new dossiers.

> **Prompt Starter**  
> “Generate dedicated NPC sheets for *[list]* following the established template. Include relationship links and note where each NPC appears across acts.”

### 3.2 Location Notes
- Build `places/` directory with cinematic descriptions, act-specific hooks, and mechanics.
- Update location index to reference new notes.

> **Prompt Starter**  
> “Draft a location brief for *[Location]* with cinematic beats (intro, mid-crisis, resolution), act-specific hooks, and mechanical considerations. Link to relevant adventures.”

### 3.3 Handouts & Mechanics
- Translate essential handouts to English (or target language).
- Produce encounter matrices, ritual guides, or milestone tables tuned to party composition.

> **Prompt Starter**  
> “Create an encounter scaling reference for two level 5 characters, noting thresholds, sample encounters, and adjustments for support DMPCs.”

---

## 4. Quality Assurance
- **Link Audit**: Use AI to run regex checks on references (e.g., `rg '\[\[00\.'`).
- **Alias Validation**: Confirm old names resolve to new files via `aliases` metadata.
- **Folder Review**: Ensure new directories (npc/places/etc.) contain expected files.
- **Plan Update**: Ask AI to summarize changes and propose next-step suggestions.

> **Prompt Starter**  
> “Audit the vault for broken links or outdated references (old numbering). List any remaining issues so we can fix them.”

---

## 5. Cross-Campaign Adaptation Notes
- **Language Adjustments**: Decide if files need bilingual support or translation for players.
- **System Variants**: Adapt mechanical guides for different rule updates (e.g., D&D 2024 vs. OSR).
- **Player-Specific Needs**: Customize session briefings for solo play, remote sessions, or safety tools.

> **Prompt Starter**  
> “Suggest how this workflow would change if the campaign were a sci-fi mystery instead of a fantasy intrigue. Highlight where templates need edits.”

---

## 6. Final Handoff
- Request AI to produce a concise summary of modifications, referencing new filenames.
- Document suggested next steps (tests, exports, translations).
- Log outstanding ideas for future sprints (e.g., faction clocks, VTT maps).

> **Prompt Starter**  
> “Summarize today’s reorg and list recommended follow-up tasks. Emphasize files that were added or renamed so I can double-check them.”

---

## Appendix: Quick Prompt Bank
| Situation | Prompt |
| --- | --- |
| File Inventory | “List files in *[path]* with brief descriptions and note any missing metadata.” |
| Rename with Aliases | “Rename *[old]* to *[new]*, add `aliases` for the old name, and update all wiki links accordingly.” |
| Location Brief | “Write a location note for *[Location]* including intro/mid/finale set pieces, act hooks, mechanics, and cross-links.” |
| NPC Dossier | “Create an NPC sheet for *[Name]* with sections: Snapshot, Arc by Act, Relationship Web, Scene Hooks, Mechanical Notes, Change Log.” |
| Encounter Matrix | “Generate an encounter matrix tuned to *[party configuration]* with XP thresholds, sample encounters, and integration tips.” |
| Link Audit | “Search the repository for `[[00.` references to confirm all links follow the new numbering. Report any stragglers.” |

---

### Usage Tips
- Keep AI conversations modular: tackle renames, content creation, and audits in separate steps to avoid context muddle.
- After each major change, request the AI to restate the current state—helps catch mismatched filenames early.
- Maintain a running change log per session to simplify commits or manual documentation later.
