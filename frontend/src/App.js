import UsersComponent from "./components/UsersComponent";
import ShipsComponent from './components/ShipsComponent';
import PlanetComponent from "./components/PlanetComponent";

function App() {
  return (
    <div>
      <nav className="navbar navbar-primary bg-primary">
        <h1 className="text-white">API's consumption interface</h1>
      </nav>
      <UsersComponent></UsersComponent>
      <ShipsComponent></ShipsComponent>
      <PlanetComponent></PlanetComponent>
    </div>
  );
}

export default App;
