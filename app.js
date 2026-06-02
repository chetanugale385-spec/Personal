
/* =========================
   CHATUR AI - APP.JS
========================= */

const API_URL = "http://localhost:3000/chat";

/* Elements */

const sendBtn =
document.getElementById("sendBtn");

const prompt =
document.getElementById("prompt");

const messages =
document.getElementById("chatMessages");

const typing =
document.getElementById("typingIndicator");

/* Loader */

window.addEventListener("load", () => {

  const loader =
  document.getElementById("loader");

  if(loader){

    setTimeout(() => {

      loader.style.opacity = "0";

      setTimeout(() => {

        loader.style.display = "none";

      },500);

    },1000);

  }

});

/* Auto Resize */

if(prompt){

  prompt.addEventListener(
    "input",
    () => {

      prompt.style.height =
      "auto";

      prompt.style.height =
      prompt.scrollHeight + "px";

    }
  );

}

/* Enter to Send */

if(prompt){

  prompt.addEventListener(
    "keydown",
    (e) => {

      if(
        e.key === "Enter" &&
        !e.shiftKey
      ){

        e.preventDefault();

        sendMessage();

      }

    }
  );

}

/* Chat Storage */

function saveChat(){

  localStorage.setItem(
    "chatur_history",
    messages.innerHTML
  );

}

function loadChat(){

  const data =
  localStorage.getItem(
    "chatur_history"
  );

  if(data){

    messages.innerHTML = data;

  }

}

loadChat();

/* Scroll */

function scrollBottom(){

  messages.scrollTop =
  messages.scrollHeight;

}

/* User Message */

function addUserMessage(text){

  messages.innerHTML += `

  <div class="message">

    <div
    style="
    margin-left:auto;
    display:flex;
    gap:12px;
    align-items:flex-start;
    ">

      <div
      class="bubble"
      style="
      background:#7c5cff;
      color:white;
      ">

        <p>${text}</p>

      </div>

      <div class="avatar">
        U
      </div>

    </div>

  </div>

  `;

}

/* AI Message */

function addAIMessage(text){

  messages.innerHTML += `

  <div class="message">

    <div class="avatar">
      C
    </div>

    <div class="bubble">

      <h4>
      Chatur
      </h4>

      <p>
      ${text}
      </p>

    </div>

  </div>

  `;

}

/* Send Message */

async function sendMessage(){

  const text =
  prompt.value.trim();

  if(!text) return;

  addUserMessage(text);

  prompt.value = "";

  scrollBottom();

  if(typing){

    typing.style.display =
    "flex";

  }

  try{

    const response =
    await fetch(
      API_URL,
      {
        method:"POST",

        headers:{
          "Content-Type":
          "application/json"
        },

        body:JSON.stringify({
          message:text
        })
      }
    );

    const data =
    await response.json();

    if(typing){

      typing.style.display =
      "none";

    }

    addAIMessage(
      data.reply ||
      "No response received."
    );

  }

  catch(error){

    if(typing){

      typing.style.display =
      "none";

    }

    addAIMessage(
      "Backend not connected yet. Deploy the backend and update API_URL."
    );

  }

  saveChat();

  scrollBottom();

}

/* Send Button */

if(sendBtn){

  sendBtn.addEventListener(
    "click",
    sendMessage
  );

}

/* Quick Actions */

document
.querySelectorAll(
".quick-actions button"
)
.forEach(btn => {

  btn.addEventListener(
    "click",
    () => {

      prompt.value =
      btn.innerText + ": ";

      prompt.focus();

    }
  );

});

/* Sidebar */

const menuBtn =
document.getElementById(
"menuBtn"
);

const closeSidebar =
document.getElementById(
"closeSidebar"
);

const sidebar =
document.getElementById(
"sidebar"
);

const overlay =
document.getElementById(
"overlay"
);

menuBtn?.addEventListener(
"click",
() => {

  sidebar.classList.add(
  "show"
  );

  overlay.classList.add(
  "active"
  );

}
);

function closeMenu(){

  sidebar.classList.remove(
  "show"
  );

  overlay.classList.remove(
  "active"
  );

}

closeSidebar?.addEventListener(
"click",
closeMenu
);

overlay?.addEventListener(
"click",
closeMenu
);

/* Greeting */

const title =
document.querySelector(
".left-topbar h1"
);

if(title){

  const hour =
  new Date().getHours();

  if(hour < 12){

    title.textContent =
    "Good Morning";

  }

  else if(hour < 18){

    title.textContent =
    "Good Afternoon";

  }

  else{

    title.textContent =
    "Good Evening";

  }

}

/* Global */

window.sendMessage =
sendMessage;