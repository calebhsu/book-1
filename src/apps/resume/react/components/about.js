MyComponents.About = React.createClass({

  render: function() {
    return (
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={'/apps/resume/images/profile.jpg'}/>
          <span className="card-title">Caleb Hsu</span>
        </div>
        <div className="card-content">
          <p>
            <b>Major</b>: Computer Science, BS <br />
            <b>Emphasis</b>: Human-Centered Computing <br />
          </p>
          <p className="right-align">
            <a href="https://github.com/calebhsu"><i className="fa fa-github fa-lg"></i></a> &nbsp;&nbsp;
            <a href="https://www.linkedin.com/in/chialohsu"><i className="fa fa-linkedin fa-lg"></i></a> &nbsp;&nbsp;
          </p>
        </div>
      </div>
    );
  }
});
