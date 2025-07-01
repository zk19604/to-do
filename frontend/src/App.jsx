import 'bootstrap/dist/css/bootstrap.min.css';
import Tasks from "./Tasks";
import Pomodoro from "./Pomodoro";
import Lofi from "./Lofi";
import './App.css';



function App() {
  return (
    <div className="app-bg">
      <h1 className="main-heading">LOCK IN</h1>
        <div className="snowflake first-snowflake">*</div>
        <div className="snowflake second-snowflake">*</div>
<div className="snowflake third-snowflake">*</div>
      <div className="app-grid">
        <div className="tasks-section">
          <Tasks />
        </div>
        <div className="pomodoro-section">
          <Pomodoro />
        </div>
        <div className="character-section">
          <div>
           <Lofi />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
