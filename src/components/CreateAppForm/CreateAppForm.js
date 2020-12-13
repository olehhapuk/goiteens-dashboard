import { Component } from 'react';

import { createApp } from '../../services/appsApi';

// Image preview
// https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa

// title: 3-64
// description: 3-unlimited
// link: 3-512
// image: no validation

export default class CreateAppForm extends Component {
  state = {
    image: null,
    title: '',
    errors: {},
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  handleTitleChange = (e) => {
    const value = e.target.value;

    if (value.length < 3 || value.length > 64) {
      this.setState((prevState) => {
        return {
          errors: {
            ...prevState.errors,
            title: 'Title should 3 to 64 characters long',
          },
        };
      });
    }

    this.setState({
      title: value,
    });
  };

  handleCreateApp = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', 'My App 1');
    formData.append('description', 'Very cool app');
    formData.append('link', 'https://google.com');
    formData.append('image', this.state.image);

    createApp(formData)
      .then((res) => console.log(res))
      .catch((error) => console.dir(error));
  };

  render() {
    const { title, errors } = this.state;

    return (
      <form onSubmit={this.handleCreateApp}>
        <input type="file" accept="image/*" onChange={this.handleImageChange} />
        <button type="submit">Create App</button>
      </form>
    );
  }
}
