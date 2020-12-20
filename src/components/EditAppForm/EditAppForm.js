import { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchAppDetails, editApp } from '../../services/appsApi';

export default class EditAppForm extends Component {
  static propTypes = {
    appId: PropTypes.number.isRequired,
    onSuccess: PropTypes.func.isRequired,
  };

  state = {
    title: '',
    link: '',
    description: '',
    image: null,
  };

  componentDidMount() {
    fetchAppDetails(this.props.appId).then((res) =>
      this.setState({
        title: res.title,
        link: res.title,
        description: res.description,
      })
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { title, image, link, description } = this.state;
    const formData = new FormData();

    formData.append('title', title);
    formData.append('image', image);
    formData.append('link', link);
    formData.append('description', description);

    editApp(this.props.appId, formData).then((res) =>
      this.props.onSuccess(res)
    );
  };

  render() {
    const { title, image } = this.state;
    const imageUrl = image
      ? URL.createObjectURL(image)
      : 'https://via.placeholder.com/150';

    return (
      <form onSubmit={this.handleFormSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>

        <br />

        <div>
          <img src={imageUrl} width="150" height="150" alt="App icon preview" />

          <input
            type="file"
            accept="image/*"
            onChange={this.handleImageChange}
          />
        </div>

        <br />

        <button type="submit">Edit App</button>
      </form>
    );
  }
}
