import React from "react";

function About() {
  return (
    <div className="about">
      <p>I built this app just to have some fun with React! </p>

      <p>Using:</p>

      <ul className="list">
        <li>React</li>
        <li>Redux (master branch)</li>
        <li>
          MobX (
          <a
            target="_blank"
            href="https://github.com/jorgvm/hacker-news/tree/mobx"
          >
            branch
          </a>
          ) with Decorators proposal
        </li>
        <li>Class properties proposal</li>
        <li>Optional chaining proposal</li>
        <li>and the Hacker News API</li>
      </ul>

      <p>
        View the demo{" "}
        <a target="_blank" href="https://coppercup-hackernews.netlify.com/">
          here on Netlify
        </a>
      </p>

      <p>
        Or check out the repository
        <br />
        <a target="_blank" href="https://github.com/jorgvm/hacker-news">
          on Github (Redux)
        </a>
        <br />
        <a
          target="_blank"
          href="https://github.com/jorgvm/hacker-news/tree/mobx"
        >
          on Github (Mobx)
        </a>
      </p>

      <p>Jorg</p>
    </div>
  );
}

export default About;
