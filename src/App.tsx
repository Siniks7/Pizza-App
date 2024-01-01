import Button from './components/Button/Button';
import Input from './components/Input/Input';

function App() {

	return (
		<>
			<div className='wrapper' >
				<Input placeholder='Email'></Input>
				<Button appearence = 'big'  >Вход!</Button>
			</div>
		</>
	);
}

export default App;
