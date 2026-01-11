const chat = document.getElementById("chat");
const input = document.getElementById("text");
const sendBtn = document.getElementById("send");
const clearBtn = document.getElementById("clearBtn");

let userName = "";
let waitingForYes = false;

// İlk mesaj
addMsg("Salam adın nədir? 🙂", "bot");

function addMsg(text, who) {
    const msg = document.createElement("div");
    msg.className = "msg " + who;
    msg.innerHTML = `<div class="bubble">${text}</div>`;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function showHearts() {
    const box = document.createElement("div");
    box.className = "floating-hearts";
    document.body.appendChild(box);

    for (let i = 0; i < 90; i++) {
        const h = document.createElement("div");
        h.className = "floating-heart";
        h.textContent = "❤️";
        h.style.left = Math.random() * 100 + "vw";
        h.style.top = Math.random() * 100 + "vh";
        h.style.fontSize = 12 + Math.random() * 18 + "px";
        h.style.animationDelay = Math.random() * 0.3 + "s";
        box.appendChild(h);
    }

    setTimeout(() => box.remove(), 2000);
}

function botReply(text) {
    const t = text.toLowerCase().trim();

    if (waitingForYes && ["hə", "he", "bəli", "ok"].includes(t)) {
        waitingForYes = false;
        showHearts();
        return "Sən iş ortamında tanıdığım ən gözəl xanımsan ❤️🌸";
    }

    if (t.includes("afət") || t.includes("afet")) {
        waitingForYes = true;
        return "Afət? 😍 Çox gözəl addır, çox zərif və xüsusi səslənir.\n\nSənə bir şey daha deyimmi? Sadəcə Hə deməyin bəsdi!";
    }

    if (!userName) {
        userName = text;
        return `Tanış olduq 🙂 İndi rahat-rahat danışa bilərik. Nə barədə söhbət edək?`;
    }

    if (t.includes("necəsən")) {
        return "Yaxşıyam 😊 Sən necəsən?";
    }

    if (t.includes("pisəm")) {
        return "Üzüldüm 😔 İstəsən danış, buradayam.";
    }

    if (t.includes("kömək")) {
        return "Mənə istədiyin mövzunu yaz, birlikdə baxaq 🙂";
    }

    return "Başa düşdüm 🤔 Bir az da açıqlasan daha yaxşı kömək edərəm.";
}

function send() {
    const text = input.value.trim();
    if (!text) return;

    addMsg(text, "user");
    input.value = "";

    setTimeout(() => {
        addMsg(botReply(text), "bot");
    }, 500);
}

sendBtn.onclick = send;
input.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
});

clearBtn.onclick = () => {
    chat.innerHTML = "";
    userName = "";
    waitingForYes = false;
    addMsg("Salam adın nədir? 🙂", "bot");
};
