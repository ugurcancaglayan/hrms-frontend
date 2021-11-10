import Cookies from "js-cookie";

export default function HomePage() {

  return (
    <div className="homePage">
      Home Page
      <section className="header"></section>
      {Cookies.get("userName") ? 
      "Welcome " + Cookies.get("userName") : 
      null}
    </div>
  );
}
