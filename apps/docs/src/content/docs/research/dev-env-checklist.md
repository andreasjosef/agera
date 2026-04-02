---
title: CCPilot Checklist
---

## Workflow

* Create an issue
* Copy branch name
* Create branch locally & Switch
* Create an empty commit with `git commit --alow-empty -m "message"`. Message should follow conventional commit format. Im this case: "type(where your)"
* Push with `git push origin HEAD`
* Go to Gitlab (Chas !)
* Create merge request as draft (have dashes for issue id in title and "Closes issue id"). Ex of issue id: "ccp-84"
* When finished, mark as ready. Close after review
* Delete locally, and remotly with `git push origin --delete [branch name]`
* Mark as done in Linear (should be automatic in future)

## Possible Issues with local development
* You might need to check db url
* You might need to down all containers and volumes with db:clean script, or `docker compose down -v` (v for volumes)
* You might need to check is other postgres instances with `lsof -i :5432`. Stopping the instance depends on how you installed postgres. 
* Upgrade Node 24