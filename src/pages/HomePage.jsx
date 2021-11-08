import Cookies from "js-cookie";

export default function HomePage() {

  return (
    <div className="homePage">
      <section className="header"></section>
      {Cookies.get("userName") ? 
      "Welcome " + Cookies.get("userName") : 
      null}
    </div>
  );
}
