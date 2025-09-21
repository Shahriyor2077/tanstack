import { memo } from 'react';
// import Home from './pages/Home';
// import About from './pages/About';
import { Link, Route, Routes } from 'react-router-dom';
// import Comments from './pages/Comments';
import Phone from './pages/Phone';
import 'antd/dist/reset.css';

const App = () => {
  return (
    <div className="App">
      {/* <Link to={"/"}>Home</Link> */}
      {/* <Link to={"/about"}>About</Link> */}
      {/* <Link to={"/comments"}>Comments</Link> */}
      <Link to={"/phone"}>Phones</Link>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/comments" element={<Comments />} /> */}
        <Route path="/phone" element={<Phone />} />
      </Routes>
    </div>
  );
};

export default memo(App);