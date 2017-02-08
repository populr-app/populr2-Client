"use strict";!function(){function e(e,t,n){e.hashPrefix(""),t.otherwise("/#"),n.state("home",{url:"/?list",templateUrl:"views/home/homeV.html",controller:"homeC as homeC"}).state("about",{url:"/about",templateUrl:"views/about/aboutV.html",controller:"aboutC as aboutC",sidebar:"about"}).state("admin",{url:"/admin",templateUrl:"views/admin/adminV.html",controller:"adminC as adminC",sidebar:"admin"}).state("userCreate",{url:"/admin/create",templateUrl:"views/userCreate/userCreateV.html",controller:"userCreateC as userCreateC",sidebar:"admin"}).state("userEdit",{url:"/admin/:id",templateUrl:"views/userEdit/userEditV.html",controller:"userEditC as userEditC",sidebar:"admin"}).state("user",{url:"/:id",templateUrl:"views/user/userV.html",controller:"userC as userC"})}e.$inject=["$locationProvider","$urlRouterProvider","$stateProvider"],angular.module("populr",["ui.router"]).config(e)}(),function(){function e(){return{templateUrl:"components/ui-sidebar/ui-sidebarV.html"}}function t(e,t){this.state=e,this.stateParams=t}t.$inject=["$state","$stateParams"],angular.module("populr").directive("uiSidebar",e).controller("uiSidebarC",t)}(),function(){function e(e,t){function n(n){return e.post("/auth/login",n).then(function(e){return t.set("jwt",e.token)})}function i(){return!!t.get("jwt")}function a(){return Promise.resolve().then(function(){return t.remove("jwt")})}return{login:n,isAuth:i,logout:a}}e.$inject=["API","LS"],angular.module("populr").factory("AuthAPI",e)}(),function(){function e(e){function t(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e(Object.assign({method:"GET",url:s+t},n)).then(function(e){return n.returnFull?e:e.data})}function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t(e,Object.assign({method:"GET"},n))}function i(e,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return t(e,Object.assign({method:"POST",data:n},i))}function a(e,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return t(e,Object.assign({method:"PUT",data:n},i))}function r(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t(e,Object.assign({method:"DELETE"},n))}var s="http://mc.garrett.io:9001";return{request:t,get:n,post:i,put:a,destroy:r}}e.$inject=["$http"],angular.module("populr").factory("API",e)}(),function(){function e(e){function t(t){return e.localStorage.getItem(""+a+t)}function n(t,n){return e.localStorage.setItem(""+a+t,n)}function i(t){return e.localStorage.removeItem(""+a+t)}var a="io.populr.";return{get:t,set:n,remove:i}}e.$inject=["$window"],angular.module("populr").factory("LS",e)}(),function(){function e(e){function t(){return e.get("/users")}function n(){return e.get("/users/top")}function i(t){return e.post("/users",t)}function a(t,n){return e.post("/users/"+t,n)}function r(t){return e.get("/users/"+t)}function s(t){return e.destroy("/users/"+t)}return{getAll:t,getTop:n,create:i,update:a,destroy:s,get:r}}e.$inject=["API"],angular.module("populr").factory("UsersAPI",e)}(),function(){function e(e){var t=this;e.getAll().then(function(e){return t.users=e})}e.$inject=["UsersAPI"],angular.module("populr").controller("adminC",e)}(),function(){function e(){}angular.module("populr").controller("homeC",e)}(),function(){function e(){}angular.module("populr").controller("aboutC",e)}(),function(){function e(){}angular.module("populr").controller("userC",e)}(),function(){function e(e,t){var n=this;this.create=function(){return e.create({displayName:n.displayName}).then(function(e){return t.go("userEdit",{id:e.id})})}}e.$inject=["UsersAPI","$state"],angular.module("populr").controller("userCreateC",e)}(),function(){function e(e,t,n){var i=this;e.get(t.id).then(function(e){i.user={displayName:e.displayName,id:e.id,info:{id:e.info.id,image:e.info.image,occupation:e.info.occupation,wikiUrl:e.info.wikiUrl,bio:e.info.bio},twitter:{id:e.twitter.id,handle:e.twitter.handle},news:{id:e.news.id,queries:e.news.queries}}}),this.destroy=function(){return e.destroy(t.id).then(function(){return n.go("admin")})},this.save=function(){return e.update(i.user.id,i.user)}}e.$inject=["UsersAPI","$stateParams","$state"],angular.module("populr").controller("userEditC",e)}(),angular.module("populr").run(["$templateCache",function(e){e.put("components/ui-sidebar/ui-sidebarV.html",'<div ng-controller="uiSidebarC as uiSidebarC" class="f1 col">\n  <a href="#/" class="logo">populr</a>\n  <a href="#/?list=a" class="list-item" ng-class="{active: uiSidebarC.stateParams.list === \'a\' || (uiSidebarC.state.current.name === \'home\' && !uiSidebarC.stateParams.list)}">a-list</a>\n  <a href="#/?list=b" class="list-item" ng-class="{active: uiSidebarC.stateParams.list === \'b\'}">b-list</a>\n  <a href="#/?list=c" class="list-item" ng-class="{active: uiSidebarC.stateParams.list === \'c\'}">c-list</a>\n  <a href="#/?list=d" class="list-item" ng-class="{active: uiSidebarC.stateParams.list === \'d\'}">d-list</a>\n  <div class="f1"></div>\n  <a class="list-item" ng-class="{active: uiSidebarC.state.current.sidebar === \'admin\'}" href="#/admin">admin</a>\n  <a class="list-item" ng-class="{active: uiSidebarC.state.current.sidebar === \'about\'}" href="#/about">about</a>\n  <span class="copy">© 2017 populr.io</span>\n</div>\n'),e.put("views/admin/adminV.html",'<div class="f1 adminV row jcc">\n  <div class="f1 contained col">\n    <div class="header row">\n      <input ng-model="adminC.search" class="heading" placeholder="Search Users...">\n      <a class="create" href="#/admin/create">+</a>\n    </div>\n    <div class="list f1">\n      <a href="#/admin/{{user.id}}" ng-repeat="user in adminC.filtered = (adminC.users | filter:adminC.search)" class="list-item row aic">\n        <div class="img" style="background-image: url({{user.info.image}})">\n          <span class="position row aic jcc">{{user.position}}</span>\n        </div>\n        <span class="name">{{user.displayName}}</span>\n      </a>\n      <span class="placeholder row jcc" ng-if="!adminC.filtered.length">No Users</span>\n    </div>\n  </div>\n</div>\n'),e.put("views/home/homeV.html",'<div class="f1 homeV col">\n  <div class="jumbotron row jcc">\n    <div class="contained">\n      <span class="heading">Intelligent Social Metrics</span>\n      <p>Populr.io takes data from top social networks and news sites to rank the movers and shakers of the internet. Updated periodically, Populr.io provides the latest on your favorite celebrities, athletes, and public figures.</p>\n    </div>\n  </div>\n  <span class="placeholder">Nothing here yet, check back later!</span>\n</div>'),e.put("views/about/aboutV.html",'<div class="f1 aboutV col aic jcc">\n  <span>Team bio here eventually.</span>\n</div>'),e.put("views/user/userV.html",'<div class="f1 userV">\n  <h1>User View</h1>\n</div>'),e.put("views/userCreate/userCreateV.html",'<div class="f1 userCreateV col aic jcc">\n  <input type="text" ng-model="userCreateC.displayName" placeholder="Celebrity Name" autofocus="true">\n  <button ng-click="userCreateC.create()">Create</button>\n</div>\n'),e.put("views/userEdit/userEditV.html",'<div class="f1 userEditV">\n  <div class="jumbotron row jcc">\n    <div class="contained f1 row aic">\n      <div class="img" style="background-image: url({{userEditC.user.info.image}})"></div>\n      <div class="meta col">\n        <span class="name">{{userEditC.user.displayName}}</span>\n        <span class="occupation">{{userEditC.user.info.occupation}}</span>\n      </div>\n      <div class="actions row">\n        <button ng-click="userEditC.save()">Save</button>\n        <button class="delete" ng-click="userEditC.destroy()">Delete</button>\n      </div>\n    </div>\n  </div>\n  <div class="row jcc">\n    <div class="form contained f1 col">\n      <label>Display Name</label>\n      <input ng-model="userEditC.user.displayName" type="text">\n      <label>Avatar</label>\n      <input ng-model="userEditC.user.info.image" type="text">\n      <label>Occupation</label>\n      <input ng-model="userEditC.user.info.occupation" type="text">\n      <label>Twitter Handle</label>\n      <input ng-model="userEditC.user.twitter.handle" type="text">\n      <label>Wikipedia Link</label>\n      <input ng-model="userEditC.user.info.wikiUrl" type="text">\n      <label>News Query</label>\n      <input ng-model="userEditC.user.news.queries" type="text">\n      <label>Bio</label>\n      <textarea ng-model="userEditC.user.info.bio"></textarea>\n    </div>\n  </div>\n</div>\n')}]);