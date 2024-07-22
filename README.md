# ✅  Simple Todo List Application


### What can be added:
- search
- dark mode
        
### To show
 - Cards with SSE and arch drawings
 - GitHub Actions - tests
 - mobile view
 - 0 effort dark them thank to MUI (on dev)?

## Rest Api reasoning
 - shared list for multiple users updates
   - atomic update endpoints (PUT:/checked, PUT:/text)
     - lowering risk of optimistic update fail
   - (to implement) event architecture (SSE, WS) for live data update
     - better ux - list is always up-to-date
     - lowering risk for rewrite changes done already by someone else

## Extra

1. Since its such an enjoyable experience to have a todo list, think how would you share it with your friends - so all of you can update it at the same time.
   
   - create a User + auth
   - create shareable lists, so a User can share list with others
   - event base list updates

2. Your friends like the todo list a lot! Everyone shared it with their friends. Now your application is bottlenecking.
   Also, everyone edits at the same time just once a day for an hour. How would you accommodate your users?

   - write Node.js backend and deploy it in serverless environment e.g. in Vercel Edge :-)
       - so the lambdas are created as traffic comes and are destroyed when ends (unused lambda life span 10-60sec ) 
         - we can throw as many user as we want
         - and we pay only for served requests :-)
   - but in Java context... this is whole different story with monitoring traffic, spawning new servers and load balancing, not mentioning the DB stuff... to discuss...


![](todo.png)

## FAQ

Complete a full-stack implementation in Spring Boot and React to support the following functionality.

An ideal submission would have a:

1.  Minimally complete an API implementation to facilitate the requirements of the client
2.  Minimally complete a Todo List view to support the functionality listed below.
3.  Add reasonable test coverage on both the API and UI

We'd prefer not to take up more than 2 hours of your time, so no need for:
- any CSS styling
- configuration or tooling of any type
    - **Caveat**: Unless your solution or tests require an external dependency your familiar with

we are **more concerned with the foundational criteria mentioned above**.

_If you aren't able to finish everything, no problem, we can discuss how you'd finish when we review it together_ 🙂

## Functional Requirements

### Add a Todo

New todos are entered in the input at the top of the app.

### Edit & Delete a Todo

A todo item has three possible interactions:

1. Clicking the checkbox marks the todo as complete

2. Double-clicking input activates editing mode  
`Normally I would discuss any changes with PO berofe implementing. Here I a bit change UX so Edit have action button similar to Delete action`
`Why I changed it? We need to consider what is primary action/functionality and build around this. Imho checking items is primary action, edit/delete secondary`

3. Hovering over the todo shows the remove button

### Counter

Displays the number of active todos

## Submissions

When you are finished, push your commits to the remote.
