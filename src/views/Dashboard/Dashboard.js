import { Component } from 'react';

import { fetchAppsByQuery } from '../../services/appsApi';

import Modal from '../../components/Modal/Modal';
import EditAppForm from '../../components/EditAppForm/EditAppForm';

export default class Dashboard extends Component {
  state = {
    apps: [],
    appId: null,
    editModalVisible: false,
  };

  componentDidMount() {
    fetchAppsByQuery('').then((res) => this.setState({ apps: res.rows }));
  }

  openEditForm = (appId) => {
    this.setState({
      editModalVisible: true,
      appId,
    });
  };

  closeEditForm = () => {
    this.setState({
      editModalVisible: false,
      appId: null,
    });
  };

  handleEditApp = (data) => {
    this.closeEditForm(); // Або сповіщення відображати можна

    this.setState((prevState) => {
      return {
        apps: prevState.apps.map((app) => (app.id === data.id ? data : app)),
      };
    });
  };

  render() {
    const { apps, editModalVisible, appId } = this.state;

    return (
      <div>
        {editModalVisible && (
          <Modal onClose={this.closeEditForm}>
            <EditAppForm appId={appId} onSuccess={this.handleEditApp} />
          </Modal>
        )}

        <h1>Dashboard</h1>
        <ul>
          {apps.map((app) => (
            <li key={app.id}>
              <button type="button" onClick={() => this.openEditForm(app.id)}>
                {app.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
