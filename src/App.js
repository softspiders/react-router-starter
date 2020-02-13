import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, NavLink, useRouteMatch, useParams} from 'react-router-dom';
import './App.css';


const matchWorkaround = (pathname) => (isMatch, location) => isMatch || (pathname!=='/' ? location.pathname.startsWith(pathname):location.pathname===pathname);

export default function App() {
  return (
    <Router>
      <div className="parent">
      <div className="leftPanel">
        <ul className="nav">
          <li><NavLink to='/' activeClassName='active' isActive={matchWorkaround('/')}>Home</NavLink></li>
          <li><NavLink to='/about' activeClassName='active' isActive={matchWorkaround('/about')}>About</NavLink></li>
          <li><NavLink to='/topics' activeClassName='active' isActive={matchWorkaround('/topics')}>Topics</NavLink></li> 
        </ul>
      </div>
      <div className="mainPanel">
        <Switch>
          <Route path="/about"><About /></Route>
          <Route path="/topics"><Topics /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </div>
      </div>
    </Router>
  );
}

function Home() {
  return <div><h2>Home</h2><p>This is the home page of the starter.</p></div>;
}

function About() {
  return <div><h2>About</h2><p>Whatever... Anyway...</p></div>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>
      {TopicLinks(match.url)}

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}><Topic /></Route>
        <Route path={match.path}><h3>Please select a topic.</h3></Route>
      </Switch>
    </div>
  );
}

function TopicLinks(url) {
let links = ts.map(t => <li><Link to={`${url}/${t.alias}`}>{t.title}</Link></li>)
  return (<ul>
    {links}
  </ul>);
}

const ts = [{
    alias: "topic-1",
    title: "Topic N1",
    page: <Page1/>
  },{
    alias: "topic-2",
    title: "Topic N2",
    page: <Page2/>
  }];

function Topic() {
  let {topicId} = useParams();
  let t = ts.find(item => item.alias===topicId);
  return (
    <div>
      <h3>{t.title}</h3>
      {t.page}
    </div>
  );
}

function Page1() {
  return (
    <div>
      <p><strong>Content of topic 1.</strong></p>
    </div>
  );
}

function Page2() {
  return (
    <div>
      Content of topic 2.
    </div>
  );
}