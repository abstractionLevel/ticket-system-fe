import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskPage from './page/taskPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<TaskPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
