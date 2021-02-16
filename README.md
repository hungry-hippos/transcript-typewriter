<h1>The Transcript Typewriter!</h1>

Hi, thanks for checking out the repo. You will probably the only recruiter who will do so, and for that I commend you. <br/>
This was the first project I created. This was the project that taught me fundamental CSS properties, file structure, basic Object Oriented Programming, and the importance of never writing spaghetti code. <br/>
The stack used is NodeJs, Express, HTML/CSS, and EJS. <br/>
Additional technologies include GraphJs and LocalStorage manipulation to store user's progress. </br>

How does the program work? Glad you asked. <br/>
When the user opens a new transcript and the directory changes to /workpage, a .txt file containing the video transcript is loaded along with the HTML/CSS/JS package. This .txt file is then parsed and corresponding characters are then displayed on the screen as individual divs, grouped together as words, lines, and pages. <br/>
Then, a keyboard event listener is added that reads user input and compares it to the next unmarked character. If they match, the displayed character is crossed in black. Otherwise, it's crossed in red. An object called typeWriterFunctionality tracks the number of correct and wrong keystrokes along with other stats and displays them on a final report once the time runs out.<br/>
Once time's up, the results for that test are stored in LocalStorage. Whenever the user returns to the homepage, these results are extracted and parsed to produce an overall progress chart using the ChartJs library.

<h3>Happy Typing!</h3>
