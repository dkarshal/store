// import React, { useContext, useState } from "react";
// import { Container, Form } from "react-bootstrap";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import Row from "react-bootstrap/Row";
// import { NavLink, useLocation, useHistory } from "react-router-dom";
// import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
// import { observer } from "mobx-react-lite";
// import { Context } from "../index";

// const Auth = observer(() => {
//   const { user } = useContext(Context);
//   const location = useLocation();
//   const isLogin = location.pathname === LOGIN_ROUTE;

//   return (
//     <Container
//       className="d-flex justify-content-center align-items-center"
//       style={{ height: window.innerHeight - 54 }}
//     >
//       <Card style={{ width: 600 }} className="p-5">
//         <h2 className="m-auto">{isLogin ? "Log in" : "Registration"}</h2>
//         <Form className="d-flex flex-column">
//           <Form.Control className="mt-3" placeholder="Enter your email..." />
//           <Form.Control className="mt-3" placeholder="Enter your password..." />
//           <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
//             {isLogin ? (
//               <div className="col">
//                 No account? <NavLink to={REGISTRATION_ROUTE}>Register</NavLink>
//               </div>
//             ) : (
//               <div className="col">
//                 Have an account? <NavLink to={LOGIN_ROUTE}>Log in</NavLink>
//               </div>
//             )}
//             <div className="col-auto">
//               <Button variant={"outline-success"}>
//                 {isLogin ? "Log in" : "Register"}
//               </Button>
//             </div>
//           </Row>
//         </Form>
//       </Card>
//     </Container>
//   );
// });

// export default Auth;

import React, { useContext, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [pwd, setPassword] = useState("");

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, pwd);
      } else {
        data = await registration(email, pwd);
      }
      user.setUser(user);
      user.setIsAuth(true);
      history(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Log in" : "Registration"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter your password..."
            value={pwd}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                No account?{" "}
                <NavLink to={REGISTRATION_ROUTE}>Create one!</NavLink>
              </div>
            ) : (
              <div>
                Have an account? <NavLink to={LOGIN_ROUTE}>Log in</NavLink>
              </div>
            )}
            <Button variant={"outline-success"} onClick={click}>
              {isLogin ? "Log in" : "Registration"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
