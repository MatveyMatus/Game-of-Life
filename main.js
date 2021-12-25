let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let mas = [];
let count = 0;
let timer;
//реализация выбора рисунка
canvas.onclick = function(event){
	let x = event.offsetX;
	let y = event.offsetY;
	x = Math.floor(x/10);
	y = Math.floor(y/10);
	mas[y][x] = 1;
	draw();
}
//создание поля
function goLife(){
	let n = 100, m = 100;
	for (let i = 0; i < m; ++i){
		mas[i]=[];
		for (let j = 0; j < n; ++j){
			mas[i][j] = 0;
		}
	}
}
goLife();

//отрисовка клеток
function draw(){
	ctx.clearRect(0, 0, 1000, 1000);
	for (let i = 0; i < 100; ++i){
		for (let j = 0; j < 100; ++j){
			if (mas[i][j] == 1){
				ctx.fillRect(j*10, i*10, 10, 10);				
			}
		}
	}
}

//аналог жизни клетки
function startLife(){
	let mas2 = [];
	for (let i = 0; i < 100; ++i){
		mas2[i]=[];
		for (let j = 0; j < 100; ++j){
			let neighbors = 0;
			//соседка сверху
			if (mas[infField1(i)-1][j] == 1)
				neighbors++;
			//соседка справа
			if (mas[i][infField2(j)+1] == 1)
				neighbors++;
			//соседка снизу
			if (mas[infField2(i)+1][j] == 1)
				neighbors++;
			//соседка слева
			if (mas[i][infField1(j)-1] == 1)
				neighbors++;
			//соседка сверху-справа
			if (mas[infField1(i)-1][infField2(j)+1] == 1)
				neighbors++;
			//соседка снизу-справа
			if (mas[infField2(i)+1][infField2(j)+1] == 1)
				neighbors++;
			//сосоедка снизу-слева
			if (mas[infField2(i)+1][infField1(j)-1] == 1)
				neighbors++;
			//сосоедка сверху-слева
			if (mas[infField1(i)-1][infField1(j)-1] == 1)
				neighbors++;
			//жизнь клетке или же смерть клетки
			if (neighbors == 2 || neighbors == 3)
				mas2[i][j] = 1;
			else
				mas2[i][j] = 0;
		}
	}
	mas = mas2;
	draw();
	count++;
	timer = setTimeout(startLife, 500);
}

//реализация беконечного поля
function infField1(i){
	if (i == 0)
		return 100
	else
		return i
}
function infField2(i){
	if (i == 99)
		return -1
	else
		return i
}

document.getElementById('start').onclick = startLife;