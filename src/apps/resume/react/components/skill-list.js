MyComponents.Skill = React.createClass({
  render: function() {
    return (
        <li className="collection-item">
          <span className="title"> {this.props.skill.name}</span>
          <p className="grey-text">{this.props.skill.years} years</p>
        </li>
    );
  }
});

MyComponents.SkillList = React.createClass({
  render: function() {

    var skillElements = this.props.skills.map(function(s,i){
      return <MyComponents.Skill skill={s} key={i}/>
    })

    return (
      <div className="card light-green" style={{"opacity": "0.9"}}>
        <div className="card-content">
        <div className="card-title white-text">Skills</div>
        <ul className="collection"> {skillElements} </ul>
        </div>
      </div>
    );
  }
});
