(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{44:function(e,t,n){},77:function(e,t,n){"use strict";n.r(t);var a=n(7),o=n.n(a),i=n(34),l=n.n(i),c=(n(44),n(15)),s=n(20),d=n(35),r=n(36),h=n(1),u=n(39),b=n(38),j=n(37),m=n.n(j)()("wss://um-toothpoly.herokuapp.com:".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).PORT),{transports:["websocket"]}),p=n(0),O=function(e){Object(u.a)(n,e);var t=Object(b.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).state={roomCode:"",counter:0,playerName:"",players:""},a.handleChange=a.handleChange.bind(Object(h.a)(a)),a.handleJoinGame=a.handleJoinGame.bind(Object(h.a)(a)),a.handleNewGame=a.handleNewGame.bind(Object(h.a)(a)),a.handleClick=a.handleClick.bind(Object(h.a)(a)),a.handleUpdateCounter=a.handleUpdateCounter.bind(Object(h.a)(a)),a.handleInit=a.handleInit.bind(Object(h.a)(a)),a.handleGameCode=a.handleGameCode.bind(Object(h.a)(a)),a.handleUpdatePlayerList=a.handleUpdatePlayerList.bind(Object(h.a)(a)),a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){m.on("updateCounter",this.handleUpdateCounter),m.on("init",this.handleInit),m.on("gameCode",this.handleGameCode),m.on("updatePlayerList",this.handleUpdatePlayerList)}},{key:"handleChange",value:function(e){this.setState(Object(s.a)(Object(s.a)({},this.state),{},Object(c.a)({},e.target.name,e.target.value)))}},{key:"handleInit",value:function(e){console.log("player "+e+" connected to room")}},{key:"handleGameCode",value:function(e){console.log("code is "+e),this.setState({roomCode:e})}},{key:"handleJoinGame",value:function(e){this.props.socket.emit("joinGame",this.state),e.preventDefault()}},{key:"handleNewGame",value:function(e){this.props.socket.emit("newGame"),e.preventDefault()}},{key:"handleClick",value:function(e){console.log("clicked"),this.props.socket.emit("counter"),e.preventDefault()}},{key:"handleUpdateCounter",value:function(e){console.log("received "+e),this.setState({counter:e})}},{key:"handleUpdatePlayerList",value:function(e){console.log("received "+e),this.setState({players:e})}},{key:"render",value:function(){return Object(p.jsxs)("div",{children:[Object(p.jsx)("button",{onClick:this.handleNewGame,children:"New Game"}),Object(p.jsx)("label",{}),Object(p.jsxs)("form",{onSubmit:this.handleJoinGame,children:[Object(p.jsxs)("label",{children:["Room:",Object(p.jsx)("input",{type:"text",name:"roomCode",value:this.state.roomCode,onChange:this.handleChange})]}),Object(p.jsxs)("label",{children:["Name:",Object(p.jsx)("input",{type:"text",name:"playerName",value:this.state.playerName,onChange:this.handleChange})]}),Object(p.jsx)("input",{type:"submit",value:"go!"})]}),Object(p.jsxs)("button",{onClick:this.handleClick,children:["Counter: ",this.state.counter]}),Object(p.jsxs)("p",{children:["Players: ",this.state.players]})]})}}]),n}(o.a.Component);var C=function(){return Object(p.jsx)("div",{children:Object(p.jsx)(O,{socket:m})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(Object(p.jsx)(o.a.StrictMode,{children:Object(p.jsx)(C,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[77,1,2]]]);
//# sourceMappingURL=main.ea4edf2b.chunk.js.map