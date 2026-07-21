const QuizApp = {
  state: {
    name: "",
    age: 0,
    group: "",
    questions: [],
    index: 0,
    score: 0,
  },

  // Different age-based question sets
  questions: {
    kids: [
      { q: "What color is the sky?", options: ["Blue", "Green", "Red", "Yellow"], correct: 0 },
      { q: "Which animal says 'Meow'?", options: ["Dog", "Cat", "Cow", "Lion"], correct: 1 },
      { q: "How many legs does a spider have?", options: ["6", "8", "4", "10"], correct: 1 },
      { q: "What fruit is yellow?", options: ["Banana", "Apple", "Grapes", "Orange"], correct: 0 },
      { q: "Which is a primary color?", options: ["Pink", "Red", "Brown", "Grey"], correct: 1 }
    ],
    teens: [
      { q: "What is H2O?", options: ["Salt", "Water", "Oxygen", "Hydrogen"], correct: 1 },
      { q: "Which planet is called the Red Planet?", options: ["Venus", "Earth", "Mars", "Jupiter"], correct: 2 },
      { q: "Who invented the light bulb?", options: ["Newton", "Edison", "Einstein", "Tesla"], correct: 1 },
      { q: "Which is the fastest land animal?", options: ["Cheetah", "Horse", "Lion", "Tiger"], correct: 0 },
      { q: "What is 15 × 3?", options: ["30", "45", "60", "20"], correct: 1 }
    ],
    adults: [
      { q: "What is the capital of France?", options: ["Rome", "Berlin", "Paris", "Madrid"], correct: 2 },
      { q: "Which is the largest ocean?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], correct: 1 },
      { q: "Who developed the theory of relativity?", options: ["Newton", "Tesla", "Einstein", "Galileo"], correct: 2 },
      { q: "Which language is used for web apps?", options: ["Python", "C++", "JavaScript", "Swift"], correct: 2 },
      { q: "What year did WW2 end?", options: ["1945", "1939", "1918", "1950"], correct: 0 }
    ]
  },

  init() {
    document.querySelector("#user-form").addEventListener("submit", this.startQuiz.bind(this));
    document.querySelector("#next-btn").addEventListener("click", this.nextQuestion.bind(this));
    document.querySelector("#restart-btn").addEventListener("click", this.restart.bind(this));
  },

  startQuiz(e) {
    e.preventDefault();
    this.state.name = document.getElementById("username").value;
    this.state.age = parseInt(document.getElementById("age").value);

    if (this.state.age >= 5 && this.state.age <= 10) this.state.group = "kids";
    else if (this.state.age >= 11 && this.state.age <= 17) this.state.group = "teens";
    else this.state.group = "adults";

    this.state.questions = this.questions[this.state.group];
    this.state.index = 0;
    this.state.score = 0;

    document.getElementById("start-box").classList.add("hidden");
    document.getElementById("quiz-box").classList.remove("hidden");
    this.renderQuestion();
  },

  renderQuestion() {
    let qObj = this.state.questions[this.state.index];
    document.getElementById("question").textContent = qObj.q;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    qObj.options.forEach((opt, i) => {
      let btn = document.createElement("div");
      btn.textContent = opt;
      btn.classList.add("option");
      btn.onclick = () => this.checkAnswer(i, btn);
      optionsDiv.appendChild(btn);
    });

    document.getElementById("feedback").style.display = "none";
  },

  checkAnswer(i, element) {
    let qObj = this.state.questions[this.state.index];
    let feedback = document.getElementById("feedback");
    let allOptions = document.querySelectorAll(".option");

    if (i === qObj.correct) {
      element.classList.add("correct");
      this.state.score++;
      feedback.textContent = "✅ Correct!";
      feedback.className = "correct";
      feedback.style.display = "block";

      confetti({
        particleCount: 80,
        spread: 60,
        colors: ["#39ff14", "#00ff00"],
        origin: { y: 0.6 }
      });
    } else {
      element.classList.add("incorrect");
      allOptions[qObj.correct].classList.add("correct");
      feedback.textContent = "❌ Try Again!";
      feedback.className = "incorrect";
      feedback.style.display = "block";
    }

    allOptions.forEach(opt => opt.onclick = null);
  },

  nextQuestion() {
    this.state.index++;
    if (this.state.index < this.state.questions.length) {
      this.renderQuestion();
    } else {
      this.showResults();
    }
  },

  showResults() {
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");
    document.getElementById("score").textContent = `${this.state.name}, you scored ${this.state.score} / ${this.state.questions.length}`;

    confetti({
      particleCount: 200,
      spread: 100,
      colors: ["#ff00e1", "#39ff14", "#00f7ff"],
      origin: { y: 0.6 }
    });
  },

  restart() {
    document.getElementById("result-box").classList.add("hidden");
    document.getElementById("start-box").classList.remove("hidden");
  }
};

document.addEventListener("DOMContentLoaded", () => QuizApp.init());
