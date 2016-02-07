MyComponents.Task = React.createClass({

  render: function() {
    return (
      <div className="card light-green darken-1">
        <div className="card-content white-text">
          <span className="card-title">{this.props.task.title}</span>
          <p>
            Deadline: {this.props.task.deadline} <br/>
            Priority: {this.props.task.priority}<br/>
            Type: {this.props.task.type}<br/>
            Assigned To: {this.props.task.assigned}<br/>
            &nbsp;<br/>
            {!this.props.task.completed && <a onclick={this.props.task.key} className="btn waves-effect white btn-flat">Complete</a>}
            {this.props.task.completed && <a className="btn white btn-flat disabled">Completed ✓</a>}
          </p>
        </div>
      </div>
    );
  }

});

MyComponents.TaskList = React.createClass({
  render: function() {

    var taskElements = this.props.tasks.map(function(t,i){
      return <MyComponents.Task task={t} key={i}/>
    })

    return (
      <div className="col s12 m6">
        {taskElements}
      </div>
    );
  }
});
