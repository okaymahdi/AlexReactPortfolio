import Hero from './Components/Home/Hero';
import NavBar from './Components/Shared/NavBar';

const App = () => {
  return (
    <div className='min-h-screen bg-black'>
      <NavBar />
      <main>
        <Hero />
      </main>
    </div>
  );
};

export default App;
