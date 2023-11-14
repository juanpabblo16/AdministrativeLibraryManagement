import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import Book from './CreateBook.jsx'
import Login from '../components/LoginPage.jsx'
import AuthorCreation from '../components/AuthorCreation.jsx';


class MyComponent extends Component {

    handleShowBook = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Book/>
            </React.StrictMode>
        );
    }

    handleShowLogin = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Login/>
            </React.StrictMode>
        );
    }

    handleShowAuthor = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <AuthorCreation/>
            </React.StrictMode>
        );
    }

    render() {
        return (
            <div>
                <style>
                    {`
            #bg {
              position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: #000; 
            background: -moz-linear-gradient(top, #000 0%, #FFA500 100%); 
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #000), color-stop(100%, #FFA500)); 
            background: -webkit-linear-gradient(top, #000 0%, #FFA500 100%); 
            background: -o-linear-gradient(top, #000 0%, #FFA500 100%); 
            background: -ms-linear-gradient(top, #000 0%, #FFA500 100%); 
            background: linear-gradient(to bottom, #000 0%, #FFA500 100%); 
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#000', endColorstr='#FFA500', GradientType=0); 
            }

            section {
              position: relative;
              width: 640px;
              margin: 50px auto;
            }

            nav {
              width: 100%;
            }

            nav ul li {
              display: inline-block;
              list-style: none;
              width: 160px;
              text-align: center;
              font-family: Helvetica, sans-serif;
              border: 1px dashed rgba(255, 255, 255, 0);
              color: #fff;
              padding: 10px 0 10px 0;
              margin: -1px -5px -1px -1px;
              cursor: pointer;
              transition: all 0.2s;
              -webkit-transition: all 0.2s;
            }

            nav ul li:hover {
              background: rgba(60, 65, 60, 0.1);
            }

            nav ul {
              border: 1px solid #fff;
              position: absolute;
              width: 100%;
              padding: 0;
              z-index: 100;
            }

            nav div {
              position: absolute;
              left: 0;
              top: 16px;
              background: #fff;
              width: 162px;
              height: 40px;
              z-index: 99;
            }

            .active {
              color: rgba(240, 240, 240);
              backgraound: black;
            }
            

          `}
                </style>
                <div id="bg"></div>
                <section>
                    <nav>
                        <ul>
                            <li data-xcoord="0px" className="active" onClick={() => this.handleNavClick("0px")}>
                                Home Page
                            </li>
                            <li data-xcoord="160px" onClick={() => this.handleShowBook()}>
                                Books
                            </li>
                            <li data-xcoord="320px" onClick={() => this.handleShowAuthor()}>
                                Authors
                            </li>
                            <li data-xcoord="480px" onClick={() => this.handleShowLogin()}>
                                End Sesion
                            </li>
                        </ul>
                    </nav>
                </section>
            </div>
        );
    }
}

export default MyComponent;
