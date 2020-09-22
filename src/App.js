import React from 'react';
import List from "./components/List";
import listSvg from "./assets/img/burger.png";


function App() {

	return (
		<div className="todo-wrapper">
			<div className="todo">
				<div className="todo__sidebar">
					<List props={[
						{
							icon: listSvg,
							label: 'Все задачи',
							active: true,
						}
					]}></List>
					<List props={[
						{
							color: '#42B883',
							label: 'Покупки',
						},
						{
							color: '#64C4ED',
							label: 'Фронтентд',
						},
						{
							color: '#FFBBCC',
							label: 'Фильмы и сериалы',
						}
					]}></List>
				</div>
				<div className="todo__tasks">

				</div>
			</div>
		</div>
	);
}

export default App;
