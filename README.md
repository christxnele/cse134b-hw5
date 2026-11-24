# CSE134B Homework 5

## Links
1. https://github.com/christxnele/cse134b-hw5
2. https://christxnele.github.io/cse134b-hw5/index.html
3. https://christxnele.github.io/cse134b-hw5/experiment.html



## SSG exercise
For the SSG exercise, I used eleventy and all the content is in the `ssg-exercise/` folder. I recreated my Home (`index.html`) and About (`about.html`) pages so they both use the same footer in `ssg-exercise/src/_includes/footer.njk` The commands needed to install, build and preview are in `ssg-exercise/README.md`.

## Design note for the web component

**Visitor's goal:**  The user wants to read a random fact and also load a new one wehnever tehy want, without having to reload the page. They should also be able to hide the source


**Process when clicking "New Fact"**

1. The button's click listener calls `loadFact()`. If a request is already running, it returns so requests don't overlap.
2. `loadFact()` sets the loading message and uses `fetch` to send a GET request to the Useless Facts API.
3. It checks `response.ok`, parses the JSON, and checks that `text` and `source` are strings.
4. `showFact()` updates the `textContent` of the fact, source, and status paragraphs.

**What the user sees**

- **Waiting:** The status says "Loading a fact..." and any previous fact stays visible.
- **Success:** The new fact and source replace the old ones, and the status says "New fact loaded". In compact mode, the source stays hidden.
- **Failure:** The status says "The request failed. Please try again" and the button changes to "Try again". Any previous fact stays visible. Clicking the button sends a new request.

The status also uses `role="status"` so screen readers can announce these changes.