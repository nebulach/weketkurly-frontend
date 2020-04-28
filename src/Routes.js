import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Detail from "./Pages/Detail/Detail.js";
import Join from "./Pages/Join/Join";
import JoinComplete from "./Pages/JoinComplete/JoinComplete";
import Main from "./Pages/Main/Main";
import Nav from "./Components/Layout/Nav";
import Footer from "./Components/Layout/Footer";
import EventMain from "./Pages/EventMain/EventMain";
import Login from "./Pages/Login/Login";
import ItemCart from "./Pages/ItemCart/ItemCart";
import CategoryView from "./Pages/CategoryView/CategoryView";
import NewCategoryView from "./Pages/CategoryView/NewCategoryView";
import BestCategoryView from "./Pages/CategoryView/BestCategoryView";
import SaleCategoryView from "./Pages/CategoryView/SaleCategoryView";
import Order from "./Pages/Order/Order";
import OrderList from "./Pages/OrderList/OrderList";
import SearchPage from "./Pages/CategoryView/SearchPage.js";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/joincomplete" component={JoinComplete} />
          <Route exact path="/footer" component={Footer} />
          <Route exact path="/nav" component={Nav} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/login" component={Login} />
          <Route path="/categoryview" component={CategoryView} />
          <Route path="/newproducts" component={NewCategoryView} />
          <Route path="/best" component={BestCategoryView} />
          <Route path="/sale" component={SaleCategoryView} />
          <Route path="/detail" component={Detail} />
          <Route exact path="/footer" component={Footer} />
          <Route exact path="/itemcart" component={ItemCart} />
          <Route exact path="/eventmain" component={EventMain} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/orderlist" component={OrderList} />
          <Route path="/search" component={SearchPage} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
