const nav = document.querySelector('.nav')
const burgerBtn = document.querySelector('.main__menu-icon')
const closeMenuBtn = document.querySelector('.closeBtn')
const plusBtns = document.querySelectorAll('.menu__box__plusBtn')
const ingredients = document.querySelectorAll('.menu__box__ingredients')
const minusBtns = document.querySelectorAll('.menu__box__minusBtn')
const links = document.querySelectorAll('.nav__links a')
const header = document.querySelector('#header')

// REVIEWS
const inputUsername = document.querySelector('.reviews__username')
const inputRate = document.querySelector('.reviews__numberStars')
const reviewArea = document.querySelector('.reviews__textarea')
const inputLink = document.querySelector('.reviews__linkToProfile')
const reviews = document.querySelector('.reviews__place')
const sendBtn = document.querySelector('.reviews__sendBtn')
const errorForm = document.querySelector('.reviews__error')
const reviewStars = document.querySelector('.reviews__stars')

// nav edit

function deleteFixed() {
	console.log(header.offsetHeight)
	if (window.scrollY > header.offsetHeight - 100) {
		nav.style.position = 'absolute'
		nav.style.opacity = 0
	} else {
		nav.style.position = 'fixed'
		nav.style.opacity = 1
	}
}
window.addEventListener('scroll', deleteFixed)

let newReview
let stars
const handleNav = () => {
	nav.classList.toggle('activeMenu')
	if (nav.classList.contains('activeMenu')) {
		nav.style.overflow = 'hidden'
	}
}

burgerBtn.addEventListener('click', handleNav)
closeMenuBtn.addEventListener('click', handleNav)

function showIng() {
	const item = this.nextElementSibling
	item.classList.toggle('active-ingredients')

	if (item.classList.contains('active-ingredients')) {
		this.classList.remove('fa-plus')
		this.classList.add('fa-minus')

		console.log(this)
	} else {
		this.classList.remove('fa-minus')
		this.classList.add('fa-plus')
	}
}
plusBtns.forEach(btn => btn.addEventListener('click', showIng))

//MENU

function closeMenu() {
	nav.classList.remove('activeMenu')
}

links.forEach(link => link.addEventListener('click', closeMenu))

// REVIEWS

const checkForm = e => {
	e.preventDefault()
	if (inputUsername.value === '' && reviewArea.value === '') {
		errorForm.textContent = 'Wypełnij wszystkie pola'
	} else if (Number(inputRate.value) > 5 || Number(inputRate.value) < 1) {
		errorForm.textContent = 'Ocena powinna wynosić od 1 do 5'
	} else {
		addReview()
	}
}

function addReview() {
	newReview = document.createElement('div')
	newReview.classList.add('reviews__box')

	if (inputLink.value === '') {
		inputLink.value = 'https://logodix.com/logo/1727545.png'
	}

	checkStars()
	newReview.innerHTML = `<img src="${inputLink.value}" class="reviews__profilPicture">
   <div class="reviews__name">${inputUsername.value}</div>
   <div class="reviews__stars">${reviewStars.innerHTML}</div>
   <div class="reviews__text">${reviewArea.value}</div>`

	reviews.appendChild(newReview)
	clearInputs()
}

const clearInputs = () => {
	inputUsername.value = ''
	inputLink.value = ''
	reviewArea.value = ''
	inputRate.value = ''
	errorForm.textContent = ''
}

const checkStars = () => {
	stars = parseInt(inputRate.value)

	switch (stars) {
		case 5:
			reviewStars.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i
         class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`
			break
		case 4:
			reviewStars.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i
         class="fas fa-star"></i><i class="fas fa-star"></i>`
			break
		case 3:
			reviewStars.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i
         class="fas fa-star"></i>`
			break
		case 2:
			reviewStars.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i>`
			break
		case 1:
			reviewStars.innerHTML = `<i class="fas fa-star"></i>`
			break
		default:
		// code block
	}
}

function animateReviews() {
	const rewievs = document.querySelectorAll('.reviews__box')

	rewievs.forEach(el => el.setAttribute('data-aos', 'fade-right'))
	rewievs.forEach(el => el.setAttribute('data-aos-once', 'true'))
	rewievs.forEach(el => el.setAttribute('data-aos-duration', '1000'))
}

animateReviews()

AOS.init()
// slider

let slideIndex = 0
showSlides()

function showSlides() {
	let i

	const slides = document.querySelectorAll('.about__slide')
	const dots = document.querySelectorAll('.about__dot')

	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none'
	}

	slideIndex++

	if (slideIndex > slides.length) {
		slideIndex = 1
	}

	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace('activeDot', '')
	}

	slides[slideIndex - 1].style.display = 'block'
	dots[slideIndex - 1].className += ' activeDot'
	setTimeout(showSlides, 2000)
}

sendBtn.addEventListener('click', checkForm)

// faq

const faqBtns = document.querySelectorAll('.about__faqBtn')
const faqTexts = document.querySelectorAll('.about__info')
const faq = document.querySelector('.about__faq')

function openFaq() {
	if (this.nextElementSibling.classList.contains('about__active')) {
		this.nextElementSibling.classList.remove('about__active')
	} else {
		closeFaq()
		this.nextElementSibling.classList.toggle('about__active')
	}
}

function closeFaq() {
	faqTexts.forEach(text => text.classList.remove('about__active'))
}

function closeFaqOutside(e) {
	console.log(e.target.className)

	if (e.target.className === 'about' || e.target.className === 'about__faq') {
		closeFaq()
	}
}

faqBtns.forEach(btn => btn.addEventListener('click', openFaq))
window.addEventListener('click', closeFaqOutside)

// MAP

const map = L.map('map').setView([51.23263121174079, 22.61439426074463], 14)

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution:
		'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1,
	accessToken: 'pk.eyJ1IjoicGxpY2hjaXUiLCJhIjoiY2t6Yms2eXc4MTN4NzJ1bzF5MGlmdmxkZyJ9.RQ4ZxpcMkW1bKKqM8sJXfw',
}).addTo(map)

var marker = L.marker([51.23263121174079, 22.61439426074463]).addTo(map)
