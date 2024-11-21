# 🍅 Pomodoro Timer 

A digital Pomodoro Timer built using React and Vite. This tool implements the classic Pomodoro Technique, allowing users to break down work into focused intervals.


## Table of Content

- [Live Demo](#live-demo)
- [Features](#features)
- [Screenshots](#screenshots)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)


## Live Demo

Check out the live demo [here](https://pomodo-timer.netlify.app/).


## Features

1. **Timer**: Tracks time for both focus and break sessions (focus: 25 minutes, short: 5 minutes, long: 20 minutes).
2. **Session Management**: Automatically switches between focus and break sessions.
3. **Pause/Resume**: Allows users to pause and resume the timer at any point.
4. **Reset**: Resets the current session or break.
5. **Skip**: Skips the current session or break.
6. **Audio Notifications**: Plays a bell sound at the end of each focus and break session.


## Screenshots
 
 ![Screenshot1](https://i.postimg.cc/1XX31X5r/Screenshot1.png)
 ![Screenshot1](https://i.postimg.cc/mD2b7kMW/Screenshot2.png)
 ![Screenshot1](https://i.postimg.cc/cJW14XLH/Screenshot3.png)


## Prerequisites

- [Node.js](https://nodejs.org/) installed (v14 or higher).
- [NPM](https://www.npmjs.com/) package manager
- [Git](https://git-scm.com/) for version control.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ThashmilaJayasinghe/pomodoro-timer.git
2. Navigate to the project directory:

       cd pomodoro-timer   

3. Install dependencies:

       npm install 

4. Start the development server

       npm run dev


## Folder Structure

```bash
pomodoro-timer/
├── public/           # Images and sounds
├── src/              # Source code
│   ├── App.jsx       # Main app component
│   ├── main.jsx      # Entry point
│   ├── styles.css    # Stylesheet
├── .gitignore        # Ignored files for Git
├── index.html        # Main HTML template where the React app is rendered
├── package.json      # Project metadata and dependencies
└── README.md         # Documentation
```


## Technologies Used
#### Frontend:

- React, Vite

#### Styling:

- CSS
