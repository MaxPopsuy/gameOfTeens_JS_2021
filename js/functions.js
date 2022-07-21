let questions = [];
setTimeout(() => {
    questions = JSON.parse(localStorage.getItem('user-tests'))
}, 100);
export const addAnswer = function () {
    const inputRadios = document.querySelectorAll(".question__form--variant");
    const answersArray = JSON.parse(localStorage.getItem("answers"));
    questions = JSON.parse(localStorage.getItem('user-tests'))
    answersArray.forEach((element) => {
        if (element) element = "";
    });
    for (let i = 0, length = inputRadios.length; i < length; i++) {
        if (inputRadios[i].checked) {
            answersArray.splice(+localStorage.getItem("question-index") - 1, 1, inputRadios[i].value);
            localStorage.setItem("answers", JSON.stringify(answersArray));
            break;
        }
    }
};

document.querySelector(".question__submit").addEventListener("click", addAnswer);
const questionRef = document.querySelector(".question--js");
export const makeQuestion = (section, questionIndex) => {

    questionRef.classList.remove("hidden-modal");
    const questions = JSON.parse(localStorage.getItem('user-tests'));
    const questionPath = questions[section - 1][questionIndex - 1];
    questionRef.querySelector(".question__title").textContent = questionPath.headlineOfQuestion;
    const formString = `<div class="question__form--label-wrapper">
                <input checked type="radio" class="question__form--variant" id="question__form--answer1" data-question-index="1" name="answer" value="1">
                <label class="question__form--label" for="question__form--answer1" id="question__form--label-1">${questionPath.answer1}</label>
            </div>
            <div class="question__form--label-wrapper">
                <input type="radio" class="question__form--variant" id="question__form--answer2" data-question-index="2" name="answer" value="2">
                <label class="question__form--label" for="question__form--answer2" id="question__form--label-2">${questionPath.answer2}</label>
            </div>
            <div class="question__form--label-wrapper">
                <input type="radio" class="question__form--variant" id="question__form--answer3" data-question-index="3" name="answer" value="3">
                <label class="question__form--label" for="question__form--answer3" id="question__form--label-3">${questionPath.answer3}</label>
            </div>
            <div class="question__form--label-wrapper">
                <input type="radio" class="question__form--variant" id="question__form--answer4" data-question-index="4" name="answer" value="4">
                <label class="question__form--label" id="question__form--label-4" for="question__form--answer4">${questionPath.answer4}</label>
            </div>`;
    questionRef.querySelector(".question__form").innerHTML = formString;
    document.querySelector(".question__counter").classList.remove("hidden-modal");
    document.querySelector(".question__counter").textContent = `${questionIndex}/${questions[section - 1].length}`;
};

export const onClickBtnArrow = (event) => {
    if (event.target.dataset.value === "right") {
        if (+localStorage.getItem("question-index") === questions[localStorage.getItem("test-type") - 1].length) {
            return;
        }
        localStorage.setItem("question-index", +localStorage.getItem("question-index") + 1);
        return makeQuestion(+localStorage.getItem("test-type"), +localStorage.getItem("question-index"));
    }
    if (event.target.dataset.value === "left") {
        if (+localStorage.getItem("question-index") === 1) {
            return;
        }
        localStorage.setItem("question-index", +localStorage.getItem("question-index") - 1);
        return makeQuestion(+localStorage.getItem("test-type"), +localStorage.getItem("question-index"));
    }
};

export const onClickBtnSubmit = () => {
    if (+localStorage.getItem("question-index") === questions[localStorage.getItem("test-type") - 1].length) {
        return;
    }
    localStorage.setItem("question-index", +localStorage.getItem("question-index") + 1);
    return makeQuestion(+localStorage.getItem("test-type"), +localStorage.getItem("question-index"));
};
export const Piechart = function (options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;

    this.draw = function () {
        let total_value = 0;
        let color_index = 0;
        for (const categ in this.options.data) {
            let val = this.options.data[categ];
            total_value += val;
        }

        let start_angle = 0;
        for (const categ in this.options.data) {
            let val = this.options.data[categ];
            const slice_angle = (2 * Math.PI * val) / total_value;

            drawPieSlice(this.ctx, this.canvas.width / 2, this.canvas.height / 2, Math.min(this.canvas.width / 2, this.canvas.height / 2), start_angle, start_angle + slice_angle, this.colors[color_index % this.colors.length]);

            start_angle += slice_angle;
            color_index++;
        }
    };
};
const drawPieSlice = function (ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
};

const myCanvas = document.getElementById("diagram");
myCanvas.width = 300;
myCanvas.height = 300;

const ctx = myCanvas.getContext("2d");

