
import Header from "./components/Header/Header";
import data from "./data/data.json"
import saturn from "./assets/saturn.png"

function App() {
  
  

  
  
  console.log(data);

  return (
    <div className='main'>
      <Header />
      <div className="welcomePage">
        <p>Welcome To The PLANET WEBSITE</p>
        <p>Press Menu To See Planet List</p>
      </div>
      <div className="mainPage">
        <p>Welcome To The PLANET WEBSITE</p>
        <p>Press Your Desired Planet To See Information About It</p>
      </div>
      

      

    </div>
  )
}

export default App
