(() => {
  const landing = document.getElementById("landing");
  const assessment = document.getElementById("assessment");
  const content = document.getElementById("assessment-content");
  const progress = document.getElementById("assessment-progress");
  const stepLabel = document.getElementById("assessment-step");
  const back = document.querySelector(".assessment-back");
  const menu = document.getElementById("mobile-nav");
  const toggle = document.querySelector(".menu-toggle");
  const questions = [
    {
      id: "concern",
      title: "What would you like help with?",
      helper: "Choose an answer to continue.",
      options: ["Hair thinning", "A receding hairline", "Increased shedding", "Something else"],
    },
    {
      id: "duration",
      title: "How long have you noticed this?",
      options: ["Less than 3 months", "3–6 months", "6–12 months", "More than a year", "Not sure"],
    },
    { id: "age", title: "How old are you?", label: "Age in years", type: "number" },
    {
      id: "history",
      title: "Have you tried hair-loss treatment before?",
      options: ["Yes", "No"],
    },
    {
      id: "medications",
      title: "What medications do you currently take?",
      helper: "Include prescription and over-the-counter medications.",
      label: "Current medications",
      alternative: "I don’t take any",
    },
    {
      id: "notes",
      title: "Is there anything else you’d like to share?",
      helper: "You can add other health information or questions.",
      label: "Additional information (optional)",
      optional: true,
      alternative: "Skip",
    },
  ];
  // Health answers stay in this closure. Never persist, log, or transmit them.
  let answers = {};
  let step = 0;
  let view = "question";
  let editing = false;
  let active = false;
  let advanceAfter = 0;
  let opener = null;
  let landingScroll = 0;
  let landingHash = "";
  let previousScrollRestoration = history.scrollRestoration;
  const landingTitle = document.title;
  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#${name}" /></svg>`;

  function setMenuOpen(open) {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    toggle.querySelector("use").setAttribute("href", open ? "#x" : "#menu");
  }

  function resetAnswers() {
    answers = {};
    step = 0;
    editing = false;
    view = "question";
    advanceAfter = 0;
  }

  function render() {
    const question = questions[step];
    const reviewing = view === "review";
    const complete = view === "complete";
    progress.value = view === "question" ? step + 1 : 6;
    stepLabel.textContent = reviewing ? "Review" : complete ? "Complete" : `${step + 1} of 6`;
    progress.setAttribute("aria-valuetext", stepLabel.textContent);
    back.hidden = complete;
    back.setAttribute("aria-label", reviewing ? "Back to last question" : editing ? "Back to review" : step === 0 ? "Back to Alvono" : "Previous question");
    document.title = complete ? "Assessment complete | Alvono" : reviewing ? "Review your answers | Alvono" : `Question ${step + 1} of 6 | Alvono`;

    if (complete) {
      content.innerHTML = `
        <div class="completion-mark">${icon("check")}</div>
        <h1 tabindex="-1">Assessment complete.</h1>
        <p class="assessment-helper">This demonstration has not sent your answers to a clinician.</p>
        <p class="completion-next">In the connected service, a clinician would review your assessment and recommend next steps. Treatment would require their approval.</p>
        <button class="button primary assessment-submit" data-exit>Back to Alvono${icon("arrow")}</button>`;
    } else if (reviewing) {
      content.innerHTML = `
        <h1 tabindex="-1">Review your answers.</h1>
        <p class="assessment-helper">Check your information. You can edit any answer before finishing.</p>
        <dl class="review-list">${questions.map((item, index) => `
          <div class="review-item"><dt>${item.title}</dt><dd data-answer="${item.id}"></dd>
          <button class="review-edit" data-edit="${index}" aria-label="Edit: ${item.title}">Edit</button></div>`).join("")}</dl>
        <button class="button primary assessment-submit" data-finish>Finish assessment${icon("arrow")}</button>`;
      questions.forEach((item) => {
        content.querySelector(`[data-answer="${item.id}"]`).textContent = answers[item.id] || "Not provided";
      });
    } else {
      const helper = question.helper ? `<p class="assessment-helper" id="question-helper">${question.helper}</p>` : "";
      content.innerHTML = `<h1 id="question-title" tabindex="-1">${question.title}</h1>${helper}`;
      if (question.options) {
        content.insertAdjacentHTML("beforeend", `
          <div class="answer-options" role="group" aria-labelledby="question-title" ${question.helper ? 'aria-describedby="question-helper"' : ""}>
            ${question.options.map((option, index) => `
              <button class="answer-option" data-choice="${index}" aria-pressed="${answers[question.id] === option}">${option}${icon("check")}</button>`).join("")}
          </div>`);
      } else {
        content.insertAdjacentHTML("beforeend", `
          <form class="assessment-form" novalidate>
            <label class="field-label" for="assessment-answer">${question.label}</label>
            ${question.type === "number"
              ? '<input class="assessment-input" id="assessment-answer" name="age" type="number" inputmode="numeric" min="18" max="120" step="1" required autocomplete="off">'
              : `<textarea class="assessment-input" id="assessment-answer" name="${question.id}" maxlength="2000" ${question.optional ? "" : "required"} autocomplete="off" spellcheck="false"></textarea>`}
            <p class="field-error" id="answer-error" role="alert" hidden>${icon("x")}<span></span></p>
            <button class="button primary assessment-submit" type="submit">${editing ? "Save answer" : question.optional ? "Review answers" : "Continue"}${icon("arrow")}</button>
          </form>
          ${question.alternative ? `<button class="text-link assessment-alternative" data-alternative>${question.alternative}</button>` : ""}`);
        const field = content.querySelector(".assessment-input");
        field.value = question.id === "medications" && answers[question.id] === "I don’t take any" ? "" : answers[question.id] || "";
        if (question.helper) field.setAttribute("aria-describedby", "question-helper");
      }
    }
    // Re-trigger the small positional transition without fading text.
    content.style.animation = "none";
    void content.offsetWidth;
    content.style.animation = "";
    window.scrollTo({ top: 0, behavior: "instant" });
    content.querySelector("h1").focus({ preventScroll: true });
  }

  function showAssessment() {
    active = true;
    resetAnswers();
    setMenuOpen(false);
    previousScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    landing.hidden = true;
    assessment.hidden = false;
    render();
  }

  function syncRoute() {
    if (location.hash === "#assessment") {
      if (!active) showAssessment();
    } else if (active) {
      active = false;
      resetAnswers();
      content.replaceChildren();
      assessment.hidden = true;
      landing.hidden = false;
      document.title = landingTitle;
      const focusTarget = opener && !opener.closest("[hidden]") ? opener : toggle.offsetParent ? toggle : landing.querySelector("[data-start]");
      requestAnimationFrame(() => {
        if (active) return;
        window.scrollTo({ top: landingScroll, behavior: "instant" });
        focusTarget.focus({ preventScroll: true });
        history.scrollRestoration = previousScrollRestoration;
      });
    }
  }

  function exitAssessment() {
    if (history.state?.foliaAssessment) history.back();
    else {
      history.replaceState(null, "", `${location.pathname}${location.search}${landingHash || "#"}`);
      syncRoute();
    }
  }

  function saveDraft() {
    const field = content.querySelector(".assessment-input");
    if (field && view === "question" && !editing) {
      const id = questions[step].id;
      if (id === "medications" && !field.value && answers[id] === "I don’t take any") return;
      answers[id] = field.value;
    }
  }

  function advance(value) {
    answers[questions[step].id] = value;
    if (editing || step === questions.length - 1) {
      editing = false;
      view = "review";
    } else step += 1;
    // Newly rendered choices cannot consume a second click from the previous answer.
    advanceAfter = performance.now() + 300;
    render();
  }

  content.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || !content.contains(button)) return;
    if (button.hasAttribute("data-exit")) { exitAssessment(); return; }
    if (button.hasAttribute("data-edit")) {
      step = Number(button.dataset.edit);
      view = "question";
      editing = true;
      advanceAfter = 0;
      render();
      return;
    }
    if (event.detail > 1 || performance.now() < advanceAfter) return;
    if (button.hasAttribute("data-choice")) {
      advance(questions[step].options[Number(button.dataset.choice)]);
    } else if (button.hasAttribute("data-alternative")) {
      advance(questions[step].optional ? "" : "I don’t take any");
    } else if (button.hasAttribute("data-finish")) {
      resetAnswers();
      view = "complete";
      render();
    }
  });

  content.addEventListener("submit", (event) => {
    event.preventDefault();
    if (performance.now() < advanceAfter) return;
    const question = questions[step];
    const field = content.querySelector(".assessment-input");
    const value = field.value.trim();
    let error = "";
    if (question.type === "number") {
      const age = Number(value);
      if (!value || !Number.isInteger(age) || age < 0 || age > 120) error = "Enter a whole-number age between 18 and 120.";
      else if (age < 18) error = "Alvono’s online service is for adults aged 18 and over.";
    } else if (!question.optional && !value) error = "Enter your medications or choose ‘I don’t take any’.";
    else if (value.length > 2000) error = "Keep your answer to 2,000 characters or fewer.";
    if (error) {
      const message = content.querySelector("#answer-error");
      message.querySelector("span").textContent = error;
      message.hidden = false;
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", `${question.helper ? "question-helper " : ""}answer-error`);
      field.focus();
      return;
    }
    advance(value);
  });

  content.addEventListener("keydown", (event) => {
    if (event.repeat && (event.key === "Enter" || event.key === " ")) event.preventDefault();
  });
  back.addEventListener("click", () => {
    saveDraft();
    if (editing) { editing = false; view = "review"; }
    else if (view === "review") { view = "question"; step = questions.length - 1; }
    else if (step > 0) step -= 1;
    else { exitAssessment(); return; }
    advanceAfter = 0;
    render();
  });
  assessment.querySelector("[data-exit]").addEventListener("click", (event) => {
    event.preventDefault();
    exitAssessment();
  });
  document.querySelectorAll("[data-start]").forEach((button) => {
    button.addEventListener("click", () => {
      opener = button;
      landingScroll = window.scrollY;
      landingHash = location.hash;
      history.pushState({ foliaAssessment: true }, "", "#assessment");
      syncRoute();
    });
  });
  window.addEventListener("popstate", syncRoute);
  window.addEventListener("hashchange", syncRoute);

  // Mobile navigation remains independent of the assessment.
  toggle.addEventListener("click", () => setMenuOpen(menu.hidden));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) { setMenuOpen(false); toggle.focus(); }
  });
  matchMedia("(min-width:761px)").addEventListener("change", (event) => { if (event.matches) setMenuOpen(false); });
  syncRoute();
})();
