import React, {
  Component
} from 'react';

// const About = props => {
//   return <h1>estamos en about us!</h1>
// }
class About extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      params: {
        id
      }
    } = this.props.match;
    console.log(`viendo el perfil de ${id}`);
  }

  render() {
    return <h1> estamos en el perfil de {this.props.match.params.id}! </h1>
  }
}

export default About;