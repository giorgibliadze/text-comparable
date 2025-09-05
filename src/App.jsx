
import './App.css'
import Layout from "./components/Layout";
import Toolbar from "./components/Toolbar";
import Panels from "./components/Panels";

function App() {


  return (
    <>
      <Layout>
        <div className="max-w-7xl mx-auto">
          <Toolbar />
          <Panels />
        </div>
      </Layout>

    </>
  )
}

export default App
