import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { NavLink } from 'react-router-dom';

export interface NavProps {
    auth: Auth0Authentication;
}

class Nav extends Component<NavProps, {}> {
    @autobind
    login() {
        this.props.auth.login();
    }

    @autobind
    logout() {
        this.props.auth.logout();
    }

    render() {
        const { authenticated } = this.props.auth;
        return (
            <div>
                <div className="relative bg-black shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="flex justify-between items-center border-b-2 border-gray-900 py-6 md:justify-start md:space-x-10">
                            <div className="flex justify-start lg:w-0 lg:flex-1">
                                <NavLink className="text-2xl text-gray-200 hover:text-gray-300 hover:no-underline" to="/">
                                    Graphify
                                </NavLink>
                            </div>

                            <div className="-mr-2 -my-2 md:hidden">
                                <button type="button" className="bg-black rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                                    <span className="sr-only">Open menu</span>
                                    {/* <!-- Heroicon name: outline/menu --> */}
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>

                            {authenticated && (
                                <nav className="hidden md:flex space-x-10">
                                    <a href="#" className="hover:no-underline text-base font-medium text-gray-300 hover:text-gray-400">
                                        Pricing
                                        </a>
                                    <a href="#" className="hover:no-underline text-base font-medium text-gray-300 hover:text-gray-400">
                                        Docs
                                        </a>
                                    <a href="#" className="hover:no-underline text-base font-medium text-gray-300 hover:text-gray-400">
                                        Yes
                                        </a>
                                </nav>

                            )}

                            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                                {authenticated && (
                                    <button type="submit" onClick={this.logout} className="text-base font-medium text-gray-300 hover:text-gray-400">
                                        Log out
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Nav;