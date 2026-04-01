---
title: Instructure API Research
---
## API Resources

### Courses

This is just the properties from the response I am interested in and from which
to create the ZOD schema. [Full response Object](https://developerdocs.instructure.com/services/canvas/resources/courses#course)

```
{
  "id": 370663,
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
  "public_description": "Come one, come all to InstructureCon 2012!",
}
```

