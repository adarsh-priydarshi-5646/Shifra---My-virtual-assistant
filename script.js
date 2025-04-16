let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "en-IN"
    window.speechSynthesis.speak(text_speak)
}

function wishMe() {
    let day = new Date()
    let hours = day.getHours()
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir")
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir")
    } else {
        speak("Good Evening Sir")
    }
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click", () => {
    recognition.start()
    voice.style.display = "block"
    btn.style.display = "none"
})

function takeCommand(message) {
    voice.style.display = "none"
    btn.style.display = "flex"

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, how can I assist you today?")
    }
    else if (message.includes("who are you")) {
        speak("I am Shifra, your voice assistant, created by Adarsh Sir.")
    }
    else if (message.includes("who is your creator") || message.includes("who made you")) {
        speak("My creator is Adarsh Priydarshi, a computer science student and developer from India.")
    }
    else if (message.includes("prime minister of india")) {
        speak("The Prime Minister of India is Narendra Modi.")
    }
    else if (message.includes("president of india")) {
        speak("The President of India is Droupadi Murmu.")
    }
    else if (message.includes("capital of india")) {
        speak("The capital of India is New Delhi.")
    }

    // 🌐 Browsing
    else if (message.includes("open youtube")) {
        speak("Opening YouTube...")
        window.open("https://youtube.com/", "_blank")
    }
    else if (message.includes("open google")) {
        speak("Opening Google...")
        window.open("https://google.com/", "_blank")
    }
    else if (message.includes("open facebook")) {
        speak("Opening Facebook...")
        window.open("https://facebook.com/", "_blank")
    }
    else if (message.includes("open instagram")) {
        speak("Opening Instagram...")
        window.open("https://instagram.com/", "_blank")
    }

    // ⏰ Date & Time
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
        speak("Current time is " + time)
    }
    else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "long", year: "numeric" })
        speak("Today is " + date)
    }

    // 📚 DSA / Computer Science
    else if (message.includes("what is stack")) {
        speak("A stack is a linear data structure which follows Last In First Out principle.")
    }
    else if (message.includes("what is queue")) {
        speak("A queue is a linear data structure which follows First In First Out principle.")
    }
    else if (message.includes("what is linked list")) {
        speak("A linked list is a linear data structure consisting of nodes, where each node points to the next.")
    }
    else if (message.includes("what is binary tree")) {
        speak("A binary tree is a tree data structure where each node has at most two children.")
    }
    else if (message.includes("what is data structure")) {
        speak("A data structure is a way to organize and store data efficiently.")
    }
    else if (message.includes("what is algorithm")) {
        speak("An algorithm is a step by step procedure to solve a specific problem.")
    }
    else if (message.includes("what is recursion")) {
        speak("Recursion is a technique where a function calls itself to solve smaller subproblems.")
    }
    else if (message.includes("what is time complexity")) {
        speak("Time complexity is the measure of how much time an algorithm takes to complete.")
    }
    else if (message.includes("what is space complexity")) {
        speak("Space complexity is the amount of memory used by an algorithm.")
    }

    // 📖 General Knowledge
    else if (message.includes("general knowledge") || message.includes("gk question")) {
        let facts = [
            "The Great Wall of China is the longest man-made structure in the world.",
            "India is the world's largest democracy.",
            "Water freezes at zero degrees Celsius.",
            "The sun rises in the east and sets in the west.",
            "The human brain has around 86 billion neurons.",
            "Mount Everest is the tallest mountain in the world.",
            "The national bird of India is the peacock.",
            "The largest continent is Asia.",
            "Mahatma Gandhi is called the father of the nation in India.",
            "The currency of Japan is Yen."
        ]
        let fact = facts[Math.floor(Math.random() * facts.length)]
        speak(fact)
    }

    // 🔍 Fallback for any other queries
    else if (message.includes("what is") || message.includes("define") || message.includes("explain")) {
        let query = message.replace("define", "").replace("what is", "").replace("explain", "").trim()
        speak("Let me search and explain " + query)
        window.open(`https://www.google.com/search?q=${query}`, "_blank")
    }

    else {
        let finalText = "This is what I found on the internet regarding " + message
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message}`, "_blank")
    }
}
