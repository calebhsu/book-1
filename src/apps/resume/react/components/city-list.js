MyComponents.City = React.createClass({

  render: function() {
    return (
      <div className="col s6">
        <div className="card small"> 
          <div className="card-image">
            <img className="responsive-img activator" src={this.props.city.image}/>
            <span className="card-title">{this.props.city.name}</span>
          </div>
          <div className="card-content">
              <span className="card-title activator">{this.props.city.summary}, {this.props.city.current}&deg; F</span>
              <p><b>High: </b>{this.props.city.high}&deg;, <b>Low: </b>{this.props.city.low}&deg;</p>
          </div>
        </div>
      </div>
    );
  }

});

MyComponents.CityList = React.createClass({
  render: function() {

    var cityElements = this.props.cities.map(function(c,i){
      return <MyComponents.City city={c} key={i}/>
    })

    return (
      <div className="row">
        {cityElements}
      </div>
    );
  }
});