export const checkFinal = () => {
    questions = JSON.parse(localStorage.getItem('user-tests'))

    const answersArray = JSON.parse(localStorage.getItem("answers"));
    const testType = localStorage.getItem("test-type");
    const results_textRef = document.querySelector(".results_text_percent");
    const result = answersArray.reduce((acc, item, index) => {
        if (item === questions[testType - 1][index].rightAnswer) acc++;
        return acc;
    }, 0);
    const percentCorrectAnswers = Math.round((result / questions[testType - 1].length) * 100);
    if (percentCorrectAnswers === 100) {
        results_textRef.textContent = "Ти дивився відповіді в інтернеті, чи це твоя друга мова?";
    }
    if (percentCorrectAnswers >= 80 || percentCorrectAnswers <= 90) {
        results_textRef.textContent = "Ти молодець! Майже всі відповіді вірні";
    }
    if (percentCorrectAnswers >= 60 || percentCorrectAnswers < 80) {
        results_textRef.textContent = "Непогано, але в наступний раз старайся краще";
    }
    if (percentCorrectAnswers > 30 || percentCorrectAnswers < 60) {
        results_textRef.textContent = "Не переживай, спробуй пройти тест ще раз";
    }
    if (percentCorrectAnswers <= 30) {
        results_textRef.textContent = "Ти писав навмання, чи як? Іди почитай теорію і спробуй ще раз";
    }
    document.querySelector(".results__percent--js").textContent = `${percentCorrectAnswers}`;
    document.querySelector(".question--js").classList.add("hidden-modal");
    document.querySelector(".results").classList.remove("hidden-modal");
    document.querySelector(".question__counter").classList.add("hidden-modal");
    let correctAnswers = percentCorrectAnswers === 100 ? 99.7 : percentCorrectAnswers;
    correctAnswers = percentCorrectAnswers === 0 ? 0.3 : percentCorrectAnswers;

    const myAnswers = {
        "right answers": correctAnswers,
        "wrong answers": 100 - correctAnswers,
    };

    const myDougnutChart = new Piechart({
        canvas: diagram,
        data: myAnswers,
        colors: ["#2b2e4a", "#e84545"],
        doughnutHoleSize: 0.5,
    });
    myDougnutChart.draw();
};
export const startTest = (event) => {
    const questions = JSON.parse(localStorage.getItem('user-tests'));

    if (event.target === event.currentTarget || event.target.classList.contains("test-selection__plus")) return;
    document.querySelector(".menu").classList.add("hidden-modal");
    makeQuestion(+event.target.dataset.section, 1);
    localStorage.setItem("question-index", 1);
    localStorage.setItem("test-type", +event.target.dataset.section);
    if (+event.target.dataset.section === 1) {
        document.querySelector(".results_about_the_course_title").textContent = "JavaScript";
    }
    if (+event.target.dataset.section === 2) {
        document.querySelector(".results_about_the_course_title").textContent = "Html / CSS";
    }
    if (+event.target.dataset.section === 3) {
        document.querySelector(".results_about_the_course_title").textContent = "Java";
    }
    if (+event.target.dataset.section === 4) {
        document.querySelector(".results_about_the_course_title").innerHTML = "Python";
    }
    if (+event.target.dataset.section > 4) {
        document.querySelector(".results_about_the_course_title").innerHTML = `Test-${event.target.dataset.section}`;
    }
    const answersArray = [];
    answersArray.length = questions[event.target.dataset.section - 1].length;
    localStorage.setItem("answers", JSON.stringify(answersArray));
};
export const checkVolume = (event) => {
    window.localStorage.setItem("volume", event.target.value / 20);
    if (+event.target.value === 0) {
        event.target.parentNode.querySelector("#mute").classList.remove("hidden-modal");
        event.target.parentNode.querySelector("#high").classList.add("hidden-modal");
    } else {
        event.target.parentNode.querySelector("#high").classList.remove("hidden-modal");
        event.target.parentNode.querySelector("#mute").classList.add("hidden-modal");
    }
    [...document.querySelector(".audio").children].forEach((audio) => (audio.volume = (+audio.dataset.volume * event.target.value) / 20));
};
export const createTest = () => {
    document.querySelector(".question-input").classList.remove("hidden-modal");
    document.querySelector(".menu").classList.add("hidden-modal");
    localStorage.setItem('input-question-index', 1)
    localStorage.setItem('current-test', '[]');
};
export const createTestPlusBtn = () => {
    let currentTestRef = JSON.parse(localStorage.getItem('current-test'));
    const formRef = document.querySelector(".question-input")

    const testString = {
        headlineOfQuestion: document.querySelector('.question-input__headline-input').value,
        answer1: formRef.querySelector('.question-input__input--1').value,
        answer2: formRef.querySelector('.question-input__input--2').value,
        answer3: formRef.querySelector('.question-input__input--3').value,
        answer4: formRef.querySelector('.question-input__input--4').value,
        rightAnswer: [...formRef.querySelectorAll("[type='radio']")].find((checkbox) =>
            checkbox.checked
        ).dataset.questionIndex,
    };
    currentTestRef.push(testString)
    localStorage.setItem('current-test', JSON.stringify(currentTestRef));
    formRef.querySelectorAll("[type='text']").forEach((element) => {
        element.value = '';
    });
    formRef.querySelector("[type='radio']").checked = true;

};
export const createTestAddBtn = () => {
    const currentTest = JSON.parse(localStorage.getItem('current-test'));
    const userTest = JSON.parse(localStorage.getItem('user-tests'));
    if (currentTest.length < 4) {
        alert("Будь ласка, зробіть більше тестів")
        return;
    };
    userTest.push(currentTest)
    document.querySelector('.question-input').classList.add('hidden-modal');
    const wrapperBtnRef = document.querySelector('.menu__test-selection-wrapper');
    const btnString = ` <button data-section='${wrapperBtnRef.children.length}' type="button" class="select-btn--js test-selection__btn">Test-${wrapperBtnRef.children.length}</button>`;
    wrapperBtnRef.insertAdjacentHTML(
        'beforeend', btnString
    );

    document.querySelector('.menu').classList.remove('hidden-modal');
    localStorage.setItem('user-tests', JSON.stringify(userTest));
};
