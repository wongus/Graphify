import React, { Component } from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { UserPlaylists as SpotifyUserPlaylists, SpotifyApiContext } from 'react-spotify-api'
import autobind from 'autobind-decorator';
import { User } from '../';
import { Bar } from 'react-chartjs-2';

export interface UserPlaylistsProps {
    auth: Auth0Authentication;
}

/**
 * @public
 * @export
 * @class User
 * @extends {Component<UserPlaylistsProps>}
 */
class UserPlaylists extends Component<any> {

    @autobind
    onClick(e, id) {
        e.preventDefault();
        this.props.history.push(`/playlists/${id}`);
    }

    render() {
        const data = {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
                {
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            indexAxis: 'y',
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                bar: {
                    borderWidth: 2,
                },
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Chart.js Horizontal Bar Chart',
                },
            },
        };
        const { authenticated } = this.props.auth;
        return (
            <div className="container">
                <div className='header'>
                    <h1 className='title'>Horizontal Bar Chart</h1>
                </div>
                {/* <Bar data={data} options={options} /> */}

                {authenticated && this.props.auth.accessToken && (
                    <SpotifyApiContext.Provider value={this.props.auth.accessToken}>
                        <h4><User auth={this.props.auth} {...this.props} />'s Playlists</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Tracks</th>
                                </tr>
                            </thead>
                            <tbody>
                                <SpotifyUserPlaylists options={{ limit: 50 }}>
                                    {(playlists, loading, error) =>
                                        playlists ? (
                                            playlists.items.map(playlist => (
                                                <tr key={playlist.id} onClick={(e) => this.onClick(e, playlist.id)}>
                                                    <td>{playlist.name}</td>
                                                    <td>{playlist.tracks.total}</td>
                                                </tr>

                                            ))
                                        ) : null
                                    }
                                </SpotifyUserPlaylists>
                            </tbody>
                        </table>
                    </SpotifyApiContext.Provider>

                )}
            </div>
        );
    }
}

export default UserPlaylists;
