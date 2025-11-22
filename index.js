$(document).ready(function(){

  const quizData = [
    {
      question: "Which HTML tag is used to create a paragraph?",
      options: ["h1", "div", "p", "span"],
      answer: "p"
    },
    {
      question: "Which CSS property changes the background color of an element?",
      options: ["background-color", "color", "border-color", "font-size"],
      answer: "background-color"
    },
    {
      question: "Which jQuery method hides selected elements?",
      options: [".hide()", ".show()", ".toggle()", ".fadeIn()"],
      answer: ".hide()"
    },
    {
      question: "Which JavaScript function is used to display messages in the console?",
      options: ["console.log()", "alert()", "prompt()", "document.write()"],
      answer: "console.log()"
    },
    {
      question: "Which HTML tag is used to include JavaScript?",
      options: ["javascript", "js", "script", "link"],
      answer: "script"
    },
    {
      question: "How do you select an element with id 'header' in CSS?",
      options: ["#header", ".header", "header", "*header"],
      answer: "#header"
    },
    {
      question: "Which jQuery selector selects all elements with class 'item'?",
      options: ["$('.item')", "$('#item')", "$('item')", "$('.#item')"],
      answer: "$('.item')"
    },
    {
      question: "How do you write a comment in JavaScript?",
      options: ["# comment", "/* Comment */", "!-- Comment --", "// This is a comment"],
      answer: "// This is a comment"
    },
    {
      question: "Which CSS property is used to make text bold?",
      options: ["font-style", "font-weight", "text-decoration", "font-size"],
      answer: "font-weight"
    },
    {
      question: "Which HTML tag is used to create an ordered list?",
      options: ["list", "ul", "li", "ol"],
      answer: "ol"
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  function loadQuestion(){
    answered = false;
    $('#next-btn').prop('disabled', true);
    $('#score').text('');
    const questionData = quizData[currentQuestion];
    $('#question').text(questionData.question);
    $('#options-form').empty();

    questionData.options.forEach((option, index) => {
      $('#options-form').append(`
        <label class="option" for="option-${index}">
          <input type="radio" name="question" id="option-${index}" value="${option}">
          ${option}
        </label>
      `);
    });

    updateProgress();
  }

  function updateProgress(){
    const progressPercent = ((currentQuestion) / quizData.length) * 100;
    $('#progress').css('width', progressPercent + '%');
  }

  loadQuestion();

  $(document).on('change', 'input[type="radio"]', function(){
    if (answered) return;
    answered = true;
    $('#next-btn').prop('disabled', false);
    const selected = $(this).val();
    const correct = quizData[currentQuestion].answer;

    $('.option').addClass('disabled');
    $(this).closest('.option').removeClass('disabled');

    if (selected === correct) {
      score++;
      $(this).closest('.option').addClass('correct');
    } else {
      $(this).closest('.option').addClass('incorrect');
      $('.option').each(function(){
        if ($(this).find('input').val() === correct) {
          $(this).addClass('correct');
        }
      });
    }
  });

  $('#next-btn').click(function(){
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      $('#progress').css('width','100%');
      $('#quiz-container').html(`
        <h2>🎉 Quiz Completed!</h2>
        <p>Your Score: ${score} / ${quizData.length}</p>
      `);
    }
  });

});
