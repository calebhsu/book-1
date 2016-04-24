class Summary extends React.Component {
  render() {
    var projectName = this.props.meta.projectName.toUpperCase()
    var eventCount = this.props.events.length
    var doCount = 0
    var doingCount = 0

    // task category counter
    this.props.tasks.forEach(function(t) {
      if (t.taskStatus == 0) {
        doCount += 1;
      } 
      if (t.taskStatus == 1) {
        doingCount += 1;
      }
    })

    return (
      <div className="row center-align">
        <h5 className="black-text sectiontitle">{projectName} Quick Summary</h5>
        <p>
          <span className="chip cyan darken-1 white-text"><b>{doCount}</b> unstarted tasks</span>
          <span className="chip cyan darken-3 white-text"><b>{doingCount}</b> active tasks</span>
          <span className="chip teal lighten-1 white-text"><b>{eventCount}</b> upcoming events</span> <br/>
        </p>
      </div>
    );
  }
}
MyComponents.Summary = Summary
