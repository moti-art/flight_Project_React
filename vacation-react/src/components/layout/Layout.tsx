import React, { Component } from 'react'
import "./layout.css"
import Header from '../header/Header';
import Menu from '../menu/Menu'
import Login from '../login/Login'
import Footer from '../footer/Footer'
import {Switch,Route,BrowserRouter,Redirect} from 'react-router-dom'
import register from "../register/register"
import admin from '../admin/admin';
import user from '../user/user';
import addVacation from '../admin/addVacation';
import editVacation from "../admin/editVacation"
import charts from '../admin/charts';



export default class Layout extends Component {
    render() {
        return (
            <BrowserRouter>
          
            <section className="layout">
            <header>
             <Header />
            </header>

            <aside>
               <Menu />
            </aside>

            <main>
               
                    <Switch>
                      <Route path="/" component={Login} exact/>
                      <Route path="/register" component={register} exact/>
                      <Route path="/admin" component={admin} exact />
                      <Route path="/user/:id" component={user} exact />
                      <Route path="/addVacation" component={addVacation} exact />
                      <Route path="/charts" component={charts} exact />
                      <Route path="/editVacation/:id" component={editVacation} exact />
                      <Redirect from="/" to="/home" exact />
                    </Switch>
            </main>

            <footer>
                <Footer />
            </footer>

        </section>
        </BrowserRouter>
        )
    }
}
