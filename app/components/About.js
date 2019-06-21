import React from "react";

function About() {
  return (
    <div className="about">
      <p>I built this app just to have some fun with React! Using:</p>

      <ul className="list">
        <li>React</li>
        <li>MobX</li>
        <li>Decorators proposal</li>
        <li>Class properties proposal</li>
        <li>Optional chaining proposal</li>
        <li>and the Hacker News API</li>
      </ul>

      <p>
        View the demo{" "}
        <a target="_blank" href="https://priceless-volhard-76e2b7.netlify.com">
          here on Netlify
        </a>
        <br />
        Or check out the repository{" "}
        <a target="_blank" href="https://github.com/jorgvm/hacker-news">
          on Github
        </a>
      </p>

      <p>-Jorg</p>
    </div>
  );
}

export default About;
