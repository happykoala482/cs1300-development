# Development

### Link to Deployed Website
https://happykoala482.github.io/cs1300-development/

### Goal and Value of the Application
The goal of this application is to show users their favorite players and list their statistics. You can add them to your roster and see what the roster's average points game would be overall.

### Usability Principles Considered
I considered that different screen sizes would allow for different numbers of player cards that could be visible in each row. For this reason I used a flex container with wrap to display them so that the number of items in each row would be dependent on the screen size.

### Organization of Components
The components are organized in a responsive gallery-style div container. This allows items to wrap to the next line and arrange themselves in an optimal manner on the screen.

### How Data is Passed Down Through Components
The data is passed down through the components via props.

### How the User Triggers State Changes
The user triggers state changes through event listeners on the selector menus for filtering, event listeners on the radio buttons for sorting, and event listeners on the player card buttons for adding and removing players from your roster.


