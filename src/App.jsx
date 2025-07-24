import { ScrollTrigger, SplitText } from 'gsap/all';
import gsap from 'gsap';
import Navbar from './component/Navbar';


gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main className='h-[200vh]'>
      <Navbar />
    </main>
  );
}

export default App;