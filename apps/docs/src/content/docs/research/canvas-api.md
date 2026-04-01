---
title: Instructure API Research
---

The Canvas Instructure LMS integration is one source of requirements that CCPILOT processes into a series weighted steps. 

## Brainstorm
- the calendar.service uses ics feeds from the courses response to get lectures and maybe deadlines
- the deadlines could also be gotten from the assignments. pros vs cons?
- the canvas.service output is are requirements which are passed the step
generator and either saved already here to the DB or when the entire ingestion
is completed. DECISION?
-  [Use fetch API from within Node](https://nodejs.org/en/learn/getting-started/fetch)

## API Endpoints 

- [Get a single assignment](https://developerdocs.instructure.com/services/canvas/resources/assignments#method.assignments_api.show)
    - https://chasacademy.instructure.com/api/v1/courses/:id/assignments/:id
    - from here get
     ```
        {

        "id": 4,
        "name": "some assignment",
        "description": "<p>Do the following:</p>...",
        "created_at": "2012-07-01T23:59:00-06:00",
        "updated_at": "2012-07-01T23:59:00-06:00",
        "due_at": "2012-07-01T23:59:00-06:00",
        "course_id": 123,
        "html_url": "https://...",
        // the types of submissions allowed for this assignment list containing one or
        // more of the following: 'discussion_topic', 'online_quiz', 'on_paper', 'none',
        // 'external_tool', 'online_text_entry', 'online_url', 'online_upload',
        // 'media_recording', 'student_annotation'
        "submission_types": ["online_text_entry"],
        "quiz_id": 620,
        }
    ```
### Courses

This is just the properties from the response I am interested in and from which
to create the ZOD schema. [Full response Object](https://developerdocs.instructure.com/services/canvas/resources/courses#course)

```
{ "id": 370663,
  "uuid": "WvAHhY5FINzq5IyRIJybGeiXyFkG3SqHUPb7jZY5",
  "name": "InstructureCon 2012",
  "course_code": "INSTCON12",
  "original_name": "InstructureCon-2012-01",
  "account_id": 81259,
  "start_at": "2012-06-01T00:00:00-06:00",
  "end_at": "2012-09-01T00:00:00-06:00",
  "locale": "en",
  // Calendars will be useful later but Chas does not seem to use them so we
user their ics feed instead. see -> link to ICS here 
  "calendar": null,
  "syllabus_body": "<p>syllabus html goes here</p>",
  "course_progress": null,
  "public_description": "Come one, come all to InstructureCon 2012!" }
```

