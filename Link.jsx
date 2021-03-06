Link = React.createClass({
  propTypes: {
    // require data proto --> contains all link info
    data: React.PropTypes.object.isRequired
  },

  // set state of svgs to empty array
  getInitialState () { 
    return {svgs: []}
  },

  presentation () {
    // declare identifier variables in function scope
    let user = Meteor.user()._id;
    let link = this.props.data.link;
    let gid = this.props.data.gid;
    let react = this;
    // opens a query and waits for a change to occur
    Presentations.find({gid: gid.toString()}).observe({
      added: function (newDoc) {
        console.log('we have a change', newDoc);
        react.setState({svgs: newDoc.svgs});

      }
    });
    // call method to create a 
    Meteor.call('createPresentation', link, user, gid, function (err, result) {
      if(err){
        console.error(err);
      };
    })
  }, 

  svgs () {
    return <div>{this.state.svgs[0]}</div>
  },
  makeSlides () { 
    if(this.state.svgs.length > 0){
      console.log("trying to make slides")
      return <Slides svgs={this.state.svgs} />
    }
  },

  render () {
    return (
      <li>
        <div onClick={this.presentation}>
          <img src={this.props.data.thumbnail}/>
          <h1>{this.props.data.title}</h1>
        </div>
        {this.makeSlides()}
      </li>
    )
  }
})
