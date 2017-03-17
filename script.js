const heroesWrap = document.getElementById('heroes');

function request () {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'http://swapi.co/api/people/?format=json');
  xhr.send();

  xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return;

    if (this.status !== 200) { console.error(this.status, this.statusText); return; }

    render(this.response);
  };
}

function parseResponse(response) {
  return JSON.parse(response);
}

function render(response) {
  const data = parseResponse(response);
  const length = data.results.length;

  for (let i = 0; i < length; i++) {
  	let name = data.results[i].name;
  	let height = data.results[i].height;
  	let mass = data.results[i].mass;
  	let hairColor = data.results[i].hair_color;
  	let skinColor = data.results[i].skin_color;
  	let eyeColor = data.results[i].eye_color;
  	let birthYear = data.results[i].birth_year;
  	let gender = data.results[i].gender;

  	const hero = new Hero (name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender);
  	
  	heroesWrap.appendChild(hero.render());
  }
 
}

class Hero {
  constructor(name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender) {
    this.name = name;
    this.height = height;
    this.mass = mass;
    this.hairColor = hairColor;
    this.skinColor = skinColor;
    this.eyeColor = eyeColor;
    this.birthYear = birthYear;
    this.gender = gender;
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('hero');
    element.innerHTML = `
		<span class="hero-name">
			<p>${this.name}</p>
		</span>
		<ul class="hero-data">
			<li class="height">height: ${this.height}</li>
			<li class="mass">mass: ${this.mass}</li>
			<li class="hair-color">hair color: ${this.hairColor}</li>
			<li class="skin-color">skin-color: ${this.skinColor}</li>
			<li class="eye-color">eye color: ${this.eyeColor}</li>
			<li class="birth-year">birth-year: ${this.birthYear}</li>
			<li class="gender">gender: ${this.gender}</li>
		</ul>
    `;

    return element;
  }
}
request ();