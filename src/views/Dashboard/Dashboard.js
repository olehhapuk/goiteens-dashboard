import { Component } from 'react';
import { toast } from 'react-toastify';

import { fetchAppDetails, fetchAppsByQuery } from '../../services/appsApi';

import Modal from '../../components/Modal/Modal';
import EditAppForm from '../../components/EditAppForm/EditAppForm';

export default class Dashboard extends Component {
  state = {
    apps: [],
    appId: null,
    editModalVisible: false,
    query: '',
    page: 1,
    appsCount: 0,
  };

  componentDidMount() {
    this.fetchApps();
  }

  fetchApps = () => {
    const { query, page } = this.state;

    fetchAppsByQuery(query, page).then((res) =>
      this.setState((prevState) => {
        return {
          apps: [...prevState.apps, ...res.rows],
          page: prevState.page + 1,
          appsCount: res.count,
        };
      })
    );
  };

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
    // this.closeEditForm(); // Або сповіщення відображати можна
    toast.success('App successfully edited');

    this.setState((prevState) => {
      return {
        apps: prevState.apps.map((app) => (app.id === data.id ? data : app)),
      };
    });
  };

  render() {
    const { apps, editModalVisible, appId, appsCount } = this.state;

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
              <img
                src={'https://goiteens-dashboard.herokuapp.com/' + app.image}
                alt={app.title}
                width="70"
                height="70"
              />
              <button type="button" onClick={() => this.openEditForm(app.id)}>
                {app.title}
              </button>
            </li>
          ))}
        </ul>

        <br />
        <hr />
        <br />

        {/* {apps.length !== appsCount && (
          <button type="button" onClick={this.fetchApps}>
            Load more
          </button>
        )} */}
        <button
          type="button"
          disabled={apps.length === appsCount}
          onClick={this.fetchApps}
        >
          Load more
        </button>
      </div>
    );
  }
}
