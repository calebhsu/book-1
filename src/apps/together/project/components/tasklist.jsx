//
// Task Status Classes - Do, Doing, Done
//
MyComponents.todo = React.createClass({
  handleClick: function(event) {
    var prolannerRef = new Firebase('https://prolanner.firebaseio.com')
    var projectID = window.location.hash.substring(1);
    var key = this.props.task.key
    var taskRef = prolannerRef.child('tasks').child(projectID).child(key)

    taskRef = taskRef.update({taskStatus: 1})
  },
  deleteClick: function(event) {
    var prolannerRef = new Firebase('https://prolanner.firebaseio.com')
    var projectID = window.location.hash.substring(1);
    var key = this.props.task.key
    var taskRef = prolannerRef.child('tasks').child(projectID).child(key)

    taskRef = taskRef.remove();
  },
  render(){
    // handles priority naming
    var priority;
    if (this.props.task.priority == 0) {
      priority = "High"
    }
    else if (this.props.task.priority == 1) {
      priority = "Medium"
    }
    else {
      priority = "Low"
    }

    // github link redirect
    var url = 'https://github.com/' + this.props.task.assignedTo

    if (this.props.task.taskStatus == 0) return (
      <li>
        <div className="collapsible-header cyan darken-1">{this.props.task.taskName}</div>
        <div className="collapsible-body black-text">
          <p><i>{this.props.task.taskDescription}</i> <br/>
          <b>Priority</b>: {priority}<br/>
          <b>Deadline</b>: {this.props.task.deadline}</p>
          <div className="row center-align">
            <a href={url} target="_blank"><div className="chip orange white-text">{this.props.task.assignedTo}</div></a>
            <a className="btn-floating btn-flat waves-effect red" onClick={this.deleteClick}><i className="material-icons secondary-content delete">delete</i></a>
            <a className="btn-floating btn-flat waves-effect light-green darken-1" onClick={this.handleClick}><i className="material-icons secondary-content move">arrow_forward</i></a>
          </div>
        </div>
      </li>
    );
    else return (
      <div></div>
    );
  }
});

MyComponents.doing = React.createClass({
  handleClick: function(event) {
    var prolannerRef = new Firebase('https://prolanner.firebaseio.com')
    var projectID = window.location.hash.substring(1);
    var key = this.props.task.key
    var taskRef = prolannerRef.child('tasks').child(projectID).child(key)

    taskRef = taskRef.update({taskStatus: 2})
  },
  deleteClick: function(event) {
    var prolannerRef = new Firebase('https://prolanner.firebaseio.com')
    var projectID = window.location.hash.substring(1);
    var key = this.props.task.key
    var taskRef = prolannerRef.child('tasks').child(projectID).child(key)

    taskRef = taskRef.remove();
  },
  render(){
    var priority;
    if (this.props.task.priority == 0) {
      priority = "High"
    }
    else if (this.props.task.priority == 1) {
      priority = "Medium"
    }
    else {
      priority = "Low"
    }

    // github link redirect
    var url = 'https://github.com/' + this.props.task.assignedTo

    if (this.props.task.taskStatus == 1) return (
      <li>
        <div className="collapsible-header cyan darken-3">{this.props.task.taskName}</div>
        <div className="collapsible-body black-text">
          <p><i>{this.props.task.taskDescription}</i><br/>
          <b>Priority</b>: {priority}<br/>
          <b>Deadline</b>: {this.props.task.deadline}</p>
          <div className="row center-align">
            <a href={url} target="_blank"><div className="chip orange white-text">{this.props.task.assignedTo}</div></a>
            <a className="btn-floating btn-flat waves-effect red" onClick={this.deleteClick}><i className="material-icons secondary-content delete">delete</i></a>
            <a className="btn-floating btn-flat waves-effect light-green darken-1" onClick={this.handleClick}><i className="material-icons secondary-content move">arrow_forward</i></a>
          </div>
        </div>
      </li>
    );
    else return (
      <div></div>
    );
  }
});

MyComponents.done = React.createClass({
  handleClick: function(event) {
    var prolannerRef = new Firebase('https://prolanner.firebaseio.com')
    var projectID = window.location.hash.substring(1);
    var key = this.props.task.key
    var taskRef = prolannerRef.child('tasks').child(projectID).child(key)

    taskRef = taskRef.update({taskStatus: 1})
  },
  deleteClick: function(event) {
    var prolannerRef = new Firebase('https://prolanner.firebaseio.com')
    var projectID = window.location.hash.substring(1);
    var key = this.props.task.key
    var taskRef = prolannerRef.child('tasks').child(projectID).child(key)

    taskRef = taskRef.remove();
  },
  render(){
    var priority;
    if (this.props.task.priority == 0) {
      priority = "High"
    }
    else if (this.props.task.priority == 1) {
      priority = "Medium"
    }
    else {
      priority = "Low"
    }

    // github link redirect
    var url = 'https://github.com/' + this.props.task.assignedTo

    if (this.props.task.taskStatus == 2) return (
      <li>
        <div className="collapsible-header blue-grey lighten-2">{this.props.task.taskName}</div>
        <div className="collapsible-body black-text">
          <p><i>{this.props.task.taskDescription}</i><br/>
          <b>Priority</b>: {priority}<br/>
          <b>Deadline</b>: {this.props.task.deadline}</p>
          <div className="row center-align">
            <a href={url} target="_blank"><div className="chip orange white-text">{this.props.task.assignedTo}</div></a>
            <a className="btn-floating btn-flat waves-effect red" onClick={this.deleteClick}><i className="material-icons secondary-content delete">delete</i></a>
            <a className="btn-floating btn-flat waves-effect light-green darken-1" onClick={this.handleClick}><i className="material-icons secondary-content move">arrow_back</i></a>
          </div>
        </div>
      </li>
    );
    else return (
      <div></div>
    );
  }
});

//
// Task List
//
class TaskList extends React.Component {
  render() {
    var todo = this.props.tasks.map(function(u, i){
      return <MyComponents.todo task={u} key={i} />
    });

    var doing = this.props.tasks.map(function(u, i){
      return <MyComponents.doing task={u} key={i} />
    });

    var done = this.props.tasks.map(function(u, i){
      return <MyComponents.done task={u} key={i} />
    });

    var projectID = window.location.hash.substring(1);
    var url = "addtask.html#"+projectID
    return (
      <div className="row">

        <div className="col s3 m4">
          <div className="black-text center">
            <h5>DO</h5>
          </div>
          <ul className="collapsible" data-collapsible="accordion">
            {todo}
          </ul>
        </div>

        <div className="col s3 m4">
          <div className="black-text center">
            <h5>DOING</h5>
          </div>
          <ul className="collapsible" data-collapsible="accordion">
            {doing}
          </ul>
        </div>

        <div className="col s3 m4">
          <div className="black-text center">
            <h5>DONE</h5>
          </div>
          <ul className="collapsible" data-collapsible="accordion">
            {done}
          </ul>
        </div>

      </div>
    );
  }
  componentDidMount(){
    $(document).ready(function(){
      $('.collapsible').collapsible({
        accordion : false
      });
    });
  }
}
MyComponents.TaskList = TaskList
