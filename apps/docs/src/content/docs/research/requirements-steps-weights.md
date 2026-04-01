---
title: Requirements and Steps
---


```JSON
{
  "requirement_summary": "A 1-sentence high-level goal of the requirement.",
  "steps": [
    {
      "id": "unique-kebab-case-slug",
      "action": "The verb-first 'Quest' title (e.g., 'Model the Task DNA').",
      "outcomeDefinition": "A specific description of the logical state achieved after this step.",
      "curiosityTrigger": "A 'hook' question or technical challenge to trigger focus.",
      "theWin": "The dopamine-hit summary of why this step matters.",
      "category": "One of: ['admin', 'deep-work', 'logic', 'research', 'ui-polish', 'architecture']",
      "complexity": 1, // Integer 1-5 (1 = Low friction, 5 = High cognitive load)
      "estimatedMinutes": 30, // Estimated time for a focused session
      "dependencyOrder": 1, // The sequence in which this should appear
      "quickStartLinkHint": "A hint of where to look (e.g., 'Check the Supabase Auth docs' or 'See Canvas Instructions')."
    }
  ]
}
```
