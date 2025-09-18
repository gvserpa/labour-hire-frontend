import "./index.css";

function MainContent(props) {
  return (
    <main>
        <div className="img-content">
          <div className="logo">
            <h2>LabourHIRE</h2>
          </div>
          <div className="title">
            <div className="title-content">
              <h1>"{props.title}"</h1>
              <h3>{props.name}</h3>
              <p>{props.jobtitle}</p>
            </div>
          </div>
        </div>
    </main>
  );
}

export default MainContent;
